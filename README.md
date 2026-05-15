# personal-site

Personal site and lead magnet downloads for **Lukas Halim** — Azure AI / AI-103 study content and YouTube funnel. Stack: [Next.js](https://nextjs.org) App Router, TypeScript, Tailwind CSS, deployed on [Vercel](https://vercel.com).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables (Vercel)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://lukashalim.com`). Used for sitemap, metadata, and thank-you URLs shown on pages. |
| `NEXT_PUBLIC_YOUTUBE_CHANNEL_URL` | Your channel link for CTAs. Defaults to `https://www.youtube.com/@haliml` if unset. |

## GitHub and Vercel

1. Create a repo (or use [github.com/lukashalim/personal-site](https://github.com/lukashalim/personal-site)) and push this project:

   ```bash
   git remote add origin https://github.com/lukashalim/personal-site.git
   git branch -M main
   git push -u origin main
   ```

2. In Vercel: **Add New Project** → Import the GitHub repo → Framework Preset **Next.js** → set the env vars above → Deploy.

3. After you attach a custom domain, set `NEXT_PUBLIC_SITE_URL` to that domain and redeploy so sitemap and Sendfox redirects stay correct.

## Sendfox → after subscribe

1. Add or edit a lead magnet in [`lib/resources.ts`](lib/resources.ts): `slug`, `title`, `downloadPath` (under `public/`), `sendfoxFormAction`, optional `sendfoxSuccessRedirectUrl` (Notion fallback), optional `postSignupNote`, or `sendfoxHostedFormUrl`.
2. In Sendfox, open the form → set **success / thank-you redirect** to any URL, for example:
   - A **Notion** page with the resource, or
   - A thank-you page on this site: `https://YOUR_DOMAIN/thank-you/SLUG` (match `SLUG` to `slug` in `lib/resources.ts`).

**Embed note:** The site uses a React form that POSTs to Sendfox with `X-Requested-With` (same as Sendfox’s async embed) and then follows `redirect_url` from the JSON response. Set your Notion URL in Sendfox **and** optionally in `sendfoxSuccessRedirectUrl` as a fallback.

## Adding a new download

1. Place the file in [`public/downloads/`](public/downloads/) (e.g. `public/downloads/my-guide.pdf`).
2. Append a new object to `leadMagnets` in [`lib/resources.ts`](lib/resources.ts) with `downloadPath: "/downloads/my-guide.pdf"` and a unique `slug`.
3. Configure Sendfox redirect (Notion, `/thank-you/your-slug` on this site, or any URL).
4. Optional: set `thankYouYoutubeVideoId` to a YouTube **video** id (not channel id) for an embed on the thank-you page.

## Project map

| Path | Role |
|------|------|
| [`app/page.tsx`](app/page.tsx) | Home |
| [`app/resources/page.tsx`](app/resources/page.tsx) | Downloads index |
| [`app/r/[slug]/page.tsx`](app/r/[slug]/page.tsx) | Per-resource landing + Sendfox |
| [`app/thank-you/[slug]/page.tsx`](app/thank-you/[slug]/page.tsx) | Post-signup page + file link |
| [`lib/resources.ts`](lib/resources.ts) | All lead magnet definitions |
| [`components/sendfox-embed.tsx`](components/sendfox-embed.tsx) | Sendfox UI (client) |

Thank-you routes are listed in `robots.txt` as `disallow` so they are less likely to be indexed as duplicate thin pages.
