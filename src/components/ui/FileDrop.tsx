import { useId, useState } from "react";
import { UploadIcon } from "../svgs/UploadIcon";

export function FileDrop({
  label,
  fileName,
  onFile,
}: {
  label: string;
  fileName?: string;
  onFile: (name: string) => void;
}) {
  const id = useId();
  const [over, setOver] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium leading-4 text-[#212b36]">{label}</span>
      <label
        htmlFor={id}
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setOver(false);
          const file = event.dataTransfer.files[0];
          if (file) onFile(file.name);
        }}
        className={`flex h-[100px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-4 text-center ${over ? "border-[#fe6600] bg-[#fff8f5]" : "border-[rgba(5,17,34,0.16)] bg-white"}`}
      >
        <UploadIcon />
        <p className="mt-2 text-xs leading-4 text-[#546071]">
          <span className="font-semibold text-[#fe6600]">Click to upload</span> or drag and drop
        </p>
        <p className="text-[11px] leading-4 text-[rgba(5,17,34,0.55)]">
          {fileName || "SVG, PNG, JPG or PDF (max. 800×400px)"}
        </p>
        <input
          id={id}
          type="file"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onFile(file.name);
          }}
        />
      </label>
    </div>
  );
}
