"use client";

import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";

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
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function scheduleReset() {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus("idle"), 4000);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      scheduleReset();
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
          phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
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
    scheduleReset();
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="bg-sv-black text-paper"
    >
      <div className="mx-auto max-w-275 px-6 py-32 md:px-14 md:py-44">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="flex items-center gap-6 text-[clamp(1.25rem,2vw,1.75rem)] font-light tracking-[0.02em] text-paper"
        >
          Contact
          <span className="h-px flex-1 bg-paper/15" />
        </motion.p>

        <div className="mt-10 grid gap-16 md:mt-14 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
          >
            <a href={EMAIL_HREF} className="group mt-2 inline-block">
              <span className="text-[clamp(1.05rem,1.8vw,1.4rem)] font-normal tracking-[0.02em] text-paper/80 transition-colors duration-300 hover:text-paper">
                {EMAIL}
              </span>
            </a>

            <div className="mt-9 flex flex-col gap-3">
              <span className="text-[9px] uppercase tracking-[0.35em] text-paper/45">
                Instagram
              </span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[clamp(1.05rem,1.8vw,1.4rem)] font-normal tracking-[0.02em] text-paper/80 transition-colors duration-300 hover:text-paper"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4 text-paper/60"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.2"
                    cy="6.8"
                    r="0.4"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
                svdesignsinc
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
              <span className="text-[9px] uppercase tracking-[0.35em] text-paper/45">
                Name
              </span>
              <input
                required
                type="text"
                name="name"
                autoComplete="name"
                className="border-b border-hairline-light bg-transparent pb-3 text-base font-light tracking-normal text-paper placeholder:text-paper/30 focus:border-paper focus:outline-none outline-none"
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="text-[9px] uppercase tracking-[0.35em] text-paper/45">
                Email
              </span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                className="border-b border-hairline-light bg-transparent pb-3 text-base font-light tracking-normal text-paper placeholder:text-paper/30 focus:border-paper focus:outline-none outline-none"
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="text-[9px] uppercase tracking-[0.35em] text-paper/45">
                Phone
              </span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                className="border-b border-hairline-light bg-transparent pb-3 text-base font-light tracking-normal text-paper placeholder:text-paper/30 focus:border-paper focus:outline-none outline-none"
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="text-[9px] uppercase tracking-[0.35em] text-paper/45">
                Message
              </span>
              <textarea
                required
                name="message"
                rows={3}
                className="resize-none border-b border-hairline-light bg-transparent pb-3 text-base font-light tracking-normal text-paper placeholder:text-paper/30 focus:border-paper focus:outline-none outline-none"
              />
            </label>

            <div className="mt-8">
              {status === "sent" ? (
                <p
                  role="status"
                  className="text-sm font-light tracking-wide text-paper/75"
                >
                  Our team will reach out soon
                </p>
              ) : status === "error" ? (
                <p
                  role="status"
                  className="text-sm font-light tracking-wide text-paper/75"
                >
                  Something went wrong while sending your message. Please try
                  again, or write to us directly at {EMAIL}.
                </p>
              ) : null}

              {status !== "sending" && (
                <button
                  type="submit"
                  className="group relative mt-4 inline-flex items-center justify-center border border-paper/25 px-8 py-3.5 text-[10px] font-normal uppercase tracking-[0.42em] text-paper transition-colors duration-500 ease-out hover:bg-paper hover:text-sv-black"
                >
                  Send
                </button>
              )}
              {status === "sending" && (
                <button
                  type="submit"
                  disabled
                  className="group relative mt-4 inline-flex items-center justify-center border border-paper/25 px-8 py-3.5 text-[10px] font-normal uppercase tracking-[0.42em] text-paper transition-colors duration-500 ease-out hover:bg-paper hover:text-sv-black disabled:opacity-50"
                >
                  Sending
                </button>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}