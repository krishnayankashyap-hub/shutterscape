// src/components/mobile/MobileOilstainExperience.tsx
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ==========================================
// FALLBACK DATASETS (Synced with Live APIs)
// ==========================================
const FALLBACK_GALLERY = [
  {
    id: "g-01",
    title: "Monsoon Over Brahmaputra",
    category: "DOCUMENTARY",
    photographer: "Riky",
    location: "Brahmaputra Riverfront",
    filmStock: "KODAK TRI-X 400",
    exif: "35MM · F/2.0",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
    description: "Golden-hour riverfront documentation capturing ferry silhouettes.",
  },
  {
    id: "g-02",
    title: "Chiaroscuro Gaze",
    category: "PORTRAITURE",
    photographer: "Pratyashi P. Das",
    location: "GCU Studio Lab",
    filmStock: "KODAK PORTRA 800",
    exif: "85MM · F/1.4",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=80",
    description: "High-contrast Xenon strobe portrait exploring deep tonal gradients.",
  },
  {
    id: "g-03",
    title: "Himalayan Alpenglow",
    category: "LANDSCAPE",
    photographer: "Akash Boro",
    location: "Eastern Himalayan Ridge",
    filmStock: "FUJIFILM VELVIA 50",
    exif: "70MM · F/4.0",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    description: "Dawn mountain exposure capturing atmospheric cloud compression.",
  },
  {
    id: "g-04",
    title: "Brutalist Geometry",
    category: "ARCHITECTURE",
    photographer: "Aparna Mishra",
    location: "GCU Campus Complex",
    filmStock: "ILFORD HP5 PLUS",
    exif: "24MM · F/8.0",
    src: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=80",
    description: "Monochrome architectural study dissecting concrete planes.",
  },
  {
    id: "g-05",
    title: "Midnight Neon Drift",
    category: "STREET",
    photographer: "Tiku Sarkar",
    location: "Paltan Bazaar By-lanes",
    filmStock: "CINESTILL 800T",
    exif: "50MM · F/1.4",
    src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&q=80",
    description: "Ambient night capture harnessing the red halation of Cinestill.",
  },
  {
    id: "g-06",
    title: "Optics & Refraction",
    category: "EXPERIMENTAL",
    photographer: "Bituparna",
    location: "GCU Optics Clinic",
    filmStock: "KODAK EKTAR 100",
    exif: "105MM · F/2.8",
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80",
    description: "Extreme close-up examining manual lens aperture blades.",
  },
];

const FALLBACK_ACTIVITIES = [
  {
    id: "ACT-26-01",
    year: "2026",
    shortTitle: "BRAHMAPUTRA 4.0",
    title: "Brahmaputra Heritage Photowalk 4.0",
    category: "PHOTOWALK",
    date: "NOV 14, 2026",
    location: "Riverfront, Guwahati",
    exif: "35MM · F/2.0 · 1/1000S",
    filmStock: "KODAK PORTRA 400",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80",
    description: "Golden-hour riverfront documentation exploring ferry silhouettes and twilight reflections.",
    isUpcoming: true,
  },
  {
    id: "ACT-26-02",
    year: "2026",
    shortTitle: "XENON STROBE LAB",
    title: "Mastering Manual Optics & Xenon Strobe",
    category: "WORKSHOP",
    date: "OCT 04, 2026",
    location: "GCU Media Lab",
    exif: "85MM · F/1.4 · 1/250S",
    filmStock: "ILFORD HP5 PLUS",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&q=80",
    description: "Hands-on technical clinic covering aperture control and Chiaroscuro portrait lighting.",
    isUpcoming: false,
  },
  {
    id: "ACT-26-03",
    year: "2026",
    shortTitle: "FRAMES BEYOND TIME",
    title: "Frames Beyond Time — Annual Exhibition",
    category: "EXHIBITION",
    date: "AUG 22, 2026",
    location: "GCU Central Atrium",
    exif: "50MM · F/2.8 · 1/500S",
    filmStock: "KODAK VISION3 500T",
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1000&q=80",
    description: "Curated physical print showcase featuring 60+ archival photographs by GCU students.",
    isUpcoming: false,
  },
  {
    id: "ACT-25-01",
    year: "2025",
    shortTitle: "CAMPUS NOCTURNES",
    title: "Campus Nocturnes — Night Photography",
    category: "WORKSHOP",
    date: "DEC 12, 2025",
    location: "GCU Main Campus",
    exif: "14MM · F/2.8 · 15S",
    filmStock: "KODAK EKTAR 100",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1000&q=80",
    description: "Late-night practical session exploring long-exposure light trails and tripod stability.",
    isUpcoming: false,
  },
];

const FALLBACK_COMMITTEE = [
  {
    name: "Dr. Sangeeta Das",
    role: "Coordinator",
    tier: "MENTOR",
    dept: "Dept. of Mechanical Engineering",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Dr. Barsha Chhetri",
    role: "Co-Coordinator",
    tier: "MENTOR",
    dept: "Assistant Professor & Head (i/c) Dept. of Education",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Uttama Purkayastha",
    role: "PRESIDENT",
    tier: "LEAD",
    dept: "Executive Leadership",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Ikhyt De Neog",
    role: "VICE-PRESIDENT",
    tier: "LEAD",
    dept: "Operations & Field Expeditions",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Richita Sarma",
    role: "SECRETARY",
    tier: "LEAD",
    dept: "Editorial & Archive Administration",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Dheemaan Deka",
    role: "2023 // Co-Founder",
    tier: "FOUNDER",
    dept: "Founding Visionary",
    img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Subhrajyoti Goswami",
    role: "2023 // Co-Founder",
    tier: "FOUNDER",
    dept: "Founding Architect",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
  },
];

const FALLBACK_REELS = [
  {
    id: "01",
    photographer: "Aman Baha",
    videoSrc: "https://videos.pexels.com/video-files/853889/853889-hd_1080_1920_25fps.mp4",
    posterSrc: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
  },
  {
    id: "02",
    photographer: "Sampad Dutta",
    videoSrc: "https://videos.pexels.com/video-files/2871932/2871932-uhd_2160_3840_25fps.mp4",
    posterSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: "03",
    photographer: "Sohan Chandra",
    videoSrc: "https://videos.pexels.com/video-files/5377684/5377684-hd_1080_1920_25fps.mp4",
    posterSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
  },
];

type AboutTabKey = "ORIGINS" | "LEADERSHIP" | "LEGACY";
type PillarKey = "OPTICS" | "CHRONOLOGY" | "DARKROOM" | null;

export default function MobileOilstainExperience() {
  const [gallery, setGallery] = useState<any[]>(FALLBACK_GALLERY);
  const [activities, setActivities] = useState<any[]>(FALLBACK_ACTIVITIES);
  const [committee, setCommittee] = useState<any[]>(FALLBACK_COMMITTEE);
  const [reels, setReels] = useState<any[]>(FALLBACK_REELS);

  // Interactive UI States (Matching Oilstainlab Mobile Recording)
  const [isGalleryDrawerOpen, setIsGalleryDrawerOpen] = useState(false);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [activePillarSheet, setActivePillarSheet] = useState<PillarKey>(null);
  const [activeAboutTab, setActiveAboutTab] = useState<AboutTabKey>("ORIGINS");
  const [isEngineeringDataOpen, setIsEngineeringDataOpen] = useState(false);
  const [activeAudioReelIdx, setActiveAudioReelIdx] = useState<number | null>(null);

  const archiveStartRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Fetch Live Club Data from ShutterScape APIs
  useEffect(() => {
    Promise.allSettled([
      fetch("/api/gallery").then((r) => r.json()),
      fetch("/api/activities").then((r) => r.json()),
      fetch("/api/committee").then((r) => r.json()),
      fetch("/api/moments-reels").then((r) => r.json()),
    ]).then(([galRes, actRes, comRes, reelRes]) => {
      if (galRes.status === "fulfilled" && galRes.value?.data?.length > 0) {
        setGallery(galRes.value.data);
      }
      if (actRes.status === "fulfilled" && actRes.value?.data?.length > 0) {
        setActivities(actRes.value.data);
      }
      if (comRes.status === "fulfilled" && comRes.value?.data?.length > 0) {
        setCommittee(comRes.value.data);
      }
      if (reelRes.status === "fulfilled" && reelRes.value?.data?.length > 0) {
        setReels(reelRes.value.data);
      }
    });
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const toggleReelAudio = (idx: number) => {
    if (activeAudioReelIdx === idx) {
      setActiveAudioReelIdx(null);
      if (videoRefs.current[idx]) videoRefs.current[idx]!.muted = true;
    } else {
      setActiveAudioReelIdx(idx);
      videoRefs.current.forEach((v, i) => {
        if (v) v.muted = i !== idx;
      });
    }
  };

  const mentorsAndLeads = committee.filter(
    (m) => m.tier === "MENTOR" || m.tier === "LEAD"
  );
  const foundersAndLegacy = committee.filter(
    (m) => m.tier === "FOUNDER" || m.tier === "CORE" || m.tier === "LEGACY"
  );

  return (
    <div
      id="shutterscape-mobile-oilstain"
      className="w-full min-h-screen bg-[#ECEBE6] text-[#111111] font-sans select-none overflow-x-hidden"
    >
      {/* Scoped Swiss-Brutalist Stylesheet — Immune to globals.css * { margin: 0; padding: 0 } */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        #shutterscape-mobile-oilstain {
          background-color: #ECEBE6;
          color: #111111;
        }
        #shutterscape-mobile-oilstain .osl-pad-sm { padding: 12px 16px !important; }
        #shutterscape-mobile-oilstain .osl-pad-md { padding: 20px 18px !important; }
        #shutterscape-mobile-oilstain .osl-pad-lg { padding: 32px 20px !important; }
        #shutterscape-mobile-oilstain .osl-btn-pill { padding: 7px 13px !important; }
        #shutterscape-mobile-oilstain .osl-spec-row {
          padding: 13px 18px !important;
          border-top: 1px solid rgba(17, 17, 17, 0.14);
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }
        #shutterscape-mobile-oilstain .osl-bar-btn {
          padding: 16px 20px !important;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          font-family: var(--font-space-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        #shutterscape-mobile-oilstain .osl-bento-cell {
          padding: 26px 12px !important;
          border-top: 1px solid rgba(17, 17, 17, 0.15);
          border-bottom: 1px solid rgba(17, 17, 17, 0.15);
          border-right: 1px solid rgba(17, 17, 17, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #ECEBE6;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        #shutterscape-mobile-oilstain .osl-bento-cell:active,
        #shutterscape-mobile-oilstain .osl-bento-cell:hover {
          background: #111111;
          color: #ECEBE6;
        }
        #shutterscape-mobile-oilstain .osl-tab-btn {
          padding: 18px 8px !important;
          font-family: var(--font-space-mono), monospace;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-align: center;
          border-right: 1px solid rgba(17, 17, 17, 0.15);
          border-bottom: 1px solid rgba(17, 17, 17, 0.15);
          cursor: pointer;
          transition: all 0.2s ease;
        }
      `,
        }}
      />

      {/* ============================================================
          0. STICKY BRUTALIST TOP NAVBAR (Matches "OILSTAINLAB | [OWNERSHIP 11]")
          ============================================================ */}
      <header className="sticky top-0 z-50 w-full bg-[#ECEBE6]/95 backdrop-blur-md border-b border-black/15 osl-pad-sm flex items-center justify-between">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-heading font-black text-base tracking-[-0.03em] uppercase text-[#111111] cursor-pointer"
        >
          SHUTTERSCAPE
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsGalleryDrawerOpen(true)}
            className="osl-btn-pill bg-transparent border border-black/25 text-[#111111] font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] cursor-pointer"
          >
            ARCHIVE
          </button>
          <button
            type="button"
            onClick={() => {
              setIsEngineeringDataOpen(true);
              scrollToSection("mobile-chronology-matrix");
            }}
            className="osl-btn-pill bg-[#111111] text-[#FAFAFA] font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] cursor-pointer"
          >
            CHRONOLOGY 26
          </button>
        </div>
      </header>

      {/* ============================================================
          1. OPENING SPLASH HERO (Uses Screenshot 5 Campus Hero — Skips Screenshot 6 Camera Rig!)
          Matches 00:00 - 00:01 of Video 1 with full-width bottom ENTER bar
          ============================================================ */}
      <section className="relative w-full h-[calc(100svh-53px)] min-h-[540px] bg-[#070709] text-white flex flex-col justify-between overflow-hidden">
        {/* GCU Campus Background from Screenshot 5 */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/gcu-campus-anime.jpg"
            alt="Girijananda Chowdhury University Campus"
            className="w-full h-full object-cover object-center brightness-[0.58] contrast-[1.08]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,5,7,0.75) 0%, rgba(5,5,7,0.35) 45%, rgba(5,5,7,0.92) 100%)",
            }}
          />
        </div>

        {/* Top Viewfinder Micro-HUD from Screenshot 5 */}
        <div className="relative z-10 osl-pad-md flex items-center justify-between font-mono text-[9.5px] tracking-[0.22em] text-white/75 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
            <span>XENOREC · RAW 14-BIT</span>
          </div>
          <span>@SHUTTERSCAPE_GCU</span>
        </div>

        {/* Center Editorial Title from Screenshot 5 + Oilstainlab Bold Framing */}
        <div className="relative z-10 osl-pad-lg flex flex-col items-center text-center my-auto">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-[1px] bg-[#D4A843]" />
            <span className="font-mono text-[9.5px] tracking-[0.28em] uppercase text-[#D4A843] font-bold">
              EST. 2023 · MORE THAN JUST A CAMERA CLUB
            </span>
            <span className="w-6 h-[1px] bg-[#D4A843]" />
          </div>

          <h1 className="font-serif text-[13vw] leading-[0.88] tracking-[0.06em] uppercase text-white font-normal drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
            SHUTTERSCAPE
          </h1>

          <p
            style={{ marginTop: "12px" }}
            className="font-mono text-[11px] tracking-[0.34em] uppercase text-white/90 font-semibold"
          >
            GCU PHOTOGRAPHY CLUB
          </p>

          <p
            style={{ marginTop: "10px" }}
            className="font-serif italic text-base text-white/75 max-w-xs"
          >
            &ldquo;Observe, capture, and tell stories through light.&rdquo;
          </p>
        </div>

        {/* Bottom Coordinates + Full-Width Action Bar (Matches Oilstainlab "ENTER ->" Bar) */}
        <div className="relative z-10 w-full flex flex-col">
          <div className="osl-pad-sm flex items-center justify-between font-mono text-[9px] tracking-[0.22em] text-white/55 uppercase border-t border-white/10 bg-black/45 backdrop-blur-xs">
            <span>f/1.4 · 1/1000s · ISO 400</span>
            <span>GCU · ASSAM</span>
          </div>

          <button
            type="button"
            onClick={() =>
              archiveStartRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="osl-bar-btn bg-[#D4A843] text-[#050505]"
          >
            <span>ENTER THE DARKROOM ARCHIVE</span>
            <span className="text-base leading-none">↓</span>
          </button>
        </div>
      </section>

      {/* ============================================================
          2. SPLIT "SS — 26" POSTER & 4-ROW SPEC TABLE (Matches "HF 11" in Video 1 00:02-00:05)
          ============================================================ */}
      <section
        ref={archiveStartRef}
        className="relative w-full bg-[#ECEBE6] text-[#111111] border-b border-black/15"
      >
        {/* Giant Split Typography: SS (Left) | 26 (Right) */}
        <div className="osl-pad-md flex items-start justify-between leading-none">
          <span className="font-heading font-black text-[22vw] tracking-[-0.06em] leading-[0.82] text-[#111111]">
            SS
          </span>
          <span className="font-heading font-light text-[22vw] tracking-[-0.06em] leading-[0.82] text-[#111111]">
            26
          </span>
        </div>

        {/* Centerpiece Cutout Visual */}
        <div className="osl-pad-md flex flex-col items-center">
          <div className="relative w-full aspect-[16/10] rounded-xs overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-black/15 bg-[#111111]">
            <img
              src={gallery[0]?.src || FALLBACK_GALLERY[0].src}
              alt={gallery[0]?.title || "ShutterScape Featured Plate"}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 text-[#D4A843] font-mono text-[8.5px] tracking-[0.22em] uppercase">
              PLATE // 01A · {gallery[0]?.filmStock || "KODAK TRI-X 400"}
            </div>
          </div>

          {/* Center Bold Statement (Matches "LESS IS MORE. MORE IS LESS.") */}
          <div
            style={{ marginTop: "36px", marginBottom: "28px" }}
            className="text-center"
          >
            <h2 className="font-heading font-black text-2xl tracking-[-0.03em] uppercase leading-[0.95] text-[#111111]">
              LIGHT IS MEMORY.
              <br />
              MEMORY IS LIGHT.
            </h2>
            <p
              style={{ marginTop: "6px" }}
              className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-black/45"
            >
              [ GIRIJANANDA CHOWDHURY UNIVERSITY ]
            </p>
          </div>
        </div>

        {/* 4-Row Hairline Spec Sheet (Matches 1,950 / 32 / 12,000 / 650 Table) */}
        <div className="w-full border-b border-black/15">
          <div className="osl-spec-row">
            <span className="font-serif italic text-3xl text-black/80 leading-none">
              2,023
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-black/50">
              ESTABLISHED // GCU ASSAM
            </span>
          </div>
          <div className="osl-spec-row">
            <span className="font-serif italic text-3xl text-black/80 leading-none">
              35mm
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-black/50">
              OPTICAL FORMAT // RAW 14-BIT
            </span>
          </div>
          <div className="osl-spec-row">
            <span className="font-serif italic text-3xl text-black/80 leading-none">
              {gallery.length}
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-black/50">
              CURATED EXHIBITION PLATES
            </span>
          </div>
          <div className="osl-spec-row">
            <span className="font-serif italic text-3xl text-black/80 leading-none">
              {activities.length}
            </span>
            <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-black/50">
              CHRONOLOGY ARCHIVE EVENTS
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. DARK EDITORIAL SHOWCASE + "GALLERY +" DRAWER TRIGGER
          Matches Video 1 (00:06) & Video 2 (00:00 - 00:08)
          ============================================================ */}
      <section className="w-full bg-[#141416] text-white">
        <div className="osl-pad-lg">
          <h2 className="font-heading font-black text-xl tracking-[-0.02em] uppercase leading-none text-white">
            SHUTTERSCAPE
          </h2>
          <p
            style={{ marginTop: "6px" }}
            className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-white/60 leading-snug"
          >
            WHERE ANALOG CRAFT
            <br />
            OVERTAKES THE FRAME.
          </p>

          <div
            style={{ marginTop: "24px" }}
            onClick={() => {
              setActiveGalleryIdx(1);
              setIsGalleryDrawerOpen(true);
            }}
            className="relative w-full aspect-[4/3] rounded-xs overflow-hidden border border-white/15 cursor-pointer"
          >
            <img
              src={gallery[1]?.src || FALLBACK_GALLERY[1].src}
              alt={gallery[1]?.title || "Visual Archive"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <span className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-[#D4A843] block">
                  {gallery[1]?.category || "PORTRAITURE"}
                </span>
                <span className="font-serif text-lg text-white">
                  {gallery[1]?.title || "Chiaroscuro Gaze"}
                </span>
              </div>
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/70">
                {gallery[1]?.exif || "85MM · F/1.4"}
              </span>
            </div>
          </div>
        </div>

        {/* Full-Width "GALLERY +" Button (Opens the Oilstainlab Scrubber Drawer) */}
        <div className="osl-pad-md pt-0">
          <button
            type="button"
            onClick={() => setIsGalleryDrawerOpen(true)}
            className="osl-bar-btn border border-white/25 bg-white/5 hover:bg-white hover:text-black text-white"
          >
            <span>GALLERY ({gallery.length} PLATES)</span>
            <span className="text-lg leading-none font-light">+</span>
          </button>
        </div>
      </section>

      {/* ============================================================
          4. LIGHT SHOWCASE + 3-COLUMN BENTO GRID (OPTICS | CHRONOLOGY | DARKROOM)
          Matches Video 1 (00:07) & Video 4 (00:00 - 00:10)
          ============================================================ */}
      <section className="w-full bg-[#ECEBE6] text-[#111111]">
        {/* Secondary Cutout Image */}
        <div className="osl-pad-lg flex flex-col items-center">
          <div className="relative w-full aspect-[16/10] rounded-xs overflow-hidden border border-black/15 shadow-md">
            <img
              src={gallery[2]?.src || FALLBACK_GALLERY[2].src}
              alt={gallery[2]?.title || "Landscape Study"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 3-Column Hairline Bento Grid (Tap to open Slide-Over Sheet like Video 4) */}
        <div className="grid grid-cols-3 w-full border-l border-black/15">
          <button
            type="button"
            onClick={() => setActivePillarSheet("OPTICS")}
            className="osl-bento-cell"
          >
            <span className="font-mono text-[9px] text-black/40">01</span>
            <span className="font-mono text-[10.5px] font-bold tracking-[0.16em] uppercase">
              OPTICS
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActivePillarSheet("CHRONOLOGY")}
            className="osl-bento-cell"
          >
            <span className="font-mono text-[9px] text-black/40">02</span>
            <span className="font-mono text-[10.5px] font-bold tracking-[0.16em] uppercase">
              ORIGIN
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActivePillarSheet("DARKROOM")}
            className="osl-bento-cell"
          >
            <span className="font-mono text-[9px] text-black/40">03</span>
            <span className="font-mono text-[10.5px] font-bold tracking-[0.16em] uppercase">
              VISION
            </span>
          </button>
        </div>

        {/* Secondary Action Bar under the 3 Bento Cells ("DOWNLOAD SPECS" equivalent) */}
        <div className="osl-pad-md">
          <div className="grid grid-cols-2 gap-2.5">
            <Link className="osl-bar-btn border border-black/25 bg-transparent text-[#111111]" href="/gallery">
              <span>3D ARCHIVE</span>
              <span>↗</span>
            </Link>
            <Link className="osl-bar-btn border border-black/25 bg-transparent text-[#111111]" href="/activities">
              <span>HEX TIMELINE</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. "ABOUT" BANNER + 3-TAB SWITCHER (ORIGINS | LEADERSHIP | LEGACY)
          Matches Video 1 (00:08 - 00:17) & Video 3 (00:06 - 00:17)
          ============================================================ */}
      <section className="w-full bg-[#FAF9F5] text-[#111111] border-t border-black/15">
        {/* Atmospheric B&W "ABOUT" Banner */}
        <div className="relative w-full aspect-[16/10] bg-[#111111] flex items-center justify-center overflow-hidden">
          <img
            src="/images/gcu-campus-sketch.jpg"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1000&q=80";
            }}
            alt="About ShutterScape"
            className="w-full h-full object-cover grayscale contrast-125 opacity-55"
          />
          <div className="absolute inset-0 bg-black/35" />
          <h2 className="relative z-10 font-heading font-black text-3xl tracking-[0.04em] uppercase text-white">
            ABOUT
          </h2>
        </div>

        {/* 3-Tab Hairline Switcher (ORIGINS | LEADERSHIP | LEGACY) */}
        <div className="grid grid-cols-3 w-full border-l border-black/15 bg-[#ECEBE6]">
          {(["ORIGINS", "LEADERSHIP", "LEGACY"] as AboutTabKey[]).map((tab) => {
            const isActive = activeAboutTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveAboutTab(tab)}
                className={`osl-tab-btn ${
                  isActive
                    ? "bg-[#111111] text-white"
                    : "bg-[#ECEBE6] text-[#111111]/70"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* TAB 1 CONTENT: ORIGINS (With Repeating Typographic Matrix Wallpaper + Center Photo!) */}
        {activeAboutTab === "ORIGINS" && (
          <div className="osl-pad-lg space-y-6">
            <div>
              <h3 className="font-heading font-black text-3xl uppercase tracking-[-0.03em] text-[#111111]">
                STORYTELLERS
              </h3>
              <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-black/45 block mt-1">
                CHAPTER 01 // ORIGINS
              </span>
            </div>

            <p className="font-mono text-xs uppercase tracking-[0.06em] leading-relaxed font-bold text-[#111111]">
              BORN AT GIRIJANANDA CHOWDHURY UNIVERSITY IN ASSAM, SHUTTERSCAPE IS
              OUR UNMEDICATED VISUAL ARCHIVE. A PURE MANIFESTO OF ANALOG OPTICS,
              STREET DOCUMENTARY, AND CREATIVE EXCESS.
            </p>

            {/* Repeating Typographic Matrix with Overlaid B&W Photo (Exact Match to Video 1 00:09-00:10) */}
            <div className="relative w-full py-6 overflow-hidden flex items-center justify-center border-y border-black/15 bg-[#FAF9F5]">
              <div
                aria-hidden="true"
                className="font-heading font-black text-[13vw] leading-[0.86] tracking-[-0.04em] uppercase text-[#111111] text-center select-none break-all"
              >
                SHUTTER*SCAPE*GCU*35MM*RAW*OPTICS*DARKROOM*ASSAM*
              </div>

              {/* Centered B&W Photo Overlay */}
              <div className="absolute w-[62%] aspect-[4/3] bg-[#111111] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-white/20">
                <img
                  src={gallery[3]?.src || FALLBACK_GALLERY[3].src}
                  alt="ShutterScape Origins"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-black/45 block">
                MORE THAN A CAMERA CLUB
              </span>
              <p className="font-body text-xs text-black/75 leading-relaxed">
                ShutterScape was created for students who love to observe,
                capture, and tell stories through photographs. Whether you shoot
                on a mechanical 35mm SLR, a mirrorless rig, or your phone—there
                is a place for you in our darkroom.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2 CONTENT: LEADERSHIP (Mentors & Executive Leads) */}
        {activeAboutTab === "LEADERSHIP" && (
          <div className="osl-pad-lg space-y-6">
            <div>
              <h3 className="font-heading font-black text-3xl uppercase tracking-[-0.03em] text-[#111111]">
                BEHIND THE LENS
              </h3>
              <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-black/45 block mt-1">
                FACULTY MENTORS &amp; EXECUTIVE LEADS
              </span>
            </div>

            <p className="font-mono text-xs uppercase tracking-[0.06em] leading-relaxed font-bold text-[#111111]">
              GUIDED BY FACULTY MENTORS AND STUDENT DIRECTORS WHO CURATE ANNUAL
              EXHIBITIONS, FIELD PHOTOWALKS, AND OPTICAL CLINICS ACROSS ASSAM.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {mentorsAndLeads.map((person, idx) => (
                <div
                  key={idx}
                  className="flex flex-col border border-black/15 bg-white overflow-hidden"
                >
                  <div className="relative w-full aspect-[3/4] bg-[#111111]">
                    <img
                      src={person.img}
                      alt={person.name}
                      className="w-full h-full object-cover grayscale contrast-115"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#111111] text-[#D4A843] font-mono text-[8px] tracking-[0.18em] uppercase font-bold">
                      {person.role}
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-heading font-bold text-xs text-[#111111] uppercase">
                      {person.name}
                    </h4>
                    {person.dept && (
                      <p className="font-mono text-[9px] text-black/55 mt-1 line-clamp-2">
                        {person.dept}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3 CONTENT: LEGACY (Matches "TIME MACHINE" Tab in Video 2 00:10-00:16) */}
        {activeAboutTab === "LEGACY" && (
          <div className="osl-pad-lg space-y-6">
            <div>
              <h3 className="font-heading font-black text-3xl uppercase tracking-[-0.03em] text-[#111111]">
                TIME MACHINE
              </h3>
              <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-black/45 block mt-1">
                FOUNDERS, CORE COMMITTEE &amp; TORCHBEARERS
              </span>
            </div>

            <div className="relative w-full aspect-[16/10] bg-[#111111] overflow-hidden border border-black/15">
              <img
                src={foundersAndLegacy[0]?.img || FALLBACK_COMMITTEE[5].img}
                alt="Founders Archive"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>

            <h4 className="font-heading font-black text-lg uppercase tracking-[-0.02em] leading-snug text-[#111111]">
              WHERE IT ALL STARTED IN 2023 — CARRYING THE TORCH FORWARD.
            </h4>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {foundersAndLegacy.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 border border-black/15 bg-white"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-11 h-11 object-cover grayscale shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="font-heading font-bold text-[11px] text-[#111111] truncate uppercase">
                      {member.name}
                    </h5>
                    <span className="font-mono text-[8.5px] tracking-[0.14em] uppercase text-[#B8860B] font-bold block truncate">
                      {member.role || member.tier}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link className="osl-bar-btn border border-black/25 bg-[#111111] text-white" href="/about">
              <span>OPEN FULL ROSTER &amp; CHAPTERS</span>
              <span>→</span>
            </Link>
          </div>
        )}
      </section>

      {/* ============================================================
          6. "FRAMES OF MOMENTS" VERTICAL VIDEO REELS + EXPANDABLE ARCHIVE DATA MATRIX
          Matches Video 1 (00:11 - 00:14 "DESCEND INTO MADNESS WITH YOUR HF 11" + Spec Matrix)
          ============================================================ */}
      <section
        id="mobile-chronology-matrix"
        className="w-full bg-[#ECEBE6] text-[#111111] border-t border-black/15"
      >
        <div className="osl-pad-lg pb-4">
          <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-black/50 block mb-2">
            MOTION ARCHIVE &amp; CHRONOLOGY
          </span>
          <h2 className="font-heading font-black text-3xl uppercase tracking-[-0.03em] leading-[0.94] text-[#111111]">
            STEP INTO THE DARKROOM WITH{" "}
            <span className="text-[#D92B2B]">SHUTTERSCAPE &apos;26</span>
          </h2>
        </div>

        {/* Horizontal Touch-Scrollable Video Reels Strip (Tap to Unmute) */}
        <div className="osl-pad-md pt-0 overflow-x-auto no-scrollbar flex items-center gap-4">
          {reels.map((reel, idx) => {
            const isUnmuted = activeAudioReelIdx === idx;
            return (
              <div
                key={reel._id || reel.id || idx}
                onClick={() => toggleReelAudio(idx)}
                className="relative shrink-0 w-[68vw] max-w-[260px] aspect-[9/16] bg-[#111111] rounded-xs overflow-hidden border border-black/20 shadow-lg cursor-pointer"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={reel.videoSrc}
                  poster={reel.posterSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 border border-white/20 font-mono text-[8.5px] uppercase tracking-[0.18em] text-white">
                  {isUnmuted ? "● SOUND ON" : "TAP FOR SOUND"}
                </div>
                <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-[#D4A843] block">
                    REEL // 0{idx + 1}
                  </span>
                  <span className="font-sans text-sm font-bold text-white">
                    {reel.photographer}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Red Full-Width Trigger Bar (Matches "COMMISSION YOUR HF-11 +" in Video 1 00:11-00:13) */}
        <div className="w-full mt-2">
          <button
            type="button"
            onClick={() => setIsEngineeringDataOpen((prev) => !prev)}
            className="osl-bar-btn bg-[#D92B2B] text-white"
          >
            <span>
              {isEngineeringDataOpen
                ? "HIDE CHRONOLOGY & ARCHIVE DATA"
                : "VIEW FULL CHRONOLOGY & ARCHIVE DATA"}
            </span>
            <span className="text-lg leading-none">
              {isEngineeringDataOpen ? "−" : "+"}
            </span>
          </button>
        </div>

        {/* Darkroom Engineering / Chronology Data Matrix (Matches Video 1 00:13) */}
        <div className="w-full bg-[#111113] text-white">
          {isEngineeringDataOpen && (
            <div className="osl-pad-lg border-b border-white/10 space-y-6 animate-fade-in">
              <div className="flex items-start justify-between border-b border-white/15 pb-4">
                <div>
                  <h3 className="font-heading font-black text-lg uppercase tracking-[0.02em] text-white">
                    SHUTTERSCAPE GCU:
                    <br />
                    FULL CHRONOLOGY &amp; ARCHIVE DATA
                  </h3>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#D4A843] block mt-1">
                    WORKS &apos;26 &amp; WORKS &apos;25 OFFICIAL LEDGER
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEngineeringDataOpen(false)}
                  className="px-2.5 py-1 bg-white/10 text-white font-mono text-[9px] uppercase tracking-[0.18em]"
                >
                  CLOSE ✕
                </button>
              </div>

              {/* Technical Spec Table Rows for All Club Events */}
              <div className="divide-y divide-white/10">
                {activities.map((ev, idx) => (
                  <div
                    key={ev._id || ev.id || idx}
                    className="py-3.5 grid grid-cols-12 gap-2 items-baseline font-mono text-[10px]"
                  >
                    <div className="col-span-4 text-white/45 uppercase tracking-[0.14em]">
                      {ev.category}
                      <span className="block text-[8.5px] text-[#D4A843]">
                        {ev.date}
                      </span>
                    </div>
                    <div className="col-span-5 text-white font-sans font-semibold text-xs">
                      {ev.title}
                      <span className="block font-mono text-[9px] text-white/50 font-normal mt-0.5">
                        📍 {ev.location}
                      </span>
                    </div>
                    <div className="col-span-3 text-right text-[9px] text-white/65">
                      {ev.isUpcoming ? (
                        <span className="inline-block px-1.5 py-0.5 bg-[#D92B2B] text-white font-bold uppercase">
                          UPCOMING
                        </span>
                      ) : (
                        <span>{ev.filmStock}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Giant Watermark Signature Block (Matches "HF 11" dark bottom in Video 1 00:12-00:14) */}
          <div className="osl-pad-lg flex flex-col items-center text-center">
            <div className="w-full flex items-center justify-between font-heading font-black text-[22vw] leading-[0.8] tracking-[-0.06em] text-white/[0.07] select-none py-4">
              <span>SS</span>
              <span>26</span>
            </div>
            <p className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-white/40 max-w-xs leading-relaxed">
              GIRIJANANDA CHOWDHURY UNIVERSITY · AZARA, GUWAHATI, ASSAM
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          MODAL 1: FULLSCREEN "GALLERY +" SCRUBBER DRAWER (Matches Video 2 00:00-00:06)
          ============================================================ */}
      {isGalleryDrawerOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#ECEBE6] text-[#111111] flex flex-col justify-between overflow-hidden animate-fade-in">
          {/* Top Stage: Selected High-Res Plate */}
          <div className="relative w-full h-[64svh] bg-[#111111] overflow-hidden">
            <img
              src={
                gallery[activeGalleryIdx]?.src || FALLBACK_GALLERY[0].src
              }
              alt={gallery[activeGalleryIdx]?.title || "Archive Frame"}
              className="w-full h-full object-contain bg-[#0A0A0C]"
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/75 border border-white/15 font-mono text-[9.5px] tracking-[0.2em] uppercase text-[#D4A843]">
              {String(activeGalleryIdx + 1).padStart(2, "0")} /{" "}
              {String(gallery.length).padStart(2, "0")} ·{" "}
              {gallery[activeGalleryIdx]?.category}
            </div>
          </div>

          {/* Middle Metadata Caption */}
          <div className="osl-pad-md flex items-center justify-between border-b border-black/15 bg-[#ECEBE6]">
            <div className="min-w-0 pr-3">
              <h3 className="font-heading font-black text-base uppercase text-[#111111] truncate">
                {gallery[activeGalleryIdx]?.title}
              </h3>
              <p className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-black/55 truncate mt-0.5">
                BY {gallery[activeGalleryIdx]?.photographer} ·{" "}
                {gallery[activeGalleryIdx]?.filmStock} ·{" "}
                {gallery[activeGalleryIdx]?.exif}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() =>
                  setActiveGalleryIdx(
                    (prev) => (prev - 1 + gallery.length) % gallery.length
                  )
                }
                className="w-9 h-9 border border-black/25 font-mono text-xs flex items-center justify-center cursor-pointer"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveGalleryIdx((prev) => (prev + 1) % gallery.length)
                }
                className="w-9 h-9 border border-black/25 font-mono text-xs flex items-center justify-center cursor-pointer"
              >
                →
              </button>
            </div>
          </div>

          {/* Bottom Scrubber Strip + Red "CLOSE" Overlay Button (Exact Match to Video 2 00:01-00:06) */}
          <div className="relative w-full osl-pad-md bg-[#E2E0D8] flex items-center">
            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pr-24 py-1">
              {gallery.map((item, idx) => {
                const isSelected = idx === activeGalleryIdx;
                return (
                  <button
                    key={item._id || item.id || idx}
                    type="button"
                    onClick={() => setActiveGalleryIdx(idx)}
                    className={`relative shrink-0 w-24 aspect-[16/10] overflow-hidden border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#D92B2B] scale-105 opacity-100"
                        : "border-transparent opacity-55"
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Red "CLOSE" Button Fixed on Right of Scrubber Strip */}
            <button
              type="button"
              onClick={() => setIsGalleryDrawerOpen(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-3 bg-[#D92B2B] text-white font-mono text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL 2: SLIDE-OVER BENTO PILLAR SHEET (Matches "ORIGIN" / "BEAUTY" in Video 4)
          ============================================================ */}
      {activePillarSheet && (
        <div className="fixed inset-0 z-[9999] bg-[#ECEBE6] text-[#111111] overflow-y-auto animate-fade-in">
          <div className="osl-pad-md flex items-center justify-between sticky top-0 z-20 bg-[#ECEBE6]/95 backdrop-blur-md border-b border-black/15">
            <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-black/50">
              SHUTTERSCAPE // ARCHIVE PILLAR
            </span>
            <button
              type="button"
              onClick={() => setActivePillarSheet(null)}
              className="px-4 py-2 bg-[#D92B2B] text-white font-mono text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer"
            >
              BACK
            </button>
          </div>

          <div className="osl-pad-lg space-y-6">
            <h2 className="font-heading font-black text-4xl uppercase tracking-[-0.04em] text-[#111111]">
              {activePillarSheet}
            </h2>

            {/* Giant Red Background Typography + Stacked Photos (Exact Match to Video 4 00:00-00:08) */}
            <div className="relative w-full py-6 overflow-hidden border-y border-black/15">
              <div
                aria-hidden="true"
                className="font-heading font-black text-[22vw] leading-[0.82] tracking-[-0.05em] uppercase text-[#D92B2B] select-none"
              >
                {activePillarSheet === "OPTICS"
                  ? "35MM RAW"
                  : activePillarSheet === "CHRONOLOGY"
                  ? "WORKS 26"
                  : "DARKROOM"}
              </div>

              <div className="relative z-10 mt-3 space-y-3">
                <div className="w-full aspect-[16/10] bg-[#111111] overflow-hidden shadow-xl">
                  <img
                    src={
                      activePillarSheet === "OPTICS"
                        ? gallery[0]?.src || FALLBACK_GALLERY[0].src
                        : activePillarSheet === "CHRONOLOGY"
                        ? activities[0]?.img || FALLBACK_ACTIVITIES[0].img
                        : gallery[4]?.src || FALLBACK_GALLERY[4].src
                    }
                    alt={activePillarSheet}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full aspect-[16/10] bg-[#111111] overflow-hidden shadow-xl">
                  <img
                    src={
                      activePillarSheet === "OPTICS"
                        ? gallery[2]?.src || FALLBACK_GALLERY[2].src
                        : activePillarSheet === "CHRONOLOGY"
                        ? activities[1]?.img || FALLBACK_ACTIVITIES[1].img
                        : gallery[5]?.src || FALLBACK_GALLERY[5].src
                    }
                    alt={activePillarSheet}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <p className="font-body text-xs text-black/75 leading-relaxed">
              {activePillarSheet === "OPTICS" &&
                "Every photograph in the ShutterScape Visual Archive is cataloged with full focal length, aperture stop, and film emulsion telemetry. From 35mm Kodak Tri-X street frames to medium-format Himalayan landscapes, we treat every exposure as a physical print."}
              {activePillarSheet === "CHRONOLOGY" &&
                "Across Works '26 and Works '25, ShutterScape hosts heritage photowalks along the Brahmaputra, studio Xenon strobe clinics at the GCU Media Lab, and statewide inter-university exhibitions."}
              {activePillarSheet === "DARKROOM" &&
                "Our vision is to bridge technical optical mastery with raw human storytelling—giving every student at Girijananda Chowdhury University a creative home to experiment with light."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
