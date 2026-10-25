// src/components/cinematic/UniversalFooter.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UniversalFooter() {
  const pathname = usePathname();

  // Do not render the public universal footer inside the Admin CMS portal
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer
      id="shutterscape-universal-footer"
      className="relative z-30 w-full bg-[#060608] text-[#FAFAFA] border-t border-white/10 overflow-hidden select-none"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        #shutterscape-universal-footer {
          padding-top: 40px !important;
          padding-bottom: 24px !important;
          padding-left: clamp(16px, 4vw, 48px) !important;
          padding-right: clamp(16px, 4vw, 48px) !important;
        }
        #shutterscape-universal-footer .uf-card {
          background: rgba(14, 14, 18, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 28px 32px !important;
          backdrop-filter: blur(16px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.65);
        }
        @media (max-width: 640px) {
          #shutterscape-universal-footer .uf-card {
            padding: 22px 18px !important;
          }
        }
        #shutterscape-universal-footer .uf-social-btn {
          padding: 9px 16px !important;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s ease;
        }
        #shutterscape-universal-footer .uf-map-btn {
          padding: 6px 12px !important;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
      `,
        }}
      />

      {/* Ambient Subtle Gold Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212, 168, 67, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col gap-6">
        {/* ============================================================
            COMPACT FLOATING EDITORIAL FOOTER CARD
            ============================================================ */}
        <div className="uf-card">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
            {/* COLUMN 1: DUAL LOGOS (SHUTTERSCAPE + GCU) & EMAIL (4 Cols) */}
            <div className="md:col-span-4 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                {/* ShutterScape Logo */}
                <Link className="flex items-center gap-2.5 group" href="/">
                  <div className="relative h-7 w-28">
                    <Image
                      alt="ShutterScape Logo"
                      className="object-contain object-left"
                      fill
                      src="/images/shutterscape-brand-white.png"
                      unoptimized
                    />
                  </div>
                </Link>

                <span className="h-5 w-[1px] bg-white/15" />

                {/* GCU University Logo + Name */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-serif font-bold text-[10px] text-[#D4A843] shrink-0">
                    GCU
                  </div>
                  <div className="leading-tight">
                    <span className="block font-mono text-[9.5px] tracking-[0.16em] uppercase text-white font-semibold">
                      Girijananda Chowdhury
                    </span>
                    <span className="block font-mono text-[8.5px] tracking-[0.2em] uppercase text-white/55">
                      University · Assam
                    </span>
                  </div>
                </div>
              </div>

              <p className="font-body text-xs text-white/60 leading-relaxed max-w-xs">
                The official visual archive and analog-inspired photography society of Girijananda Chowdhury University.
              </p>

              {/* Official Club Email */}
              <div style={{ marginTop: "2px" }}>
                <span className="block font-mono text-[9px] tracking-[0.22em] uppercase text-white/40 mb-1">
                  OFFICIAL DESK & INQUIRIES
                </span>
                <a
                  href="mailto:shutterscape@gcuniversity.ac.in"
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#D4A843] hover:text-white transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 7l-10 7L2 7" />
                  </svg>
                  <span>shutterscape@gcuniversity.ac.in</span>
                </a>
              </div>
            </div>

            {/* COLUMN 2: NAVIGATION & SOCIAL MEDIA ("JOIN US") (4 Cols) */}
            <div className="md:col-span-4 flex flex-col justify-between gap-4">
              {/* Quick Navigation Links */}
              <div>
                <span className="block font-mono text-[9.5px] tracking-[0.24em] uppercase text-white/40 mb-2.5">
                  ARCHIVE DIRECTORY
                </span>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.18em] uppercase">
                  <Link className="text-white/75 hover:text-[#D4A843] transition-colors" href="/">
                    Home
                  </Link>
                  <Link className="text-white/75 hover:text-[#D4A843] transition-colors" href="/gallery">
                    Gallery
                  </Link>
                  <Link className="text-white/75 hover:text-[#D4A843] transition-colors" href="/activities">
                    Activity
                  </Link>
                  <Link className="text-white/75 hover:text-[#D4A843] transition-colors" href="/about">
                    About
                  </Link>
                </div>
              </div>

              {/* JOIN US — Social Media Pills */}
              <div style={{ marginTop: "6px" }}>
                <span className="block font-mono text-[9.5px] tracking-[0.24em] uppercase text-[#D4A843] font-bold mb-2.5">
                  JOIN US // COMMUNITY
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/shutterscape_gcu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uf-social-btn bg-white/8 hover:bg-white text-white hover:text-[#050505] border border-white/15"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    <span>Instagram</span>
                  </a>

                  {/* WhatsApp Community */}
                  <a
                    href="https://chat.whatsapp.com/Hs71BicR1Xj3PmOyPJ5wdc?s=sw&p=a&mlu=4&ilr=4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uf-social-btn bg-[#D4A843] hover:bg-[#E5BC58] text-[#050505] border border-[#D4A843]"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                    <span>Join WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* COLUMN 3: GCU CAMPUS ADDRESS & COMPACT MAP VIEW (4 Cols) */}
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.03] border border-white/10 rounded-xl p-3.5">
              <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#D4A843] font-bold">
                  CAMPUS LOCATION
                </span>
                <p className="font-body text-xs text-white/85 font-medium leading-snug">
                  Girijananda Chowdhury University
                </p>
                <p className="font-body text-[11px] text-white/55 leading-relaxed">
                  Hathkhowapara, Azara, Guwahati, Assam 781017
                </p>
                <div style={{ marginTop: "4px" }}>
                  <a
                    href="https://maps.app.goo.gl/NhdHs1u76Bjxo2J87"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uf-map-btn bg-white/10 hover:bg-[#D4A843] text-white hover:text-[#050505] transition-colors"
                  >
                    <span>Open Map View</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              {/* Compact Interactive Map Thumbnail */}
              <a
                href="https://maps.app.goo.gl/NhdHs1u76Bjxo2J87"
                target="_blank"
                rel="noopener noreferrer"
                title="Open Girijananda Chowdhury University in Google Maps"
                className="relative w-full sm:w-28 h-24 rounded-lg overflow-hidden border border-white/15 shrink-0 group"
              >
                <iframe
                  title="GCU Campus Map"
                  src="https://www.google.com/maps?q=Girijananda+Chowdhury+University+Azara+Guwahati&output=embed"
                  className="w-full h-full border-0 pointer-events-none grayscale contrast-125 opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                  <span className="w-6 h-6 rounded-full bg-[#D4A843] text-black flex items-center justify-center text-xs font-bold shadow-md">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Bottom Legal & Credit Strip inside Card */}
          <div
            style={{ marginTop: "22px", paddingTop: "16px" }}
            className="border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] tracking-[0.2em] text-white/45 uppercase"
          >
            <span>© 2026 SHUTTERSCAPE · GIRIJANANDA CHOWDHURY UNIVERSITY</span>
            <a
              href="https://codingclub.gcuniversity.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#D4A843] transition-colors inline-flex items-center gap-2"
            >
              <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 bg-white/10 border border-white/20">
                <Image
                  src="/images/codenix-logo.png"
                  alt="Codénix Logo"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span>Website Maintained by Codénix (GCU Coding Club) ↗</span>
            </a>
          </div>
        </div>

        {/* ============================================================
            SUBTLE EDITORIAL WATERMARK TYPOGRAPHY ALONG THE BOTTOM
            ============================================================ */}
        <div className="pointer-events-none w-full overflow-hidden flex justify-center items-end leading-none select-none pt-1">
          <span className="font-heading font-black uppercase tracking-[-0.04em] text-[13vw] leading-[0.74] text-white/[0.04] whitespace-nowrap">
            SHUTTERSCAPE
          </span>
        </div>
      </div>
    </footer>
  );
}
