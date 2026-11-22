import { TopBar } from "../../components/layouts/TopBar";
import { useAppState } from "../../state";

export function SettingsPage() {
  const { currency, setCurrency } = useAppState();
  return (
    <>
      <TopBar title="Settings" />
      <main className="px-4 py-4 sm:px-6 sm:py-6">
        <section className="max-w-lg rounded-2xl bg-white p-5 sm:p-6">
          <h2 className="text-lg font-bold">Profile</h2>
          <p className="mt-1 text-sm text-[#546071]">Matthew Smith · Core Regulator</p>
          <label className="mt-6 block text-sm font-medium">Display currency</label>
          <select value={currency} onChange={(event) => setCurrency(event.target.value as typeof currency)} className="mt-2 h-10 w-full rounded-lg border border-[rgba(5,17,34,0.1)] px-3">
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </section>
      </main>
    </>
  );
}
