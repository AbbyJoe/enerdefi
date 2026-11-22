import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { TopBar } from "../../components/layouts/TopBar";
import { SpinnerIcon } from "../../components/svgs/SpinnerIcon";
import { useAppState } from "../../state";

export function SupportPage() {
  const { pushToast } = useAppState();
  const [message, setMessage] = useState("");
  const send = useMutation({
    mutationFn: async (body: string) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      if (!body.trim()) throw new Error("empty");
      return true;
    },
    onSuccess: () => {
      setMessage("");
      pushToast({ tone: "success", title: "Message sent", body: "Support will reply in your notifications." });
    },
    onError: () => pushToast({ tone: "warning", title: "Add a message", body: "Tell us what you need help with." }),
  });
  return (
    <>
      <TopBar title="Support" />
      <main className="px-4 py-4 sm:px-6 sm:py-6">
        <section className="max-w-xl rounded-2xl bg-white p-5 sm:p-6">
          <h2 className="text-lg font-bold">Contact support</h2>
          <p className="mt-1 text-sm text-[#546071]">Questions about permits, filings, and document checks.</p>
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="How can we help?" className="mt-4 min-h-32 w-full rounded-lg border border-[rgba(5,17,34,0.1)] px-3 py-3 text-sm outline-none" />
          <button
            type="button"
            disabled={send.isPending}
            onClick={() => send.mutate(message)}
            className="mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#fe6600] px-4 font-bold text-white disabled:opacity-70"
          >
            {send.isPending ? <SpinnerIcon /> : null}
            {send.isPending ? "Sending…" : "Send"}
          </button>
        </section>
      </main>
    </>
  );
}
