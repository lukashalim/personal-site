"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Script from "next/script";

const RECAPTCHA_SITE_KEY = "6Lemwu0UAAAAAJghn3RQZjwkYxnCTuYDCAcrJJ7S";

export type SendfoxFormVariant = "default" | "hero";

interface SendfoxFormProps {
  action: string;
  recaptcha?: boolean;
  /** Used if Sendfox JSON response has no redirect_url (set your Notion page here). */
  successRedirectUrl?: string | null;
  variant?: SendfoxFormVariant;
}

interface SendfoxSuccessResponse {
  redirect_url?: string;
}

interface SendfoxErrorResponse {
  errors?: string[];
}

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

function HoneypotField() {
  return (
    <div style={{ position: "absolute", left: "-5000px" }} aria-hidden>
      <input
        type="text"
        name="a_password"
        tabIndex={-1}
        defaultValue=""
        autoComplete="off"
      />
    </div>
  );
}

export function SendfoxForm({
  action,
  recaptcha = false,
  successRedirectUrl = null,
  variant = "default",
}: SendfoxFormProps) {
  const formId = useId().replace(/:/g, "");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);
  const [recaptchaReady, setRecaptchaReady] = useState(!recaptcha);

  const submitPayload = useCallback(
    async (form: HTMLFormElement, recaptchaToken?: string) => {
      setStatus("submitting");
      setMessage(null);

      const body = new FormData(form);
      if (recaptchaToken) {
        body.set("g-recaptcha-response", recaptchaToken);
      }

      try {
        const res = await fetch(action, {
          method: "POST",
          body,
          headers: { "X-Requested-With": "XMLHttpRequest" },
        });

        const data = (await res.json()) as
          | SendfoxSuccessResponse
          | SendfoxErrorResponse;

        if (res.status === 422) {
          const err = data as SendfoxErrorResponse;
          setStatus("error");
          setMessage(err.errors?.[0] ?? "Could not subscribe. Please try again.");
          return;
        }

        if (res.status === 200) {
          const ok = data as SendfoxSuccessResponse;
          const target = ok.redirect_url ?? successRedirectUrl ?? null;
          if (target) {
            window.location.assign(target);
            return;
          }
          setStatus("success");
          setMessage("Thanks — your signup was successful!");
          form.reset();
          return;
        }

        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      } catch {
        setStatus("error");
        setMessage("Network error. Please try again.");
      }
    },
    [action, successRedirectUrl],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;

      if (recaptcha && window.grecaptcha) {
        window.grecaptcha.ready(() => {
          void window.grecaptcha!
            .execute(RECAPTCHA_SITE_KEY, { action: "embedded_form" })
            .then((token) => submitPayload(form, token));
        });
        return;
      }

      await submitPayload(form);
    },
    [recaptcha, submitPayload],
  );

  useEffect(() => {
    if (!recaptcha) {
      return;
    }
    if (window.grecaptcha) {
      setRecaptchaReady(true);
    }
  }, [recaptcha]);

  const disabled = status === "submitting" || (recaptcha && !recaptchaReady);

  const inputBase =
    "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--accent)_35%,transparent)] dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-[var(--accent)]";

  const isHero = variant === "hero";

  return (
    <div
      className={
        isHero
          ? "sendfox-form-root rounded-2xl border border-zinc-200/90 bg-white/90 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-700/90 dark:bg-zinc-900/70 sm:p-8"
          : "sendfox-form-root rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
      }
    >
      {recaptcha ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
          onLoad={() => setRecaptchaReady(true)}
        />
      ) : null}
      <form
        id={formId}
        method="post"
        action={action}
        className={isHero ? "sendfox-form space-y-4" : "sendfox-form space-y-4"}
        onSubmit={handleSubmit}
      >
        {isHero ? (
          <>
            <p className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Get the free downloads
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="w-full sm:max-w-[10.5rem]">
                <label htmlFor={`${formId}-first_name`} className="sr-only">
                  First name
                </label>
                <input
                  type="text"
                  id={`${formId}-first_name`}
                  name="first_name"
                  placeholder="First name"
                  required
                  autoComplete="given-name"
                  className={inputBase}
                />
              </div>
              <div className="min-w-0 flex-1">
                <label htmlFor={`${formId}-email`} className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id={`${formId}-email`}
                  name="email"
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className={inputBase}
                />
              </div>
              <button
                type="submit"
                disabled={disabled}
                className="w-full shrink-0 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:opacity-60 sm:w-auto sm:min-w-[11rem]"
              >
                {status === "submitting" ? "Sending…" : "Send me the resources"}
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              <label htmlFor={`${formId}-first_name`} className="text-sm font-medium">
                First name
              </label>
              <input
                type="text"
                id={`${formId}-first_name`}
                name="first_name"
                placeholder="First Name"
                required
                className="mt-1 w-full max-w-md rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950"
              />
            </p>
            <p>
              <label htmlFor={`${formId}-email`} className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id={`${formId}-email`}
                name="email"
                placeholder="Email"
                required
                className="mt-1 w-full max-w-md rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950"
              />
            </p>
            <p>
              <button
                type="submit"
                disabled={disabled}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              >
                {status === "submitting" ? "Submitting…" : "Submit"}
              </button>
            </p>
          </>
        )}
        <HoneypotField />
        {message ? (
          <p
            className={
              status === "error"
                ? "text-sm text-red-600 dark:text-red-400"
                : "text-sm text-emerald-700 dark:text-emerald-400"
            }
            role="status"
          >
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
