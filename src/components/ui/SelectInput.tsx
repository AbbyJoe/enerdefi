import { Asset } from "./Asset";

const control =
  "h-10 w-full rounded-lg border border-[rgba(5,17,34,0.1)] bg-white px-3 text-base leading-6 text-[#212b36] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none focus:border-[rgba(254,102,0,0.8)]";

export function SelectInput({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${control} appearance-none pr-9 ${value ? "" : "text-[rgba(5,17,34,0.55)]"}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
        <Asset src="/assets/icon-chevron-field.svg" width={16} height={16} />
      </span>
    </div>
  );
}
