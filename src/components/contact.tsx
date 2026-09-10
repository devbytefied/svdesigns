"use client";

import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/svdesignsinc/";
const EMAIL = "INFO@SVDESIGNS.COM";
const EMAIL_HREF = "mailto:info@svdesigns.com";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      return;
    }
    const form = event.currentTarget;
    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: (form.elements.namedItem("name") as HTMLInputElement)
            .value,
          reply_to: (form.elements.namedItem("email") as HTMLInputElement).value,
          message: (form.elements.namedItem("message") as HTMLTextAreaElement)
            .value,
        },
        { publicKey: PUBLIC_KEY },
      );
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" aria-label="Contact" className="scroll-mt-24 bg-paper text-ink">
      <div className="mx-auto max-w-[1100px] px-6 py-32 md:px-14 md:py-44">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="flex items-center gap-4 text-[9px] font-normal uppercase tracking-[0.42em] text-ink/60"
        >
          <span className="h-px w-10 bg-current opacity-70" />
          Contact
        </motion.p>

        <div className="mt-14 grid gap-20 md:mt-20 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
          >
            <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.02] tracking-[0.01em]">
              Begin your
              <br />
              build.
            </h2>

            <a href={EMAIL_HREF} className="group mt-16 inline-block">
              <span className="relative block pb-2 text-[clamp(1.05rem,1.8vw,1.4rem)] font-normal tracking-[0.02em]">
                {EMAIL}
                <span className="absolute inset-x-0 bottom-0 h-px bg-hairline" />
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </span>
            </a>

            <div className="mt-12 flex flex-col gap-3">
              <span className="text-[9px] uppercase tracking-[0.35em] text-ink/45">
                Instagram
              </span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-[0.08em] text-ink/70 transition-colors hover:text-ink"
              >
                svdesignsinc ↗
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 pt-2"
          >
            <label className="flex flex-col gap-3">
              <span className="text-[9px] uppercase tracking-[0.35em] text-ink/45">
                Name
              </span>
              <input
                required
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Full name"
                className="border-b border-hairline bg-transparent pb-3 text-base font-light tracking-normal text-ink placeholder:text-ink/30 focus:border-ink focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="text-[9px] uppercase tracking-[0.35em] text-ink/45">
                Email
              </span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="border-b border-hairline bg-transparent pb-3 text-base font-light tracking-normal text-ink placeholder:text-ink/30 focus:border-ink focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="text-[9px] uppercase tracking-[0.35em] text-ink/45">
                Message
              </span>
              <textarea
                required
                name="message"
                rows={3}
                placeholder="Tell us about your build."
                className="resize-none border-b border-hairline bg-transparent pb-3 text-base font-light tracking-normal text-ink placeholder:text-ink/30 focus:border-ink focus:outline-none"
              />
            </label>

            <div className="mt-8">
              {status === "sent" ? (
                <p className="text-sm font-light tracking-wide text-ink/75">
                  Thank you — we will be in touch within two working days.
                </p>
              ) : status === "error" ? (
                <p className="text-sm font-light tracking-wide text-ink/75">
                  Please try again, or write to us directly at {EMAIL}.
                </p>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group flex w-fit items-center gap-4 text-[10px] font-normal uppercase tracking-[0.42em] text-ink disabled:opacity-50"
                >
                  <span className="relative pb-1.5">
                    {status === "sending" ? "Sending" : "Request Consultation"}
                    <span className="absolute inset-x-0 bottom-0 h-px bg-ink/30" />
                    <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-sm leading-none transition-transform duration-500 ease-out group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}