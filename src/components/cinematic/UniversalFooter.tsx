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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start justify-between">
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

          {/* COLUMN 2: NAVIGATION & HIGH-CRAFT SOCIAL COMMUNITY BUTTONS (4 Cols) */}
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
              <span className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.26em] uppercase text-[#B8860B] font-bold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] animate-pulse" />
                JOIN US // COMMUNITY
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {/* Professional Instagram Button */}
                <a
                  href="https://www.instagram.com/shutterscape_gcu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0A0A0A] hover:bg-[#222222] text-white font-sans text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  <span>Instagram</span>
                  <span className="text-white/40 group-hover:text-white transition-colors text-xs">↗</span>
                </a>

                {/* Professional WhatsApp Button */}
                <a
                  href="https://chat.whatsapp.com/Hs71BicR1Xj3PmOyPJ5wdc?s=sw&p=a&mlu=4&ilr=4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-sans text-xs font-semibold tracking-wide transition-all duration-300 shadow-[0_2px_12px_rgba(37,211,102,0.25)] hover:shadow-[0_4px_20px_rgba(37,211,102,0.38)] hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.199 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Join WhatsApp</span>
                  <span className="opacity-60 group-hover:opacity-100 transition-opacity text-xs">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 3: GCU CAMPUS ADDRESS & PROMINENT INTERACTIVE MAP (4 Cols) */}
          <div className="md:col-span-4 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[9px] tracking-[0.24em] uppercase text-[#B8860B] font-bold">
                  CAMPUS LOCATION
                </span>
                <a
                  href="https://maps.app.goo.gl/NhdHs1u76Bjxo2J87"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-[0.14em] uppercase text-black/60 hover:text-[#B8860B] font-bold transition-colors inline-flex items-center gap-1"
                >
                  <span>Open Maps</span>
                  <span>↗</span>
                </a>
              </div>
              <p className="font-body text-xs text-black/90 font-semibold leading-snug">
                Girijananda Chowdhury University
              </p>
              <p className="font-body text-[11px] text-black/60 leading-relaxed">
                Hathkhowapara, Azara, Guwahati, Assam 781017
              </p>
            </div>

            {/* Prominent, Generous Interactive Google Map */}
            <a
              href="https://maps.app.goo.gl/NhdHs1u76Bjxo2J87"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Girijananda Chowdhury University in Google Maps"
              className="relative w-full h-[150px] sm:h-[160px] rounded-xl overflow-hidden border border-black/10 group shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(212,168,67,0.18)] transition-all duration-300 block"
            >
              <iframe
                title="GCU Campus Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.493527263544!2d91.60334817610196!3d26.11520639391097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a4ffab238a8e1%3A0xda591cc5a3592bc1!2sGirijananda%20Chowdhury%20University%2C%20Assam!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 pointer-events-none grayscale-[50%] group-hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors flex items-center justify-center">
                <span className="w-8 h-8 rounded-full bg-[#D4A843] text-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
