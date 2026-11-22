import { TopBar } from "../../components/layouts/TopBar";
import { useAppState } from "../../state";

export function WalletPage() {
  const { currency } = useAppState();
  const amount = currency === "NGN" ? "₦ 48,250,000" : currency === "USD" ? "$ 31,400" : "£ 24,900";
  return (
    <>
      <TopBar title="Wallet" />
      <main className="px-4 py-4 sm:px-6 sm:py-6">
        <section className="max-w-md rounded-2xl bg-white p-5 sm:p-6">
          <p className="text-sm font-medium text-[#546071]">Available balance</p>
          <p className="mt-3 text-2xl font-bold text-[#212b36] sm:text-3xl">{amount}</p>
          <p className="mt-2 text-sm text-[#546071]">Shown in {currency}. Change it from the header.</p>
        </section>
      </main>
    </>
  );
}
