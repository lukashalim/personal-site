import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CirclePlay } from "lucide-react";
import { getAllLeadMagnets } from "@/lib/resources";
import { getSiteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  alternates: { canonical: getSiteUrl() + "/" },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    url: getSiteUrl(),
  },
};

export default function Home() {
  const featured = getAllLeadMagnets().slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Azure AI · AI-103 study
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
        {siteConfig.name}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        I’m sharing how I study Azure AI services and the skills measured on the AI-103
        path — on{" "}
        <a
          href={siteConfig.youtubeChannelUrl}
          className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-50"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube
        </a>{" "}
        and with free downloads you can grab after joining the list on Sendfox.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <a
          href={siteConfig.youtubeChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700"
        >
          <CirclePlay className="size-5 shrink-0" aria-hidden />
          Watch on YouTube
        </a>
        <Link
          href="/resources"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          Free downloads
          <ArrowRight className="size-4 shrink-0" aria-hidden />
        </Link>
      </div>

      {featured.length > 0 ? (
        <section className="mt-20 border-t border-zinc-200 pt-12 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Featured resources
          </h2>
          <ul className="mt-6 space-y-4">
            {featured.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/r/${r.slug}`}
                  className="block rounded-xl border border-zinc-200 bg-zinc-50/80 p-5 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
                >
                  <span className="font-medium text-zinc-900 dark:text-zinc-50">
                    {r.title}
                  </span>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {r.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
