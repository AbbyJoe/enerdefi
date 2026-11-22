import { Asset } from "../../../components/ui/Asset";
import { Card } from "../../../components/ui/Card";
import { Field } from "../../../components/ui/Field";
import { FileDrop } from "../../../components/ui/FileDrop";
import { RadioChoice } from "../../../components/ui/RadioChoice";
import { SectionLabel } from "../../../components/ui/SectionLabel";
import { SelectInput } from "../../../components/ui/SelectInput";
import { TextArea } from "../../../components/ui/TextArea";
import { TextInput } from "../../../components/ui/TextInput";
import type { ProjectCategory, ProjectDraft } from "../../../lib/types";

const categories: { id: ProjectCategory; label: string; icon: string }[] = [
  { id: "Renewable", label: "Renewable", icon: "/assets/icon-sun.svg" },
  { id: "Oil & Gas", label: "Oil & Gas", icon: "/assets/icon-flame.svg" },
  { id: "Power", label: "Power", icon: "/assets/icon-power.svg" },
];

const types: Record<ProjectCategory, string[]> = {
  Renewable: ["Solar", "Wind", "Hydro", "Biomass"],
  "Oil & Gas": ["Upstream", "Midstream", "Downstream", "Gas Processing"],
  Power: ["Generation", "Transmission", "Distribution"],
};

type ProjectOverviewProps = {
  draft: ProjectDraft;
  errors: Record<string, string>;
  onChange: (partial: Partial<ProjectDraft>) => void;
};

export function ProjectOverview({ draft, errors, onChange }: ProjectOverviewProps) {
  return (
    <>
      <Card title="Project Information">
        <div className="flex items-center justify-between">
          <p className="text-base leading-6 font-semibold text-[#212b36]">Project Category:</p>
          <div className="flex gap-3">
            {categories.map((category) => {
              const selected = draft.category === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onChange({ category: category.id, projectType: "" })}
                  className={`flex h-11 w-36 items-center gap-2 rounded-lg px-3 shadow-[0_1px_2px_rgba(16,24,40,0.05)] ${selected ? "border-2 border-[rgba(254,102,0,0.8)]" : "border border-[rgba(5,17,34,0.1)]"}`}
                >
                  <Asset src={category.icon} width={24} height={24} />
                  <span className="text-base text-[rgba(5,17,34,0.55)]">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Project Name/Title" error={errors.name}>
            <TextInput value={draft.name} placeholder="eg: ECG Solar Farms" onChange={(name) => onChange({ name })} />
          </Field>
          <Field label="Country/Region">
            <SelectInput value={draft.country} placeholder="Select" options={["Nigeria", "Ghana", "Kenya"]} onChange={(country) => onChange({ country })} />
          </Field>
          <Field label="Project type">
            <SelectInput value={draft.projectType} placeholder="Select" options={types[draft.category]} onChange={(projectType) => onChange({ projectType })} />
          </Field>
          <Field label="State/LGA">
            <SelectInput value={draft.state} placeholder="Select" options={["Lagos", "Rivers", "Abuja FCT", "Kano", "Delta"]} onChange={(state) => onChange({ state })} />
          </Field>
          <Field label="Sector">
            <SelectInput value={draft.sector} placeholder="Select" options={["Generation", "Transmission", "Distribution", "Production", "Exploration"]} onChange={(sector) => onChange({ sector })} />
          </Field>
          <Field label="Site/Location/Address">
            <TextInput value={draft.address} placeholder="Enter address" onChange={(address) => onChange({ address })} />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Project Summary" hint="This is a hint text to help user." error={errors.summary}>
            <TextArea value={draft.summary} placeholder="Enter a description..." onChange={(summary) => onChange({ summary })} />
          </Field>
        </div>
      </Card>

      <Card title="Sponsor/Company Details">
        <SectionLabel>Company info</SectionLabel>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Company Name" error={errors.companyName}>
            <TextInput value={draft.companyName} placeholder="Enter Company Name" onChange={(companyName) => onChange({ companyName })} />
          </Field>
          <Field label="Company Registration No.">
            <TextInput value={draft.registrationNo} placeholder="Enter Registration Number" onChange={(registrationNo) => onChange({ registrationNo })} />
          </Field>
          <Field label="Corporate Entity Type">
            <SelectInput value={draft.entityType} placeholder="Select Entity type" options={["Limited Liability Company", "Public Limited Company", "Partnership", "Government Agency"]} onChange={(entityType) => onChange({ entityType })} />
          </Field>
          <Field label="Registered Address">
            <TextInput value={draft.registeredAddress} placeholder="Enter address" onChange={(registeredAddress) => onChange({ registeredAddress })} />
          </Field>
          <Field label="Date of incorporation">
            <TextInput type="date" value={draft.incorporationDate} placeholder="DD/MM/YYYY" onChange={(incorporationDate) => onChange({ incorporationDate })} />
          </Field>
          <Field label="Tax Identification Number (TIN/VAT)">
            <TextInput value={draft.taxId} placeholder="Enter TIN" onChange={(taxId) => onChange({ taxId })} />
          </Field>
          <Field label="Jurisdiction of Incorporation">
            <TextInput value={draft.jurisdiction} placeholder="Country/State/Province" onChange={(jurisdiction) => onChange({ jurisdiction })} />
          </Field>
        </div>
        <div className="mt-8">
          <SectionLabel>Contact person</SectionLabel>
          <div className="mt-4 grid max-w-[512px] gap-4">
            <Field label="Full Name">
              <TextInput value={draft.contactName} placeholder="Enter full legal name" onChange={(contactName) => onChange({ contactName })} />
            </Field>
            <Field label="Email Address" error={errors.contactEmail}>
              <TextInput value={draft.contactEmail} placeholder="Enter email address" onChange={(contactEmail) => onChange({ contactEmail })} />
            </Field>
          </div>
        </div>
        <div className="mt-8">
          <SectionLabel>Supporting documents</SectionLabel>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FileDrop label="Ownership structure" fileName={draft.files.ownership} onFile={(ownership) => onChange({ files: { ...draft.files, ownership } })} />
            <FileDrop label="Board of Directors & Key Management" fileName={draft.files.board} onFile={(board) => onChange({ files: { ...draft.files, board } })} />
            <FileDrop label="Track Record (relevant project experience, references)" fileName={draft.files.track} onFile={(track) => onChange({ files: { ...draft.files, track } })} />
            <FileDrop label="Audited Financial Statements (last 2–3 years)" fileName={draft.files.financials} onFile={(financials) => onChange({ files: { ...draft.files, financials } })} />
            <div className="flex flex-col gap-4">
              <RadioChoice value={draft.compliance} onChange={(compliance) => onChange({ compliance })} />
              <FileDrop label="Litigation history, ESG compliance history, Sanctions/PEP screening result" fileName={draft.files.compliance} onFile={(compliance) => onChange({ files: { ...draft.files, compliance } })} />
            </div>
          </div>
        </div>
      </Card>

      <Card title="Sponsor Track Record">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <Field label="No. of Completed Projects">
              <TextInput value={draft.completedProjects} placeholder="Eg: 5" onChange={(completedProjects) => onChange({ completedProjects })} />
            </Field>
            <Field label="Total Deployed Capacity (MW/MMBtu)">
              <TextInput value={draft.capacity} placeholder="Eg: 5" onChange={(capacity) => onChange({ capacity })} />
            </Field>
          </div>
          <div className="flex flex-col gap-4">
            <Field label="Case Study URL (Optional)">
              <TextInput value={draft.caseStudyUrl} placeholder="Paste Case study URL" onChange={(caseStudyUrl) => onChange({ caseStudyUrl })} />
            </Field>
            <FileDrop label="Or simply upload Case Study here" fileName={draft.files.caseStudy} onFile={(caseStudy) => onChange({ files: { ...draft.files, caseStudy } })} />
          </div>
        </div>
      </Card>
    </>
  );
}
