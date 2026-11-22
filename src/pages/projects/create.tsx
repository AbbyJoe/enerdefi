import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SpinnerIcon } from "../../components/svgs/SpinnerIcon";
import { Asset } from "../../components/ui/Asset";
import { getProjectDraft, saveProjectDraft, submitProject } from "../../lib/store";
import { STEPS, emptyDraft, type ProjectDraft } from "../../lib/types";
import { useAppState } from "../../state";
import { CreateProjectHeader } from "./_components/CreateProjectHeader";
import { ProjectOverview } from "./_components/ProjectOverview";
import { ProjectStepForm } from "./_components/ProjectStepForm";
import { ProjectStepper } from "./_components/ProjectStepper";
import { ProjectSubmittedModal } from "./_components/ProjectSubmittedModal";

export function CreateProjectPage() {
  const queryClient = useQueryClient();
  const { pushToast } = useAppState();
  const draftQuery = useQuery({ queryKey: ["draft"], queryFn: getProjectDraft });
  const [draft, setDraft] = useState<ProjectDraft>(emptyDraft());
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [submittedOpen, setSubmittedOpen] = useState(false);

  useEffect(() => {
    if (draftQuery.data && !ready) {
      setDraft(draftQuery.data);
      setReady(true);
    }
  }, [draftQuery.data, ready]);

  const save = useMutation({
    mutationFn: saveProjectDraft,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      pushToast({
        tone: "success",
        title: "Changes Saved Successfully",
        body: "Your changes have been saved and updated. You can close the wizard if you want to continue later.",
      });
    },
    onError: () =>
      pushToast({
        tone: "error",
        title: "Save Failed",
        body: "Your changes could not be saved. Please try again.",
      }),
  });

  const submit = useMutation({
    mutationFn: submitProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["filings"] });
      await queryClient.invalidateQueries({ queryKey: ["stats"] });
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      await queryClient.invalidateQueries({ queryKey: ["draft"] });
      setSubmittedOpen(true);
    },
  });

  function patch(partial: Partial<ProjectDraft>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!draft.name.trim()) next.name = "Enter a project name.";
    if (!draft.summary.trim()) next.summary = "Add a short project summary.";
    if (!draft.companyName.trim()) next.companyName = "Enter the company name.";
    if (draft.contactEmail && !draft.contactEmail.includes("@")) next.contactEmail = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit() {
    if (!validate()) {
      setStep(0);
      const missing = [
        !draft.name.trim() ? "Project Name" : null,
        !draft.summary.trim() ? "Project Summary" : null,
        !draft.companyName.trim() ? "Company Name" : null,
        draft.contactEmail && !draft.contactEmail.includes("@") ? "Email Address" : null,
      ].filter(Boolean);
      pushToast({
        tone: "error",
        title: "Critical Fields Required",
        body: (
          <>
            These fields are required to proceed to the next stage: <span className="font-semibold text-[#344054]">{missing.join(", ")}</span>
          </>
        ),
      });
      return;
    }
    submit.mutate(draft);
  }

  return (
    <>
      <CreateProjectHeader
        step={step}
        saving={save.isPending}
        submitting={submit.isPending}
        onSave={() => save.mutate(draft)}
        onPrev={() => setStep((current) => Math.max(0, current - 1))}
        onNext={() => setStep((current) => Math.min(STEPS.length - 1, current + 1))}
        onSubmit={onSubmit}
      />

      <main className="flex flex-col gap-4 px-4 py-4 sm:gap-5 sm:px-6 sm:py-6">
        <ProjectStepper step={step} onStep={setStep} />

        <h2 className="text-xl leading-7 font-bold tracking-[-0.48px] text-[#212b36] sm:text-2xl sm:leading-8">
          {step + 1}. {STEPS[step]}
        </h2>

        {step === 0 ? <ProjectOverview draft={draft} errors={errors} onChange={patch} /> : <ProjectStepForm step={step} draft={draft} onChange={patch} />}

        {step === 0 ? (
          <div className="flex justify-end">
            <button
              type="button"
              disabled={submit.isPending}
              onClick={onSubmit}
              className="flex h-12 items-center gap-1 rounded-lg bg-[#212b36] px-4 text-base font-bold text-white disabled:opacity-70"
            >
              {submit.isPending ? <SpinnerIcon /> : null}
              {submit.isPending ? "Submitting…" : "Submit"}
              {submit.isPending ? null : <Asset src="/assets/icon-arrow-right.svg" width={20} height={20} />}
            </button>
          </div>
        ) : null}
      </main>

      {submittedOpen ? <ProjectSubmittedModal onClose={() => setSubmittedOpen(false)} /> : null}
    </>
  );
}
