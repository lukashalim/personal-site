"use client";

import Script from "next/script";
import { ExternalLink } from "lucide-react";

const SENDFOX_FORM_JS = "https://cdn.sendfox.com/js/form.js";

interface SendfoxEmbedProps {
  sendfoxFormHtml: string | null;
  sendfoxHostedFormUrl: string | null;
}

/**
 * Sendfox integration surface.
 *
 * Paste the form markup only (no `<script>` tag) into `sendfoxFormHtml`; we load
 * `form.js` via `next/script` so `data-async` / reCAPTCHA work.
 */
export function SendfoxEmbed({
  sendfoxFormHtml,
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

  if (sendfoxFormHtml) {
    return (
      <>
        <div
          className="sendfox-form-root rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40 [&_button]:rounded-lg [&_button]:bg-zinc-900 [&_button]:px-4 [&_button]:py-2 [&_button]:text-white [&_input]:mt-1 [&_input]:w-full [&_input]:max-w-md [&_input]:rounded-md [&_input]:border [&_input]:border-zinc-300 [&_input]:px-3 [&_input]:py-2 dark:[&_input]:border-zinc-600 dark:[&_input]:bg-zinc-950 [&_label]:text-sm [&_label]:font-medium [&_p]:mb-4"
          dangerouslySetInnerHTML={{ __html: sendfoxFormHtml }}
        />
        <Script src={SENDFOX_FORM_JS} strategy="afterInteractive" />
      </>
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
        Sendfox, set the post-subscribe redirect (Notion, this site’s /thank-you/…, or
        any URL).
      </p>
    </div>
  );
}
