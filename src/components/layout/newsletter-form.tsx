"use client";

import { useId, useState } from "react";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const errId = useId();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || hp) return;
    setStatus("loading");
    try {
      // TODO: wire to /api/subscribe (Resend audience or similar). For now: console log.
      // eslint-disable-next-line no-console
      console.log("[newsletter] subscribe", { email, source });
      await new Promise((r) => setTimeout(r, 400));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-sm text-emerald-400">
        <CheckCircle2 size={14} />
        Subscribed. We&apos;ll be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
        Industry insights
      </p>
      <p className="text-xs text-text-3 leading-relaxed">
        Occasional updates on products, paper industry trends, and case studies. No spam.
      </p>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
      />
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="you@yourmill.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          aria-invalid={status === "error" ? true : undefined}
          aria-describedby={status === "error" ? errId : undefined}
          className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-text-4 focus:border-amber-500/50 outline-none transition-colors min-w-0"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-black text-xs font-bold transition-colors flex-shrink-0"
        >
          {status === "loading" ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Mail size={12} />
          )}
          Subscribe
        </button>
      </div>
      {status === "error" && (
        <p id={errId} role="alert" className="text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={11} />
          Failed. Try again.
        </p>
      )}
    </form>
  );
}
