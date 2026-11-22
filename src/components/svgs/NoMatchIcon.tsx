export function NoMatchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill="#FFF4ED" />
      <circle cx="60" cy="60" r="40" fill="#FFE4D1" />
      <rect x="34" y="30" width="42" height="54" rx="8" fill="white" />
      <path d="M42 42h22M42 50h10M42 58h6" stroke="#FFE4D1" strokeWidth="3.5" strokeLinecap="round" />
      <path d="m80 80 10 10" stroke="#FE6600" strokeWidth="8" strokeLinecap="round" />
      <circle cx="68" cy="68" r="17" fill="#FFF4ED" stroke="#FE6600" strokeWidth="5" />
      <path d="m62 62 12 12m0-12L62 74" stroke="#FE6600" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="24" cy="38" r="4" fill="#FDB022" />
      <circle cx="94" cy="40" r="3.5" fill="#2ED3B7" />
      <circle cx="98" cy="72" r="3" fill="#F670C7" />
      <path d="M16 72c4-2 7 2 10 0" stroke="#36BFFA" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
