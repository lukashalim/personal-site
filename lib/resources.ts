/**
 * Single source of truth for lead magnets.
 *
 * Sendfox: set each form’s post-subscribe redirect to:
 *   {NEXT_PUBLIC_SITE_URL}/thank-you/{slug}
 *
 * Paste your Sendfox embed HTML into `sendfoxFormHtml` for that resource, or set
 * `sendfoxHostedFormUrl` to link out to Sendfox’s hosted form.
 */
export interface LeadMagnet {
  slug: string;
  title: string;
  description: string;
  /** Public URL path, e.g. /downloads/guide.pdf (file lives in public/) */
  downloadPath: string;
  /** Raw HTML from Sendfox “embed form” (optional). */
  sendfoxFormHtml: string | null;
  /** If you prefer not to embed scripts, use Sendfox’s hosted form URL. */
  sendfoxHostedFormUrl: string | null;
  /** Optional video embed on thank-you page */
  thankYouYoutubeVideoId: string | null;
}

export const leadMagnets: LeadMagnet[] = [
  {
    slug: "azure-ai-103-starter",
    title: "Azure AI / AI-103 starter checklist",
    description:
      "A short printable checklist to keep your Azure AI services, security, and exam topics organized as you follow along on YouTube.",
    downloadPath: "/downloads/azure-ai-103-starter-readme.txt",
    sendfoxFormHtml: null,
    sendfoxHostedFormUrl: null,
    thankYouYoutubeVideoId: null,
  },
];

const bySlug = new Map(leadMagnets.map((r) => [r.slug, r]));

export function getLeadMagnetBySlug(slug: string): LeadMagnet | undefined {
  return bySlug.get(slug);
}

export function getAllLeadMagnets(): LeadMagnet[] {
  return [...leadMagnets];
}
