"use client";

import { ExternalLink } from "lucide-react";

interface SendfoxEmbedProps {
  sendfoxFormHtml: string | null;
  sendfoxHostedFormUrl: string | null;
}

/**
 * Sendfox integration surface.
 *
 * Note: embed snippets that rely on inline `<script>` tags will not execute when
 * injected via React. If your form does not render, use `sendfoxHostedFormUrl`
 * (Sendfox hosted form) instead, or paste a minimal HTML form if Sendfox provides one.
 */
export function SendfoxEmbed({
  sendfoxFormHtml,
  sendfoxHostedFormUrl,
}: SendfoxEmbedProps) {
  if (sendfoxHostedFormUrl) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Enter your email to get the download link. You’ll be redirected to the
          thank-you page after subscribing.
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

  if (sendfoxFormHtml) {
    return (
      <div
        className="sendfox-form-root rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40 [&_input]:max-w-full"
        // Trusted: you paste your own Sendfox HTML in lib/resources.ts
        dangerouslySetInnerHTML={{ __html: sendfoxFormHtml }}
      />
    );
  }

  return (
    <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50 p-6 text-sm text-amber-950 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-100">
      <p className="font-medium">Connect Sendfox</p>
      <p className="mt-2 text-amber-900/90 dark:text-amber-100/90">
        Set <code className="rounded bg-amber-100/80 px-1 py-0.5 text-xs dark:bg-amber-900/80">sendfoxHostedFormUrl</code> or{" "}
        <code className="rounded bg-amber-100/80 px-1 py-0.5 text-xs dark:bg-amber-900/80">sendfoxFormHtml</code> for this
        resource in{" "}
        <code className="rounded bg-amber-100/80 px-1 py-0.5 text-xs dark:bg-amber-900/80">lib/resources.ts</code>. In
        Sendfox, set the post-subscribe redirect to your thank-you URL for this slug.
      </p>
    </div>
  );
}
