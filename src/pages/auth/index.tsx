import { useNavigate } from "@tanstack/react-router";
import { useAppState } from "../../state";

export function SignedOut() {
  const { setSignedIn } = useAppState();
  const navigate = useNavigate();
  return (
    <main className="grid min-h-screen place-items-center bg-[#0b1d38] px-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center">
        <img src="/assets/logo-mark.png" width={48} height={48} alt="" className="mx-auto" />
        <h1 className="mt-4 text-2xl font-bold">Signed out</h1>
        <p className="mt-2 text-sm text-[#546071]">Sign back in to the Core Regulator workspace.</p>
        <button
          type="button"
          onClick={() => {
            setSignedIn(true);
            void navigate({ to: "/" });
          }}
          className="mt-6 h-12 w-full rounded-lg bg-[#fe6600] font-bold text-white"
        >
          Continue as Matthew Smith
        </button>
      </section>
    </main>
  );
}
