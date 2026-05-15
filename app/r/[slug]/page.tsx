import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SendfoxEmbed } from "@/components/sendfox-embed";
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
    return { title: "Not found" };
  }
  const base = getSiteUrl();
  return {
    title: resource.title,
    description: resource.description,
    alternates: { canonical: `${base}/r/${slug}` },
    openGraph: {
      title: resource.title,
      description: resource.description,
      url: `${base}/r/${slug}`,
    },
  };
}

export default async function ResourceLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const resource = getLeadMagnetBySlug(slug);
  if (!resource) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/resources"
        className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All downloads
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {resource.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        {resource.description}
      </p>
      <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-500">
        Studying Azure AI and the AI-103 path on{" "}
        <a
          href={siteConfig.youtubeChannelUrl}
          className="font-medium text-zinc-800 underline-offset-2 hover:underline dark:text-zinc-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube
        </a>
        ?{" "}
        {resource.postSignupNote ??
          "After you subscribe, Sendfox redirects to the URL you configured there (for example a thank-you page on this site or an external link)."}
      </p>
      <div className="mt-10">
        <SendfoxEmbed
          sendfoxFormAction={resource.sendfoxFormAction}
          sendfoxRecaptcha={resource.sendfoxRecaptcha}
          sendfoxSuccessRedirectUrl={resource.sendfoxSuccessRedirectUrl}
          sendfoxHostedFormUrl={resource.sendfoxHostedFormUrl}
        />
      </div>
    </article>
  );
}
