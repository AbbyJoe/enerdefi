export function TextArea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-[148px] w-full resize-y rounded-lg border border-[rgba(5,17,34,0.1)] bg-white px-3.5 py-3 text-base leading-6 text-[#212b36] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none focus:border-[rgba(254,102,0,0.8)]"
    />
  );
}
