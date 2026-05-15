"use client";

import { ExternalLink } from "lucide-react";
import { SendfoxForm } from "@/components/sendfox-form";

interface SendfoxEmbedProps {
  sendfoxFormAction: string | null;
  sendfoxRecaptcha?: boolean;
  sendfoxSuccessRedirectUrl?: string | null;
  sendfoxHostedFormUrl: string | null;
}

export function SendfoxEmbed({
  sendfoxFormAction,
  sendfoxRecaptcha = false,
  sendfoxSuccessRedirectUrl = null,
  sendfoxHostedFormUrl,
}: SendfoxEmbedProps) {
  if (sendfoxHostedFormUrl) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Enter your email to continue. Sendfox will send you to whatever thank-you /
          redirect URL you set for that form (this site, Notion, etc.).
        </p>
        <a
          href={sendfoxHostedFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Continue to signup
          <ExternalLink className="size-4 shrink-0 opacity-80" aria-hidden />
        </a>
      </div>
    );
  }

  if (sendfoxFormAction) {
    return (
      <SendfoxForm
        action={sendfoxFormAction}
        recaptcha={sendfoxRecaptcha}
        successRedirectUrl={sendfoxSuccessRedirectUrl}
      />
    );
  }

  return (
    <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-6 text-sm text-amber-950 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-100">
      <p className="font-medium">Connect Sendfox</p>
      <p className="mt-2 text-amber-900/90 dark:text-amber-100/90">
        Set <code className="rounded bg-amber-100/80 px-1 py-0.5 text-xs dark:bg-amber-900/80">sendfoxFormAction</code> in{" "}
        <code className="rounded bg-amber-100/80 px-1 py-0.5 text-xs dark:bg-amber-900/80">lib/resources.ts</code>. In
        Sendfox, set the post-subscribe redirect (Notion, this site’s /thank-you/…, or
        any URL).
      </p>
    </div>
  );
}
