import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CirclePlay, Download } from "lucide-react";
import { getLeadMagnetBySlug, getAllLeadMagnets } from "@/lib/resources";
import { getSiteUrl, siteConfig } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllLeadMagnets().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getLeadMagnetBySlug(slug);
  if (!resource) {
    return { title: "Thank you" };
  }
  return {
    title: `Thank you — ${resource.title}`,
    description: `Your download: ${resource.title}`,
    robots: { index: false, follow: true },
  };
}

export default async function ThankYouPage({ params }: PageProps) {
  const { slug } = await params;
  const resource = getLeadMagnetBySlug(slug);
  if (!resource) {
    notFound();
  }

  const ytEmbed =
    resource.thankYouYoutubeVideoId != null &&
    resource.thankYouYoutubeVideoId.length > 0
      ? `https://www.youtube-nocookie.com/embed/${resource.thankYouYoutubeVideoId}`
      : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
        You’re in
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Thanks — here’s your download
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        {resource.title}. If the file doesn’t open, check your downloads folder or
        try again on desktop.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href={resource.downloadPath}
          download
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          <Download className="size-4 shrink-0" aria-hidden />
          Download
        </a>
        <a
          href={siteConfig.youtubeChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          <CirclePlay className="size-4 shrink-0 text-red-600 dark:text-red-500" aria-hidden />
          Subscribe on YouTube
        </a>
      </div>

      {ytEmbed ? (
        <div className="mt-10">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
            Watch next
          </h2>
          <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border border-zinc-200 bg-black dark:border-zinc-800">
            <iframe
              title="Recommended video"
              src={ytEmbed}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}

      <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-500">
        Redirect URL for Sendfox should be:{" "}
        <span className="font-mono text-zinc-700 dark:text-zinc-300">
          {getSiteUrl()}/thank-you/{resource.slug}
        </span>
      </p>

      <Link
        href="/resources"
        className="mt-6 inline-block text-sm font-medium text-zinc-800 underline-offset-2 hover:underline dark:text-zinc-200"
      >
        More free downloads
      </Link>
    </div>
  );
}
