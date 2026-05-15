import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllLeadMagnets } from "@/lib/resources";
import { getSiteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free downloads",
  description:
    "Lead magnets and study files for Azure AI / AI-103 — hosted here, delivered after Sendfox signup.",
  alternates: { canonical: `${getSiteUrl()}/resources` },
  openGraph: {
    title: `Free downloads · ${siteConfig.name}`,
    description:
      "Study files and checklists for Azure AI. Sign up via Sendfox on each resource page.",
    url: `${getSiteUrl()}/resources`,
  },
};

export default function ResourcesPage() {
  const items = getAllLeadMagnets();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Free downloads
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Files for viewers studying Azure AI alongside the channel. Each resource has
        its own page with Sendfox signup; after subscribe, Sendfox sends people to the
        redirect you configure (Notion, a page here, or elsewhere).
      </p>
      <ul className="mt-10 divide-y divide-zinc-200 dark:divide-zinc-800">
        {items.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/r/${r.slug}`}
              className="group flex items-start justify-between gap-4 py-6 transition hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              <div>
                <h2 className="text-lg font-medium text-zinc-900 group-hover:underline dark:text-zinc-50">
                  {r.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {r.description}
                </p>
              </div>
              <ChevronRight
                className="mt-1 size-5 shrink-0 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
