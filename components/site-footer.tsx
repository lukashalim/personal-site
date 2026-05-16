import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Connect
            </h2>
            <ul className="mt-4 space-y-3">
              {siteConfig.profiles.map((profile) => (
                <li key={profile.href}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-800 transition hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white"
                  >
                    {profile.label}
                    <ExternalLink className="size-3.5 shrink-0 opacity-50" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Projects
            </h2>
            <ul className="mt-4 space-y-3">
              {siteConfig.projects.map((project) => (
                <li key={project.href}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-800 transition group-hover:text-zinc-950 dark:text-zinc-200 dark:group-hover:text-white">
                      {project.label}
                      <ExternalLink className="size-3.5 shrink-0 opacity-50" aria-hidden />
                    </span>
                    <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">
                      {project.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <p className="mt-10 text-xs text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
