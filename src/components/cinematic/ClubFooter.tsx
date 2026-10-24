// src/components/cinematic/ClubFooter.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ClubFooterProps {
  variant?: "dark" | "light";
}

export default function ClubFooter({ variant = "dark" }: ClubFooterProps) {
  const isDark = variant === "dark";

  return (
    <footer
      className={`relative z-10 pt-16 pb-12 border-t ${
        isDark
          ? "bg-[#060709] border-white/10 text-white"
          : "bg-[#FAFAFA] border-black/10 text-[#050505]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Section: Community Callout */}
        <div className="text-center pb-12 border-b border-white/10 mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#D4A843] uppercase block mb-3 font-semibold">
            Join the Guild
          </span>
          <h3
            className={`font-serif text-2xl md:text-4xl font-light tracking-wide mb-6 ${
              isDark ? "text-white" : "text-[#050505]"
            }`}
          >
            Connect with <span className="italic text-[#D4A843]">ShutterScape</span>
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* WhatsApp CTA */}
            <a
              href="https://chat.whatsapp.com/Hs71BicR1Xj3PmOyPJ5wdc?s=sw&p=a&mlu=4&ilr=4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-mono text-[11px] tracking-[0.2em] uppercase font-bold bg-[#25D366] text-black hover:bg-[#20ba59] transition-all duration-300 shadow-md hover:scale-105"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.199 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Join Official WhatsApp</span>
            </a>

            {/* Instagram CTA */}
            <a
              href="https://www.instagram.com/shutterscape_gcu"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-mono text-[11px] tracking-[0.2em] uppercase font-bold border transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "border-white/25 text-white hover:border-[#D4A843] hover:text-[#D4A843]"
                  : "border-black/20 text-black hover:border-[#D4A843] hover:text-[#D4A843]"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span>Follow on Instagram</span>
            </a>
          </div>
        </div>

        {/* Middle Section: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column: Logos & University Identity */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src="/images/gcu-logo.png"
                    alt="Girijananda Chowdhury University Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative w-28 h-12">
                  <Image
                    src="/images/shutterscape-brand-white.png"
                    alt="ShutterScape Logo"
                    fill
                    className={`object-contain ${
                      !isDark ? "brightness-0" : ""
                    }`}
                  />
                </div>
              </div>

              <h4 className="font-serif text-xl md:text-2xl font-normal mb-2">
                Girijananda Chowdhury University
              </h4>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#D4A843] mb-4">
                Official Photography &amp; Visual Storytelling Club
              </p>
              <p
                className={`font-body text-xs md:text-sm leading-relaxed max-w-md ${
                  isDark ? "text-white/60" : "text-black/60"
                }`}
              >
                Capturing campus narratives, preserving regional heritage, and
                mentoring student optical artists through workshops, expeditions,
                and analog darkroom explorations.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#D4A843] uppercase block mb-1">
                Direct Contact
              </span>
              <a
                href="mailto:shutterscape@gcuniversity.ac.in"
                className="font-mono text-xs md:text-sm tracking-wider text-white hover:text-[#D4A843] transition-colors"
              >
                shutterscape@gcuniversity.ac.in
              </a>
            </div>
          </div>

          {/* Right Column: Physical Address & Mapview */}
          <div className="flex flex-col lg:items-end lg:text-right">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#D4A843] uppercase block mb-2">
              University Campus
            </span>
            <p
              className={`font-body text-xs md:text-sm leading-relaxed mb-4 ${
                isDark ? "text-white/80" : "text-black/80"
              }`}
            >
              Girijananda Chowdhury University<br />
              Hathkhowapara, Azara, Guwahati<br />
              Assam 781017, India
            </p>

            <a
              href="https://maps.app.goo.gl/NhdHs1u76Bjxo2J87"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-wider text-[#D4A843] hover:underline mb-4 font-semibold"
            >
              <span>View Location on Google Maps</span>
              <span>↗</span>
            </a>

            {/* Embedded Interactive Map */}
            <div className="w-full max-w-[420px] h-[160px] rounded-xl overflow-hidden border border-white/15 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.493527263544!2d91.60334817610196!3d26.11520639391097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a4ffab238a8e1%3A0xda591cc5a3592bc1!2sGirijananda%20Chowdhury%20University%2C%20Assam!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Bottom Strip: Codénix Credit & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">
          <div>
            Website Maintained by{" "}
            <a
              href="https://codingclub.gcuniversity.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4A843] hover:underline font-bold"
            >
              Codénix (GCU Coding Club)
            </a>
          </div>

          <div>
            © 2026 ShutterScape · All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
