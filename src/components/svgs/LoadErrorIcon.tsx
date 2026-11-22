export function LoadErrorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill="#FEF3F2" />
      <circle cx="60" cy="60" r="40" fill="#FEE4E2" />
      <rect x="34" y="30" width="42" height="54" rx="8" fill="white" />
      <path d="M42 42h22M42 50h14M42 58h8" stroke="#FEE4E2" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M70.5 51.5a5 5 0 0 1 9 0l15 29a5 5 0 0 1-4.5 7.5H60a5 5 0 0 1-4.5-7.5l15-29Z" fill="#D92D20" />
      <path d="M75 61v12" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <circle cx="75" cy="80" r="2.5" fill="white" />
      <circle cx="24" cy="38" r="4" fill="#FDA29B" />
      <circle cx="94" cy="40" r="3.5" fill="#FECDCA" />
      <path d="M16 72c4-2 7 2 10 0" stroke="#FDA29B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
