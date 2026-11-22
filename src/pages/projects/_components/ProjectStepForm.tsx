import { Card } from "../../../components/ui/Card";
import { Field } from "../../../components/ui/Field";
import { FileDrop } from "../../../components/ui/FileDrop";
import { SelectInput } from "../../../components/ui/SelectInput";
import { TextArea } from "../../../components/ui/TextArea";
import { TextInput } from "../../../components/ui/TextInput";
import type { ProjectDraft } from "../../../lib/types";

type ProjectStepFormProps = {
  step: number;
  draft: ProjectDraft;
  onChange: (partial: Partial<ProjectDraft>) => void;
};

export function ProjectStepForm({ step, draft, onChange }: ProjectStepFormProps) {
  if (step === 1) {
    return (
      <Card title="Technical profile">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Installed capacity">
            <TextInput value={draft.technicalCapacity} placeholder="e.g. 50 MW" onChange={(technicalCapacity) => onChange({ technicalCapacity })} />
          </Field>
          <Field label="Estimated capex">
            <TextInput value={draft.capex} placeholder="e.g. 120000000" onChange={(capex) => onChange({ capex })} />
          </Field>
        </div>
      </Card>
    );
  }

  if (step === 2) {
    return (
      <Card title="Finance">
        <Field label="Primary finance source">
          <SelectInput value={draft.financeSource} placeholder="Select" options={["Equity", "Debt", "Grant", "Blended"]} onChange={(financeSource) => onChange({ financeSource })} />
        </Field>
      </Card>
    );
  }

  if (step === 3) {
    return (
      <Card title="ESG">
        <Field label="ESG note">
          <TextArea value={draft.esgScore} placeholder="Summarise environmental and social commitments" onChange={(esgScore) => onChange({ esgScore })} />
        </Field>
      </Card>
    );
  }

  if (step === 4) {
    return (
      <Card title="Investment">
        <Field label="Investment ask">
          <TextInput value={draft.investmentAsk} placeholder="Amount sought" onChange={(investmentAsk) => onChange({ investmentAsk })} />
        </Field>
      </Card>
    );
  }

  if (step === 5) {
    return (
      <Card title="Assessment">
        <Field label="Regulator note">
          <TextArea value={draft.assessmentNote} placeholder="Internal assessment" onChange={(assessmentNote) => onChange({ assessmentNote })} />
        </Field>
      </Card>
    );
  }

  if (step === 6) {
    return (
      <Card title="Documents">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FileDrop label="Permit pack" fileName={draft.files.permit} onFile={(permit) => onChange({ files: { ...draft.files, permit } })} />
          <FileDrop label="Site layout" fileName={draft.files.layout} onFile={(layout) => onChange({ files: { ...draft.files, layout } })} />
        </div>
      </Card>
    );
  }

  if (step === 7) {
    return (
      <Card title="Legal & Compliance">
        <Field label="Legal counsel">
          <TextInput value={draft.legalCounsel} placeholder="Firm or counsel name" onChange={(legalCounsel) => onChange({ legalCounsel })} />
        </Field>
      </Card>
    );
  }

  if (step === 8) {
    return (
      <Card title="Optional metadata">
        <Field label="Additional note">
          <TextArea value={draft.metadataNote} placeholder="Anything else the reviewer should know" onChange={(metadataNote) => onChange({ metadataNote })} />
        </Field>
      </Card>
    );
  }

  return null;
}
