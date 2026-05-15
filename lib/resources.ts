/**
 * Single source of truth for lead magnets.
 *
 * Sendfox: set each form’s post-subscribe redirect in Sendfox to any URL you want
 * (e.g. Notion, or `{NEXT_PUBLIC_SITE_URL}/thank-you/{slug}` on this site).
 *
 * Paste the **form only** (omit the `<script src="https://cdn.sendfox.com/...">` tag)
 * into `sendfoxFormHtml`, or set `sendfoxHostedFormUrl` to link out to Sendfox’s hosted form.
 */
export interface LeadMagnet {
  slug: string;
  title: string;
  description: string;
  /** Public URL path, e.g. /downloads/guide.pdf (file lives in public/) */
  downloadPath: string;
  /** Form markup from Sendfox embed (no script tag; app loads form.js). */
  sendfoxFormHtml: string | null;
  /** If you prefer not to embed scripts, use Sendfox’s hosted form URL. */
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
    sendfoxFormHtml: `<form method="post" action="https://sendfox.com/form/m8zel2/m275jl" class="sendfox-form" id="m275jl" data-async="true" data-recaptcha="true">
<p><label for="sendfox_form_name">First Name: </label><input type="text" id="sendfox_form_name" placeholder="First Name" name="first_name" required /></p>
<p><label for="sendfox_form_email">Email: </label><input type="email" id="sendfox_form_email" placeholder="Email" name="email" required /></p>
<!-- no botz please -->
<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="a_password" tabindex="-1" value="" autocomplete="off" /></div>
<p><button type="submit">Submit</button></p>
</form>`,
    sendfoxHostedFormUrl: null,
    thankYouYoutubeVideoId: null,
    postSignupNote:
      "After you subscribe, Sendfox redirects you to our Notion page with the AI-103 free and cheap resources.",
  },
];

const bySlug = new Map(leadMagnets.map((r) => [r.slug, r]));

export function getLeadMagnetBySlug(slug: string): LeadMagnet | undefined {
  return bySlug.get(slug);
}

export function getAllLeadMagnets(): LeadMagnet[] {
  return [...leadMagnets];
}
