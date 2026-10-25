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
      className="relative z-30 w-full bg-[#FFFFFF] text-[#0A0A0A] border-t border-black/10 overflow-hidden select-none"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        #shutterscape-universal-footer {
          padding-top: 56px !important;
          padding-bottom: 32px !important;
          padding-left: clamp(20px, 5vw, 64px) !important;
          padding-right: clamp(20px, 5vw, 64px) !important;
          background-color: #FFFFFF !important;
          color: #0A0A0A !important;
        }
      `,
        }}
      />

      {/* ============================================================
          ATMOSPHERIC MOUNTAIN LANDSCAPE BACKGROUND
          Subtle ethereal mountain ridges blending into the white canvas
          ============================================================ */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none opacity-[0.065] mix-blend-multiply"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center 65%",
        }}
      />

      {/* ============================================================
          OVERLAPPING CREATIVE TRANSPARENT WATERMARK: "SHUTTERSCAPE"
          Enlarged, bold, capital letters spanning across the background
          ============================================================ */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0 select-none px-2"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 210"
          className="w-full max-w-[1500px] h-auto text-black/[0.045] overflow-visible"
          fill="currentColor"
        >
          <text
            x="50%"
            y="56%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="var(--font-sora), sans-serif"
            fontWeight="900"
            letterSpacing="0.04em"
            fontSize="172"
          >
            SHUTTERSCAPE
          </text>
        </svg>
      </div>

      {/* Ambient Subtle Warm Gold Gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212, 168, 67, 0.05) 0%, transparent 70%)",
        }}
      />

      {/* ============================================================
          FRAMELESS, BORDERLESS EDITORIAL CONTENT
          ============================================================ */}
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* COLUMN 1: DUAL LOGOS (SHUTTERSCAPE + GCU CLOSE TOGETHER) & EMAIL (4 Cols) */}
          <div className="md:col-span-4 flex flex-col justify-between gap-4">
            <div className="flex items-center gap-2.5">
              {/* ShutterScape Official Logo */}
              <Link className="flex items-center group shrink-0" href="/">
                <div className="relative h-7 w-[64px] sm:w-[72px]">
                  <Image
                    alt="ShutterScape Logo"
                    className="object-contain object-left"
                    fill
                    src="/images/shutterscape-logo.png"
                    unoptimized
                  />
                </div>
              </Link>

              <span className="h-5 w-[1px] bg-black/20 shrink-0" />

              {/* GCU Official University Logo */}
              <a
                href="https://gcuniversity.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group shrink-0"
                title="Girijananda Chowdhury University"
              >
                <div className="relative h-7 w-[96px] sm:w-[105px]">
                  <Image
                    alt="Girijananda Chowdhury University Logo"
                    className="object-contain object-left"
                    fill
                    src="/images/gcu-logo-black-text.png"
                    unoptimized
                  />
                </div>
              </a>
            </div>

            <p className="font-body text-xs text-black/65 leading-relaxed max-w-sm">
              The official visual archive and analog-inspired photography society of Girijananda Chowdhury University.
            </p>

            {/* Official Club Email */}
            <div style={{ marginTop: "2px" }}>
              <span className="block font-mono text-[9px] tracking-[0.22em] uppercase text-black/40 mb-1 font-semibold">
                OFFICIAL DESK & INQUIRIES
              </span>
              <a
                href="mailto:shutterscape@gcuniversity.ac.in"
                className="inline-flex items-center gap-2 font-mono text-xs text-[#B8860B] hover:text-black transition-colors font-medium"
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

          {/* COLUMN 2: NAVIGATION & PREMIUM SOCIAL COMMUNITY BUTTONS (4 Cols) */}
          <div className="md:col-span-4 flex flex-col justify-between gap-5">
            {/* Quick Navigation Links */}
            <div>
              <span className="block font-mono text-[9px] tracking-[0.24em] uppercase text-black/40 mb-2 font-semibold">
                ARCHIVE DIRECTORY
              </span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.18em] uppercase font-bold">
                <Link className="text-black/70 hover:text-[#B8860B] transition-colors" href="/">
                  Home
                </Link>
                <Link className="text-black/70 hover:text-[#B8860B] transition-colors" href="/gallery">
                  Gallery
                </Link>
                <Link className="text-black/70 hover:text-[#B8860B] transition-colors" href="/activities">
                  Activity
                </Link>
                <Link className="text-black/70 hover:text-[#B8860B] transition-colors" href="/about">
                  About
                </Link>
              </div>
            </div>

            {/* JOIN US — Social Media Community CTA */}
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.26em] uppercase text-[#B8860B] font-bold mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] animate-pulse" />
                JOIN US // COMMUNITY
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {/* Instagram Button */}
                <a
                  href="https://www.instagram.com/shutterscape_gcu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#0A0A0A] hover:bg-[#222222] text-white font-mono text-[10.5px] sm:text-[11px] font-bold tracking-[0.16em] uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>Instagram</span>
                  <span className="text-white/40 group-hover:text-white transition-colors text-xs">↗</span>
                </a>

                {/* WhatsApp Button */}
                <a
                  href="https://chat.whatsapp.com/Hs71BicR1Xj3PmOyPJ5wdc?s=sw&p=a&mlu=4&ilr=4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#E5B745] hover:bg-[#D4A843] text-[#0A0A0A] font-mono text-[10.5px] sm:text-[11px] font-extrabold tracking-[0.16em] uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-[#D4A843]/60"
                >
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                  <span>Join WhatsApp</span>
                  <span className="opacity-50 group-hover:opacity-100 transition-opacity text-xs">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 3: GCU CAMPUS ADDRESS & CLEAN BORDERLESS MAP VIEW (4 Cols) */}
          <div className="md:col-span-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <span className="font-mono text-[9px] tracking-[0.24em] uppercase text-[#B8860B] font-bold">
                CAMPUS LOCATION
              </span>
              <p className="font-body text-xs text-black/90 font-semibold leading-snug">
                Girijananda Chowdhury University
              </p>
              <p className="font-body text-[11px] text-black/60 leading-relaxed">
                Hathkhowapara, Azara, Guwahati, Assam 781017
              </p>
              <div style={{ marginTop: "6px" }}>
                <a
                  href="https://maps.app.goo.gl/NhdHs1u76Bjxo2J87"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] uppercase text-black/70 hover:text-[#B8860B] font-bold transition-colors"
                >
                  <span>Open Map View</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Clean Borderless Map Thumbnail */}
            <a
              href="https://maps.app.goo.gl/NhdHs1u76Bjxo2J87"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Girijananda Chowdhury University in Google Maps"
              className="relative w-full sm:w-28 h-20 rounded-xl overflow-hidden shrink-0 group shadow-xs hover:shadow-md transition-shadow"
            >
              <iframe
                title="GCU Campus Map"
                src="https://www.google.com/maps?q=Girijananda+Chowdhury+University+Azara+Guwahati&output=embed"
                className="w-full h-full border-0 pointer-events-none grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
                <span className="w-5 h-5 rounded-full bg-[#D4A843] text-black flex items-center justify-center shadow-sm">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Legal & Credit Strip */}
        <div
          style={{ marginTop: "28px", paddingTop: "20px" }}
          className="border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] tracking-[0.2em] text-black/50 uppercase"
        >
          <span>© 2026 SHUTTERSCAPE · GIRIJANANDA CHOWDHURY UNIVERSITY</span>
          <a
            href="https://codingclub.gcuniversity.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/70 hover:text-[#B8860B] transition-colors inline-flex items-center gap-2 font-semibold"
          >
            <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 bg-black/5 border border-black/15">
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
    </footer>
  );
}
