/**
 * Single source of truth for lead magnets.
 *
 * Sendfox: set each form’s post-subscribe redirect in Sendfox to any URL you want
 * (e.g. Notion). The site submits via fetch and follows `redirect_url` from Sendfox.
 *
 * Optional `sendfoxSuccessRedirectUrl` is a fallback if the API omits redirect_url.
 */
export interface LeadMagnet {
  slug: string;
  title: string;
  description: string;
  /** Public URL path, e.g. /downloads/guide.pdf (file lives in public/) */
  downloadPath: string;
  /** Sendfox form POST URL from the embed snippet. */
  sendfoxFormAction: string | null;
  sendfoxRecaptcha?: boolean;
  /** Fallback redirect (e.g. Notion) when Sendfox does not return redirect_url. */
  sendfoxSuccessRedirectUrl: string | null;
  /** If you prefer not to embed, use Sendfox’s hosted form URL. */
  sendfoxHostedFormUrl: string | null;
  /** Optional video embed on thank-you page */
  thankYouYoutubeVideoId: string | null;
  /** Shown above the form; explain where Sendfox sends people after subscribe. */
  postSignupNote: string | null;
}

export const leadMagnets: LeadMagnet[] = [
  {
    slug: "azure-ai-103-starter",
    title: "Azure AI / AI-103 starter checklist",
    description:
      "A short printable checklist to keep your Azure AI services, security, and exam topics organized as you follow along on YouTube.",
    downloadPath: "/downloads/azure-ai-103-starter-readme.txt",
    sendfoxFormAction: "https://sendfox.com/form/m8zel2/m275jl",
    sendfoxRecaptcha: true,
    sendfoxSuccessRedirectUrl:
      "https://www.notion.so/Lead-Magnet-Draft-AI-103-Free-Cheap-Study-Resources-3601984a61b78175b5eac7a8e94278e4",
    sendfoxHostedFormUrl: null,
    thankYouYoutubeVideoId: null,
    postSignupNote:
      "After you subscribe, you’ll be redirected to our Notion page with the AI-103 free and cheap resources.",
  },
];

const bySlug = new Map(leadMagnets.map((r) => [r.slug, r]));

export function getLeadMagnetBySlug(slug: string): LeadMagnet | undefined {
  return bySlug.get(slug);
}

export function getAllLeadMagnets(): LeadMagnet[] {
  return [...leadMagnets];
}
