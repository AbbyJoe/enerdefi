export type FilingStatus = "Pending" | "Issued" | "Expired" | "Rejected";

export type Filing = {
  id: string;
  issueDate: string;
  permitId: string;
  project: string;
  className: string;
  expiryDate: string;
  status: FilingStatus;
  projectId: string;
  reportingPeriod: string;
  filingType: string;
  validity: string;
  documentName: string;
};

export type FilingQuery = {
  q: string;
  status: "All" | FilingStatus;
  page: number;
  by: "permit" | "project";
};

export type FilingPage = {
  items: Filing[];
  total: number;
  page: number;
  pageCount: number;
};

export type Stats = {
  total: number;
  pending: number;
  issued: number;
  expired: number;
};

export type ProjectCategory = "Renewable" | "Oil & Gas" | "Power";

export type ProjectDraft = {
  category: ProjectCategory;
  name: string;
  projectType: string;
  sector: string;
  country: string;
  state: string;
  address: string;
  summary: string;
  companyName: string;
  entityType: string;
  incorporationDate: string;
  jurisdiction: string;
  registrationNo: string;
  registeredAddress: string;
  taxId: string;
  contactName: string;
  contactEmail: string;
  compliance: "" | "yes" | "no";
  completedProjects: string;
  capacity: string;
  caseStudyUrl: string;
  files: Record<string, string>;
  technicalCapacity: string;
  capex: string;
  financeSource: string;
  esgScore: string;
  investmentAsk: string;
  assessmentNote: string;
  legalCounsel: string;
  metadataNote: string;
};

export type SavedProject = {
  id: string;
  name: string;
  category: ProjectCategory;
  status: "Draft" | "Submitted";
  permitId: string | null;
  updatedAt: string;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

export type CurrencyCode = "NGN" | "USD" | "GBP";

export const emptyDraft = (): ProjectDraft => ({
  category: "Oil & Gas",
  name: "",
  projectType: "",
  sector: "",
  country: "Nigeria",
  state: "",
  address: "",
  summary: "",
  companyName: "",
  entityType: "",
  incorporationDate: "",
  jurisdiction: "",
  registrationNo: "",
  registeredAddress: "",
  taxId: "",
  contactName: "",
  contactEmail: "",
  compliance: "yes",
  completedProjects: "",
  capacity: "",
  caseStudyUrl: "",
  files: {},
  technicalCapacity: "",
  capex: "",
  financeSource: "",
  esgScore: "",
  investmentAsk: "",
  assessmentNote: "",
  legalCounsel: "",
  metadataNote: "",
});

export const STEPS = [
  "Project Overview",
  "Technical & Financial",
  "Finance",
  "ESG",
  "Investment",
  "Assessment",
  "Document",
  "Legal & Compliance",
  "Optional Metadata",
] as const;

export const PAGE_SIZE = 8;
