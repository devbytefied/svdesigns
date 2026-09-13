"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const INSTAGRAM_URL = "https://www.instagram.com/svdesignsinc/";
const EMAIL = "INFO@SVDESIGNS.COM";
const EMAIL_HREF = "mailto:info@svdesigns.com";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const menuLinks = [{ label: "Contact", href: "/#contact" }];

function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    linkRefs.current[0]?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const overlay: Variants = {
    hidden: { clipPath: "inset(0% 0% 0% 100%)" },
    open: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.6, ease: EASE },
    },
    exit: {
      clipPath: "inset(0% 0% 0% 100%)",
      transition: { duration: 0.45, ease: EASE },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + i * 0.09, duration: 0.7, ease: EASE },
    }),
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu"
          initial="hidden"
          animate="open"
          exit="exit"
          variants={overlay}
          role="dialog"
          aria-label="Menu"
          className="fixed inset-y-0 right-0 z-[60] w-full bg-sv-black text-white md:w-[360px]"
        >
          <nav
            aria-label="Primary"
            className="flex h-full flex-col justify-between px-6 pb-8 pt-24 md:px-10 md:pb-12 md:pt-32"
          >
<div>
              <ul className="flex flex-col">
                {menuLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    custom={i}
                    variants={item}
                    initial="hidden"
                    animate="open"
                  >
                    <Link
                      ref={(el) => {
                        linkRefs.current[i] = el;
                      }}
                      href={link.href}
                      onClick={(event) => {
                        event.preventDefault();
                        onClose();
                        const id = link.href.split("#")[1];
                        window.setTimeout(() => {
                          const el = document.getElementById(id);
                          if (el) {
                            const top =
                              el.getBoundingClientRect().top + window.scrollY;
                            window.scrollTo({ top: top + 100, behavior: "smooth" });
                          }
                        }, 100);
                      }}
                      className="text-center w-full border-x border-white justify-center text-2xl font-medium tracking-wide flex items-center"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial="hidden"
              animate="open"
              variants={item}
              custom={3}
              className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
            >
              <div className="flex flex-col items-center justify-center w-full gap-4">
                <Image
                  src="/svdesignsnywhitelogo.png"
                  alt="SV Designs New York"
                  width={1937}
                  height={488}
                  className="w-32 md:w-40 mb-2"
                />
                <a
                  href={EMAIL_HREF}
                  className="text-xs tracking-[0.08em] text-white/85 transition-colors hover:text-white"
                >
                  {EMAIL}
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4"
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
                  Instagram
                </a>
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Header({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <header className="absolute inset-x-0 top-0 z-70 text-white">
      <div className="relative flex items-center">
        <Link
          href="/"
          aria-label="SV Designs — Home"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-4"
        >
          <Image
            src="/logo.svg"
            alt="SV Designs"
            width={1800}
            height={340}
            unoptimized
            priority
            style={{
              filter: open
                ? "drop-shadow(0 2px 8px rgba(0,0,0,0.5)) brightness(0) invert(1)"
                : "drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
            }}
            className="h-6 w-auto md:h-7"
          />
        </Link>

        <button
          type="button"
          onClick={onToggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          className="ml-auto flex h-11 w-11 items-center justify-center bg-black/40 backdrop-blur-md"
        >
          <span className="relative block h-3 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "translate-y-[5.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[5.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-sv-black text-white">
      <div className="px-6 py-16 md:px-14 md:py-24">
        <div className="flex flex-col items-center pt-14">
          <Image
            src="/svdesignsnywhitelogo.png"
            alt="SV Designs New York"
            width={1937}
            height={488}
            className="w-40 md:w-52"
          />
          <p className="mt-8 text-center text-[11px] font-normal uppercase tracking-[0.4em] text-white/40">
            SV Designs Inc., New York
          </p>
        </div>
        <div className="mt-16 flex flex-col gap-5 border-t border-white/12 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[9px] text-center md:text-left font-normal uppercase tracking-[0.3em] text-white/45">
            © 2026 SV DESIGNS, INC. — ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-[11px] font-normal uppercase tracking-[0.3em] text-white/55">
            <a
              href={EMAIL_HREF}
              className="normal-case text-xs leading-none tracking-[0.06em] transition-colors hover:text-white"
            >
              info@svdesigns.com
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-3.5 w-3.5"
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
              Instagram
            </a>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-[9px] font-light leading-relaxed tracking-[0.02em] text-white/30">
          SV Designs, Inc. is not sponsored, associated, approved, endorsed, or
          in any way affiliated with Jaguar Land Rover Limited. Jaguar Land
          Rover Limited is the owner of numerous trademarks, both registered and
          unregistered, including, without limitation, the Land Rover® name,
          the Defender® name, and the distinctive shapes of Land Rover vehicles.
          SV Designs, Inc. restores and modifies existing Land Rover Defender 25
          year old vehicles; SV Designs, Inc. does not manufacture vehicles. Any
          mention of Jaguar Land Rover Limited&apos;s trademarked names or other
          marks and devices is for the purpose of reference only.
        </p>
      </div>
    </footer>
  );
}

export default function SiteFrame({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((v) => !v), []);

  return (
    <div className="bg-paper overflow-x-clip font-sans text-ink">
      <Header open={open} onToggle={toggleMenu} />
      <Menu open={open} onClose={closeMenu} />
      {children}
      <Footer />
    </div>
  );
}
