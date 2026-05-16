import type { Metadata } from "next";
import Link from "next/link";
import { CirclePlay } from "lucide-react";
import { SendfoxForm } from "@/components/sendfox-form";
import { homeStartHerePlaceholders, homeStatsPlaceholders } from "@/lib/home-placeholders";
import { getAllLeadMagnets } from "@/lib/resources";
import { getSiteUrl, siteConfig } from "@/lib/site";

const homeDescription =
  "Free study materials, a focused YouTube series, and a printable checklist — built while prepping for the Azure AI-103 exam.";

export const metadata: Metadata = {
  title: siteConfig.defaultTitle,
  description: homeDescription,
  alternates: { canonical: getSiteUrl() + "/" },
  openGraph: {
    title: "Pass the AI-103 — study with Lukas Halim",
    description: homeDescription,
    url: getSiteUrl(),
  },
};

export default function Home() {
  const primaryLead = getAllLeadMagnets()[0];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-12 sm:px-6 sm:pb-32 sm:pt-16">
      {/* Hero */}
      <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
        <div className="flex justify-center lg:justify-start">
          {/* TODO: Replace public/headshot.jpg with your professional headshot when ready */}
          <img
            src="/headshot.jpg"
            alt="Lukas Halim"
            width={400}
            height={400}
            className="aspect-square w-full max-w-[min(100%,18rem)] rounded-2xl border border-zinc-200 object-cover shadow-md dark:border-zinc-700 sm:max-w-xs lg:max-w-sm"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] sm:text-sm">
              Azure AI · AI-103 exam study
            </p>
            <h1 className="font-sans text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl sm:leading-[1.1]">
              Pass the AI-103.
              <span className="mt-1 block text-zinc-600 dark:text-zinc-400">
                Here&apos;s everything I used.
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Free study materials, a focused YouTube series, and a printable checklist —
              built while I prepped for the Azure AI-103 exam.
            </p>
          </div>

          <div className="flex max-w-xl flex-col gap-4">
            {primaryLead?.sendfoxFormAction ? (
              <SendfoxForm
                action={primaryLead.sendfoxFormAction}
                recaptcha={primaryLead.sendfoxRecaptcha ?? false}
                successRedirectUrl={primaryLead.sendfoxSuccessRedirectUrl}
                variant="hero"
              />
            ) : null}
            <a
              href={siteConfig.youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[var(--accent)] bg-transparent px-5 py-3 text-sm font-semibold text-[var(--accent)] transition hover:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] sm:w-auto sm:self-start dark:hover:bg-[color-mix(in_srgb,var(--accent)_15%,transparent)]"
            >
              <CirclePlay className="size-5 shrink-0" aria-hidden />
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* TODO: Replace placeholder counts with real stats (YouTube API, analytics, or manual). */}
      <section
        className="mt-16 border-y border-zinc-200 bg-zinc-50/80 py-6 dark:border-zinc-800 dark:bg-zinc-900/40 sm:mt-20"
        aria-label="Audience highlights"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center text-sm text-zinc-600 dark:text-zinc-400 sm:gap-x-3 sm:text-base">
          <span className="font-medium text-zinc-800 dark:text-zinc-200">
            {homeStatsPlaceholders.youtubeSubscribers} YouTube subscribers
          </span>
          <span className="hidden text-zinc-300 sm:inline dark:text-zinc-600" aria-hidden>
            ·
          </span>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">
            {homeStatsPlaceholders.downloads} downloads
          </span>
          <span className="hidden text-zinc-300 sm:inline dark:text-zinc-600" aria-hidden>
            ·
          </span>
          <span className="font-medium text-zinc-800 dark:text-zinc-200">
            {homeStatsPlaceholders.resources} resources
          </span>
        </div>
      </section>

      {/* Start here */}
      <section className="mt-20 sm:mt-28">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Start here
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Pick one resource to begin — more guides and tools are on the way.
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {primaryLead ? (
            <li key={primaryLead.slug}>
              <Link
                href={`/r/${primaryLead.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-[var(--accent)] hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/80 dark:hover:border-[var(--accent)]"
              >
                <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-[var(--accent)] dark:text-zinc-50">
                  {primaryLead.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {primaryLead.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
                  Get the checklist
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ) : null}

          {/* TODO: Replace placeholder cards with real lead magnets when content is ready. */}
          {homeStartHerePlaceholders.map((card) => (
            <li key={card.id}>
              <article className="flex h-full flex-col rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-6 dark:border-zinc-700 dark:bg-zinc-900/30">
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {card.description}
                </p>
                <span className="mt-6 inline-flex cursor-not-allowed text-sm font-medium text-zinc-400 dark:text-zinc-500">
                  {card.ctaLabel}
                </span>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-500">
          <Link
            href="/resources"
            className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
          >
            View all free downloads
          </Link>
        </p>
      </section>

      <p className="mt-16 text-center text-xs text-zinc-400 dark:text-zinc-600">
        Built with Next.js · Vercel
      </p>
    </div>
  );
}
