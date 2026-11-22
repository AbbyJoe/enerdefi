export function RadioChoice({
  value,
  onChange,
}: {
  value: "" | "yes" | "no";
  onChange: (value: "yes" | "no") => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium leading-4 text-[#212b36]">Compliance Declarations</span>
      <div className="flex items-center gap-2">
        {(["yes", "no"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className="flex items-center gap-2 text-sm text-[#212b36]"
          >
            <span
              className={`grid size-5 place-items-center rounded-full border ${value === option ? "border-[#fe6600]" : "border-[rgba(5,17,34,0.25)]"}`}
            >
              {value === option ? <span className="size-2.5 rounded-full bg-[#fe6600]" /> : null}
            </span>
            {option === "yes" ? "Yes" : "No"}
          </button>
        ))}
      </div>
    </div>
  );
}
