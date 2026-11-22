export function EmptyProjectsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill="#FFF4ED" />
      <circle cx="60" cy="60" r="40" fill="#FFE4D1" />
      <path d="M32 43a7 7 0 0 1 7-7h13l8 8h21a7 7 0 0 1 7 7v28H32V43Z" fill="#FE6600" fillOpacity="0.65" />
      <rect x="42" y="42" width="36" height="28" rx="4" fill="white" fillOpacity="0.92" />
      <path d="M49 50h18" stroke="#FFE4D1" strokeWidth="3" strokeLinecap="round" />
      <rect x="32" y="56" width="56" height="30" rx="8" fill="#FE6600" />
      <path d="M60 64v14M53 71h14" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="24" cy="38" r="4" fill="#FDB022" />
      <circle cx="96" cy="40" r="3.5" fill="#2ED3B7" />
      <circle cx="98" cy="78" r="3" fill="#F670C7" />
      <path d="M16 72c4-2 7 2 10 0" stroke="#36BFFA" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
