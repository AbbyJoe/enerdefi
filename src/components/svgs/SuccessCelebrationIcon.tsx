export function SuccessCelebrationIcon({ className }: { className?: string }) {
  return (
    <img
      src="/assets/success-celebration.png"
      width={150}
      height={150}
      alt=""
      aria-hidden="true"
      className={`size-[150px] object-contain animate-[success-pop_0.6s_cubic-bezier(0.34,1.56,0.64,1)_both] ${className ?? ""}`}
    />
  );
}
