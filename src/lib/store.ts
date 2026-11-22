import { filingList, getFilingStats } from "../data/filings";
import { notificationList } from "../data/notifications";
import {
  PAGE_SIZE,
  emptyDraft,
  type Filing,
  type FilingQuery,
  type FilingStatus,
  type Notification,
  type ProjectDraft,
  type SavedProject,
  type Stats,
} from "./types";

const PROJECT_DRAFT_STORAGE_KEY = "enerdefi.draft";

let filings = [...filingList];
let stats = getFilingStats(filings);
let projects: SavedProject[] = [];
let notifications = [...notificationList];

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatPermitDate(date: Date) {
  const day = date.getDate();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}:${month}-${year}`;
}

function loadDraftFromStorage(): ProjectDraft {
  try {
    const raw = localStorage.getItem(PROJECT_DRAFT_STORAGE_KEY);
    if (!raw) return emptyDraft();
    return { ...emptyDraft(), ...JSON.parse(raw) };
  } catch {
    return emptyDraft();
  }
}

function updateStatsForStatusChange(from: FilingStatus, to: FilingStatus) {
  if (from === to) return;

  const next = { ...stats };

  if (from === "Pending") next.pending = Math.max(0, next.pending - 1);
  if (from === "Issued") next.issued = Math.max(0, next.issued - 1);
  if (from === "Expired") next.expired = Math.max(0, next.expired - 1);

  if (to === "Pending") next.pending += 1;
  if (to === "Issued") next.issued += 1;
  if (to === "Expired") next.expired += 1;

  stats = next;
}

export async function getDashboardStats(): Promise<Stats> {
  await delay(220);
  return { ...stats };
}

export async function listFilings(query: FilingQuery) {
  await delay(280);

  const search = query.q.trim().toLowerCase();
  const matched = filings.filter((filing) => {
    if (query.status !== "All" && filing.status !== query.status) return false;
    if (!search) return true;
    const field = query.by === "project" ? filing.project : filing.permitId;
    return field.toLowerCase().includes(search);
  });

  const pageCount = Math.max(1, Math.ceil(matched.length / PAGE_SIZE));
  const page = Math.min(Math.max(query.page, 1), pageCount);
  const start = (page - 1) * PAGE_SIZE;

  return {
    items: matched.slice(start, start + PAGE_SIZE),
    total: matched.length,
    page,
    pageCount,
  };
}

export async function getFilingById(id: string) {
  await delay(180);
  const filing = filings.find((row) => row.id === id);
  if (!filing) throw new Error("Filing not found");
  return filing;
}

export async function setFilingStatus(id: string, status: FilingStatus) {
  await delay(240);

  const current = filings.find((row) => row.id === id);
  if (!current) throw new Error("Filing not found");

  filings = filings.map((row) =>
    row.id === id
      ? {
          ...row,
          status,
          validity: status === "Expired" ? "Expired" : row.validity,
        }
      : row,
  );

  updateStatsForStatusChange(current.status, status);

  const updated = filings.find((row) => row.id === id);
  if (!updated) throw new Error("Filing not found");
  return updated;
}

export async function getProjectDraft() {
  await delay(120);
  return loadDraftFromStorage();
}

export async function saveProjectDraft(draft: ProjectDraft) {
  await delay(260);
  localStorage.setItem(PROJECT_DRAFT_STORAGE_KEY, JSON.stringify(draft));

  const draftProject: SavedProject = {
    id: "draft",
    name: draft.name || "Untitled project",
    category: draft.category,
    status: "Draft",
    permitId: null,
    updatedAt: new Date().toISOString(),
  };

  const hasDraft = projects.some((project) => project.id === "draft");
  projects = hasDraft
    ? projects.map((project) => (project.id === "draft" ? draftProject : project))
    : [draftProject, ...projects];

  return draftProject;
}

export async function submitProject(draft: ProjectDraft) {
  await delay(420);

  const sequence = filings.length + 1;
  const today = new Date();
  const permitId = `PRM-2026-${String(sequence).padStart(3, "0")}`;
  const filing: Filing = {
    id: `filing-${sequence}`,
    issueDate: formatPermitDate(today),
    permitId,
    project: draft.name,
    className: draft.sector || "Production",
    expiryDate: formatPermitDate(new Date(today.getFullYear() + 5, today.getMonth(), today.getDate())),
    status: "Pending",
    projectId: `PRJ-${String(sequence).padStart(3, "0")}`,
    reportingPeriod: "2026-01",
    filingType: draft.category === "Renewable" ? "ESG" : "Production",
    validity: "5 years",
    documentName: draft.files.ownership || `${draft.name.replace(/\s+/g, "-") || "project"}-permit.pdf`,
  };

  filings = [filing, ...filings];
  stats = {
    ...stats,
    total: stats.total + 1,
    pending: stats.pending + 1,
  };

  projects = [
    {
      id: filing.id,
      name: draft.name,
      category: draft.category,
      status: "Submitted",
      permitId,
      updatedAt: new Date().toISOString(),
    },
    ...projects.filter((project) => project.id !== "draft"),
  ];

  localStorage.removeItem(PROJECT_DRAFT_STORAGE_KEY);
  return filing;
}

export async function listProjects() {
  await delay(200);
  return projects;
}

export async function getNotifications() {
  await delay(180);
  return notifications;
}

export async function markAllNotificationsRead() {
  await delay(160);
  notifications = notifications.map((notification) => ({ ...notification, unread: false }));
  return notifications;
}

export function countUnreadNotifications(items: Notification[]) {
  return items.filter((notification) => notification.unread).length;
}
