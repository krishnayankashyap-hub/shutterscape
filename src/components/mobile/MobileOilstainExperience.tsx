// src/components/mobile/MobileOilstainExperience.tsx
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { MOBILE_HERO_MEDIA } from "@/config/mobileHeroMedia";

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
    description:
      "Golden-hour riverfront documentation capturing ferry silhouettes along the Brahmaputra.",
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
    description:
      "High-contrast Xenon strobe portrait exploring deep tonal gradients.",
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
    description:
      "Dawn mountain exposure capturing atmospheric cloud compression.",
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
    description:
      "Monochrome architectural study dissecting concrete planes across campus.",
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
    description:
      "Ambient night capture harnessing the tungsten halation of Cinestill.",
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
    description:
      "Extreme close-up examining manual lens aperture blades and glass elements.",
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
    description:
      "Golden-hour riverfront documentation exploring ferry silhouettes and twilight reflections.",
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
    description:
      "Hands-on technical clinic covering aperture control and Chiaroscuro portrait lighting.",
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
    description:
      "Curated physical print showcase featuring 60+ archival photographs by GCU students.",
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
    description:
      "Late-night practical session exploring long-exposure light trails and tripod stability.",
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
    photographer: "World Photography Day",
    videoSrc:
      "https://videos.pexels.com/video-files/853889/853889-hd_1080_1920_25fps.mp4",
    posterSrc:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
  },
  {
    id: "02",
    photographer: "Glimpse of Grooming Club's Ramp Walk",
    videoSrc:
      "https://videos.pexels.com/video-files/2871932/2871932-uhd_2160_3840_25fps.mp4",
    posterSrc:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: "03",
    photographer: "Wall Painting & Street Walk",
    videoSrc:
      "https://videos.pexels.com/video-files/5377684/5377684-hd_1080_1920_25fps.mp4",
    posterSrc:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
  },
];

type AboutTabKey = "ORIGINS" | "LEADERSHIP" | "LEGACY";
type PillarKey = "ORIGIN" | "BEAUTY" | "ASYLUM" | null;

export default function MobileOilstainExperience() {
  const [gallery, setGallery] = useState<any[]>(FALLBACK_GALLERY);
  const [activities, setActivities] = useState<any[]>(FALLBACK_ACTIVITIES);
  const [committee, setCommittee] = useState<any[]>(FALLBACK_COMMITTEE);
  const [reels, setReels] = useState<any[]>(FALLBACK_REELS);

  // Interactive UI States
  const [isGalleryDrawerOpen, setIsGalleryDrawerOpen] = useState(false);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [activePillarSheet, setActivePillarSheet] = useState<PillarKey>(null);
  const [activeAboutTab, setActiveAboutTab] = useState<AboutTabKey>("ORIGINS");
  const [matrixPhotoIdx, setMatrixPhotoIdx] = useState(0);
  const [isEngineeringDataOpen, setIsEngineeringDataOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerSubmitted, setRegisterSubmitted] = useState(false);
  const [activeAudioReelIdx, setActiveAudioReelIdx] = useState<number | null>(
    null
  );
  const [heroAnimKey, setHeroAnimKey] = useState(0);
  const [isHeroAnimReady, setIsHeroAnimReady] = useState(false);

  const archiveStartRef = useRef<HTMLDivElement>(null);
  const galleryMainScrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

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

  // Synchronize Hero Letter-by-Letter Animation with Camera Shutter Preloader
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window as unknown as { __shutterLoaderDismissed?: boolean })
        .__shutterLoaderDismissed
    ) {
      setIsHeroAnimReady(true);
      return;
    }

    let triggered = false;
    const triggerAnim = () => {
      if (!triggered) {
        triggered = true;
        setIsHeroAnimReady(true);
      }
    };

    window.addEventListener("shutterscape:loader-complete", triggerAnim);

    // 2.65s fallback: fires right when the camera flash dissipates so hero letters start in full view
    const timer = setTimeout(triggerAnim, 2650);

    return () => {
      window.removeEventListener("shutterscape:loader-complete", triggerAnim);
      clearTimeout(timer);
    };
  }, []);
  const matrixStack = useMemo(() => {
    const combined = [
      ...gallery.slice(0, 6).map((g, i) => ({
        src: g.src,
        title: g.title,
        orientation: i % 2 === 0 ? "portrait" : "landscape",
      })),
      ...activities.slice(0, 2).map((a) => ({
        src: a.img,
        title: a.title,
        orientation: "portrait",
      })),
    ];
    return combined.length > 0
      ? combined
      : FALLBACK_GALLERY.map((g, i) => ({
          src: g.src,
          title: g.title,
          orientation: i % 2 === 0 ? "portrait" : "landscape",
        }));
  }, [gallery, activities]);

  // AUTOMATIC 750MS STOP-MOTION FLIPBOOK LOOP (Matches Oilstainlab Video 3!)
  useEffect(() => {
    if (activeAboutTab !== "ORIGINS" || matrixStack.length <= 1) return;
    const interval = setInterval(() => {
      setMatrixPhotoIdx((prev) => (prev + 1) % matrixStack.length);
    }, 750);
    return () => clearInterval(interval);
  }, [activeAboutTab, matrixStack.length]);

  // Viewport IntersectionObserver for Video Reels
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window))
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.35 }
    );

    videoRefs.current.forEach((v) => {
      if (v) observer.observe(v);
    });

    return () => observer.disconnect();
  }, [reels]);

  const selectGallerySlide = (idx: number) => {
    setActiveGalleryIdx(idx);
    if (galleryMainScrollRef.current) {
      const container = galleryMainScrollRef.current;
      container.scrollTo({
        left: idx * container.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const toggleReelAudio = (idx: number) => {
    if (activeAudioReelIdx === idx) {
      setActiveAudioReelIdx(null);
      if (videoRefs.current[idx]) videoRefs.current[idx]!.muted = true;
    } else {
      setActiveAudioReelIdx(idx);
      videoRefs.current.forEach((v, i) => {
        if (v) {
          v.muted = i !== idx;
          if (i === idx) v.play().catch(() => {});
        }
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
        #shutterscape-mobile-oilstain .osl-pad-lg { padding: 30px 20px !important; }
        #shutterscape-mobile-oilstain .osl-btn-pill { padding: 7px 12px !important; }
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
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        #shutterscape-mobile-oilstain .osl-bento-cell {
          padding: 26px 10px !important;
          border-top: 1px solid rgba(17, 17, 17, 0.15);
          border-bottom: 1px solid rgba(17, 17, 17, 0.15);
          border-right: 1px solid rgba(17, 17, 17, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
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
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-align: center;
          border-right: 1px solid rgba(17, 17, 17, 0.15);
          border-bottom: 1px solid rgba(17, 17, 17, 0.15);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        #shutterscape-mobile-oilstain .osl-input-line {
          width: 100%;
          padding: 12px 0 !important;
          border: none;
          border-bottom: 1px solid rgba(17, 17, 17, 0.25);
          background: transparent;
          font-family: var(--font-space-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: #111111;
          outline: none;
        }
        #shutterscape-mobile-oilstain .osl-input-line:focus {
          border-bottom-color: #D92B2B;
        }
        #shutterscape-mobile-oilstain .osl-input-line::placeholder {
          color: rgba(17, 17, 17, 0.55);
          text-transform: uppercase;
        }
        @keyframes oslRedMarquee {
          0% { transform: translate3d(0%, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        #shutterscape-mobile-oilstain .osl-red-marquee {
          display: flex;
          width: max-content;
          animation: oslRedMarquee 9s linear infinite;
        }
        @keyframes oslLetterReveal {
          0% {
            opacity: 0;
            transform: translateY(38px) rotateX(-75deg) scale(0.82);
            filter: blur(12px);
          }
          55% {
            opacity: 0.85;
            filter: blur(3px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg) scale(1);
            filter: blur(0px);
          }
        }
        #shutterscape-mobile-oilstain .osl-letter-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(38px) rotateX(-75deg) scale(0.82);
          filter: blur(12px);
          transform-origin: 50% 100%;
          animation: oslLetterReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, filter;
        }
        @keyframes oslFadeDown {
          0% {
            opacity: 0;
            transform: translateY(-12px);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        #shutterscape-mobile-oilstain .osl-hero-badge {
          opacity: 0;
          animation: oslFadeDown 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards;
        }
        @keyframes oslRuleExpand {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }
        #shutterscape-mobile-oilstain .osl-hero-rule {
          transform: scaleX(0);
          animation: oslRuleExpand 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.02s forwards;
          transform-origin: center;
        }
        @keyframes oslSubtitleReveal {
          0% {
            opacity: 0;
            transform: translateY(14px);
            letter-spacing: 0.15em;
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: 0.3em;
            filter: blur(0px);
          }
        }
        #shutterscape-mobile-oilstain .osl-hero-subtitle {
          opacity: 0;
          animation: oslSubtitleReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 1.25s forwards;
        }
        @keyframes oslTaglineReveal {
          0% {
            opacity: 0;
            transform: translateY(16px);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        #shutterscape-mobile-oilstain .osl-hero-tagline {
          opacity: 0;
          animation: oslTaglineReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.5s forwards;
        }
      `,
        }}
      />

      {/* ============================================================
          1. OPENING SPLASH HERO
          ============================================================ */}
      <section className="relative w-full h-[100svh] min-h-[580px] bg-[#070709] text-white flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Fallback Poster Image (ensures zero black flash before video starts) */}
          <img
            src={MOBILE_HERO_MEDIA.posterSrc}
            alt="Girijananda Chowdhury University Campus"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.58] contrast-[1.08]"
          />

          {/* Autoplaying Hero Background Video */}
          <video
            ref={heroVideoRef}
            src={MOBILE_HERO_MEDIA.videoSrc}
            poster={MOBILE_HERO_MEDIA.posterSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.58] contrast-[1.08]"
          />

          {/* Cinematic Vignette Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,5,7,0.75) 0%, rgba(5,5,7,0.35) 45%, rgba(5,5,7,0.92) 100%)",
            }}
          />
        </div>

        {/* Universal Navbar (Generous breathing space, NO DUPLICATE LOGO, NO XENOREC) */}
        <nav
          className="relative z-10 w-full pt-7 sm:pt-8 pb-3 px-6 flex items-center justify-center gap-2 sm:gap-3.5 font-mono text-[9.5px] uppercase tracking-[0.18em] font-bold text-white select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          aria-label="Universal Navigation"
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="relative py-1 text-[#D4A843] cursor-pointer"
          >
            <span>HOME</span>
            <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4A843]" />
          </button>

          <span className="text-white/35">//</span>

          <Link
            href="/gallery"
            className="relative py-1 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <span>GALLERY</span>
          </Link>

          <span className="text-white/35">//</span>

          <Link
            href="/about"
            className="relative py-1 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <span>ABOUT</span>
          </Link>

          <span className="text-white/35">//</span>

          <Link
            href="/activities"
            className="relative py-1 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <span>ACTIVITY</span>
          </Link>

          <span className="text-white/35">//</span>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("mobile-chronology-matrix")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="relative py-1 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <span>MOMENTS</span>
          </button>
        </nav>

        <div
          key={heroAnimKey}
          onClick={() => setHeroAnimKey((prev) => prev + 1)}
          title="Tap to replay intro sequence"
          className="relative z-10 px-4 py-6 flex flex-col items-center text-center my-auto w-full cursor-pointer select-none"
        >
          <div className="flex items-center justify-center gap-2 mb-3 w-full">
            <span
              className={`w-4 h-[1px] bg-[#D4A843] shrink-0 ${
                isHeroAnimReady ? "osl-hero-rule" : "opacity-0"
              }`}
            />
            <span
              className={`font-mono text-[8.5px] tracking-[0.22em] uppercase text-[#D4A843] font-bold ${
                isHeroAnimReady ? "osl-hero-badge" : "opacity-0"
              }`}
            >
              EST. 2023 · MORE THAN JUST A CAMERA CLUB
            </span>
            <span
              className={`w-4 h-[1px] bg-[#D4A843] shrink-0 ${
                isHeroAnimReady ? "osl-hero-rule" : "opacity-0"
              }`}
            />
          </div>

          <h1
            style={{ perspective: "900px" }}
            className="font-serif text-[clamp(1.85rem,9.2vw,3.4rem)] leading-[0.92] tracking-[0.04em] uppercase text-white font-normal drop-shadow-[0_10px_30px_rgba(0,0,0,0.85)] w-full text-center"
          >
            {"SHUTTERSCAPE".split("").map((char, i) => (
              <span
                key={i}
                className={isHeroAnimReady ? "osl-letter-char" : "opacity-0 inline-block"}
                style={
                  isHeroAnimReady
                    ? {
                        animationDelay: `${0.18 + i * 0.085}s`,
                      }
                    : { opacity: 0 }
                }
              >
                {char}
              </span>
            ))}
          </h1>

          <p
            style={{ marginTop: "12px" }}
            className={`font-mono text-[10px] tracking-[0.3em] uppercase text-white/90 font-semibold ${
              isHeroAnimReady ? "osl-hero-subtitle" : "opacity-0"
            }`}
          >
            GCU PHOTOGRAPHY CLUB
          </p>

          <p
            style={{ marginTop: "10px" }}
            className={`font-serif italic text-sm text-white/75 max-w-[280px] ${
              isHeroAnimReady ? "osl-hero-tagline" : "opacity-0"
            }`}
          >
            &ldquo;Observe, capture, and tell stories through light.&rdquo;
          </p>
        </div>

        <div className="relative z-10 w-full flex flex-col">
          <div className="osl-pad-sm flex items-center justify-between font-mono text-[8.5px] tracking-[0.2em] text-white/65 uppercase border-t border-white/10 bg-black/45 backdrop-blur-xs">
            <span>f/1.4 · 1/1000s · ISO 400</span>
            <span>GCU · ASSAM</span>
          </div>

          <button
            type="button"
            onClick={() =>
              archiveStartRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full flex items-center justify-between px-5 py-3.5 bg-[#D4A843] text-[#050505] font-mono text-[10.5px] font-bold tracking-[0.18em] uppercase cursor-pointer hover:bg-[#E5B955] transition-colors border-t border-black/20"
          >
            <span>ENTER THE DARKROOM ARCHIVE</span>
            <span className="text-base leading-none font-bold">↓</span>
          </button>
        </div>
      </section>

      {/* ============================================================
          2. SPLIT "SS — 26" POSTER & 4-ROW SPEC TABLE
          ============================================================ */}
      <section
        id="mobile-light-spec-section"
        ref={archiveStartRef}
        className="relative w-full bg-[#ECEBE6] text-[#111111] border-b border-black/15"
      >
        <div className="osl-pad-md flex items-start justify-between leading-none">
          <span className="font-heading font-black text-[22vw] tracking-[-0.06em] leading-[0.82] text-[#111111]">
            SS
          </span>
          <span className="font-heading font-light text-[22vw] tracking-[-0.06em] leading-[0.82] text-[#111111]">
            26
          </span>
        </div>

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
          ============================================================ */}
      <section id="mobile-dark-showcase" className="w-full bg-[#141416] text-white">
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

        <div className="osl-pad-md pt-0">
          <button
            type="button"
            onClick={() => setIsGalleryDrawerOpen(true)}
            className="osl-bar-btn border border-white/25 bg-white/5 hover:bg-white hover:text-black text-white"
          >
            <span>GALLERY</span>
            <span className="text-lg leading-none font-light">+</span>
          </button>
        </div>
      </section>

      {/* ============================================================
          4. LIGHT SHOWCASE + 3-COLUMN BENTO GRID (ORIGIN | BEAUTY | ASYLUM)
          ============================================================ */}
      <section id="mobile-light-bento-section" className="w-full bg-[#ECEBE6] text-[#111111]">
        <div className="osl-pad-lg flex flex-col items-center">
          <div className="relative w-full aspect-[16/10] rounded-xs overflow-hidden border border-black/15 shadow-md">
            <img
              src={gallery[2]?.src || FALLBACK_GALLERY[2].src}
              alt={gallery[2]?.title || "Landscape Study"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 w-full border-l border-black/15">
          <button
            type="button"
            onClick={() => setActivePillarSheet("ORIGIN")}
            className="osl-bento-cell"
          >
            <span className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase">
              ORIGIN
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActivePillarSheet("BEAUTY")}
            className="osl-bento-cell"
          >
            <span className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase">
              BEAUTY
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActivePillarSheet("ASYLUM")}
            className="osl-bento-cell"
          >
            <span className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase">
              ASYLUM
            </span>
          </button>
        </div>

        <div className="osl-pad-md">
          <button
            type="button"
            onClick={() => {
              setIsEngineeringDataOpen(true);
              document
                .getElementById("mobile-chronology-matrix")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="osl-bar-btn border border-black/25 bg-transparent text-[#111111]"
          >
            <span>ARCHIVE SPECS &amp; CHRONOLOGY</span>
            <span className="text-base leading-none">+</span>
          </button>
        </div>
      </section>

      {/* ============================================================
          5. "ABOUT" BANNER + 3-TAB SWITCHER + AUTOMATIC STOP-MOTION PHOTO MATRIX
          ============================================================ */}
      <section id="mobile-light-about-section" className="w-full bg-[#FAF9F5] text-[#111111] border-t border-black/15">
        {/* Fixed ABOUT Banner: Image is absolute inset-0 so "ABOUT" sits dead-center! */}
        <div className="relative w-full aspect-[16/10] bg-[#111111] flex items-center justify-center overflow-hidden">
          <img
            src="/images/gcu-campus-sketch.jpg"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1000&q=80";
            }}
            alt="About ShutterScape"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-55"
          />
          <div className="absolute inset-0 bg-black/40" />
          <h2 className="relative z-10 font-heading font-black text-3xl tracking-[0.06em] uppercase text-white text-center">
            ABOUT
          </h2>
        </div>

        {/* 3-Tab Hairline Switcher */}
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

        {/* TAB 1: ORIGINS — With Automatic 750ms Stop-Motion Photo Flipbook (Matches Video 3!) */}
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

            {/* Repeating Typographic Matrix + Automatic Stop-Motion Photo Flipbook */}
            <div
              onClick={() =>
                setMatrixPhotoIdx((prev) => (prev + 1) % matrixStack.length)
              }
              className="relative w-full py-6 overflow-hidden flex items-center justify-center border-y border-black/15 bg-[#FAF9F5] cursor-pointer"
            >
              <div
                aria-hidden="true"
                className="font-heading font-black text-[13vw] leading-[0.86] tracking-[-0.04em] uppercase text-[#111111] text-center select-none break-all"
              >
                SHUTTER*SCAPE*GCU*35MM*RAW*OPTICS*DARKROOM*ASSAM*
              </div>

              {/* Pre-rendered Stop-Motion Frame Stack (Changes automatically every 750ms with zero flicker!) */}
              {matrixStack.map((frame, i) => {
                const isCurrent = i === matrixPhotoIdx % matrixStack.length;
                const isPortrait = frame.orientation === "portrait";
                return (
                  <div
                    key={i}
                    style={{
                      opacity: isCurrent ? 1 : 0,
                      width: isPortrait ? "48%" : "64%",
                      aspectRatio: isPortrait ? "3 / 4" : "4 / 3",
                      padding: "6px",
                    }}
                    className="absolute bg-white shadow-[0_22px_55px_rgba(0,0,0,0.5)] border border-black/15 pointer-events-none transition-opacity duration-200"
                  >
                    <img
                      src={frame.src}
                      alt={frame.title}
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>
                );
              })}
            </div>

            {/* Editorial Manifesto Underneath (Matches "DOUBLE VISION" in Video 3) */}
            <div className="space-y-2.5">
              <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-[#111111] font-bold block">
                DOUBLE VISION //{" "}
                {matrixStack[matrixPhotoIdx % matrixStack.length]?.title ||
                  "GCU ARCHIVE"}
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

        {/* TAB 2: LEADERSHIP */}
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

        {/* TAB 3: LEGACY */}
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

            <Link
              href="/about"
              className="osl-bar-btn border border-black/25 bg-[#111111] text-white"
            >
              <span>OPEN FULL ROSTER &amp; CHAPTERS</span>
              <span>→</span>
            </Link>
          </div>
        )}
      </section>

      {/* ============================================================
          6. VERTICAL VIDEO REELS + REGISTRATION & ARCHIVE DATA MATRIX
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

        {/* Viewport-Aware Video Reels */}
        <div className="osl-pad-md pt-0 overflow-x-auto no-scrollbar flex items-center gap-4">
          {reels.map((reel, idx) => {
            const isUnmuted = activeAudioReelIdx === idx;
            const fallbackPoster =
              reel.posterSrc ||
              gallery[idx % gallery.length]?.src ||
              FALLBACK_GALLERY[idx % FALLBACK_GALLERY.length].src;

            return (
              <div
                key={reel._id || reel.id || idx}
                onClick={() => toggleReelAudio(idx)}
                style={{
                  backgroundImage: `url(${fallbackPoster})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="relative shrink-0 w-[68vw] max-w-[260px] aspect-[9/16] bg-[#111111] rounded-xs overflow-hidden border border-black/20 shadow-lg cursor-pointer"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={reel.videoSrc}
                  poster={fallbackPoster}
                  loop
                  muted
                  playsInline
                  preload="metadata"
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
                  <span className="font-sans text-sm font-bold text-white line-clamp-1">
                    {reel.photographer}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full mt-2">
          <button
            type="button"
            onClick={() => {
              setRegisterSubmitted(false);
              setIsRegisterModalOpen(true);
            }}
            className="osl-bar-btn bg-[#D92B2B] text-white border-b border-white/15"
          >
            <span>REGISTER YOUR INTEREST // JOIN SHUTTERSCAPE</span>
            <span className="text-lg leading-none">+</span>
          </button>

          <button
            type="button"
            onClick={() => setIsEngineeringDataOpen((prev) => !prev)}
            className="osl-bar-btn bg-[#1A1A1E] text-white border-b border-white/10"
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
          MODAL 1: FULLSCREEN SWIPEABLE "GALLERY +" SCRUBBER
          ============================================================ */}
      {isGalleryDrawerOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#ECEBE6] text-[#111111] flex flex-col justify-between overflow-hidden animate-fade-in">
          <div
            ref={galleryMainScrollRef}
            onScroll={(e) => {
              const el = e.currentTarget;
              const newIdx = Math.round(el.scrollLeft / el.clientWidth);
              if (
                newIdx !== activeGalleryIdx &&
                newIdx >= 0 &&
                newIdx < gallery.length
              ) {
                setActiveGalleryIdx(newIdx);
              }
            }}
            className="w-full h-[65svh] bg-[#111111] flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
          >
            {gallery.map((item, idx) => (
              <div
                key={item._id || item.id || idx}
                className="relative w-full h-full shrink-0 snap-center flex items-center justify-center bg-[#0A0A0C]"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/75 border border-white/15 font-mono text-[9.5px] tracking-[0.2em] uppercase text-[#D4A843]">
                  {String(idx + 1).padStart(2, "0")} /{" "}
                  {String(gallery.length).padStart(2, "0")} · {item.category}
                </div>
              </div>
            ))}
          </div>

          <div className="osl-pad-md flex items-center justify-between border-b border-black/15 bg-[#ECEBE6]">
            <div className="min-w-0 pr-3">
              <h3 className="font-heading font-black text-base uppercase text-[#111111] truncate">
                {gallery[activeGalleryIdx]?.title}
              </h3>
              <p className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-black/55 truncate mt-0.5">
                BY {gallery[activeGalleryIdx]?.photographer} ·{" "}
                {gallery[activeGalleryIdx]?.filmStock}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() =>
                  selectGallerySlide(
                    (activeGalleryIdx - 1 + gallery.length) % gallery.length
                  )
                }
                className="w-9 h-9 border border-black/25 font-mono text-xs flex items-center justify-center cursor-pointer"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() =>
                  selectGallerySlide((activeGalleryIdx + 1) % gallery.length)
                }
                className="w-9 h-9 border border-black/25 font-mono text-xs flex items-center justify-center cursor-pointer"
              >
                →
              </button>
            </div>
          </div>

          <div className="relative w-full osl-pad-md bg-[#E2E0D8] flex items-center">
            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pr-24 py-1">
              {gallery.map((item, idx) => {
                const isSelected = idx === activeGalleryIdx;
                return (
                  <button
                    key={item._id || item.id || idx}
                    type="button"
                    onClick={() => selectGallerySlide(idx)}
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
          MODAL 2: SLIDE-OVER BENTO PILLAR SHEET (With Moving Red Marquee Text!)
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

            <div className="relative w-full py-6 overflow-hidden border-y border-black/15">
              {/* Continuous Moving Red Background Marquee (Matches Video 4!) */}
              <div className="overflow-hidden w-full">
                <div
                  aria-hidden="true"
                  className="osl-red-marquee font-heading font-black text-[24vw] leading-[0.82] tracking-[-0.05em] uppercase text-[#D92B2B] select-none"
                >
                  <span className="pr-8">
                    {activePillarSheet === "ORIGIN"
                      ? "TIME MACHINE // GCU ARCHIVE //"
                      : activePillarSheet === "BEAUTY"
                      ? "35MM RAW // OPTICAL CRAFT //"
                      : "DARKROOM // PURE VISION //"}
                  </span>
                  <span className="pr-8">
                    {activePillarSheet === "ORIGIN"
                      ? "TIME MACHINE // GCU ARCHIVE //"
                      : activePillarSheet === "BEAUTY"
                      ? "35MM RAW // OPTICAL CRAFT //"
                      : "DARKROOM // PURE VISION //"}
                  </span>
                </div>
              </div>

              <div className="relative z-10 mt-3 space-y-3">
                <div className="w-full aspect-[16/10] bg-[#111111] overflow-hidden shadow-xl">
                  <img
                    src={
                      activePillarSheet === "ORIGIN"
                        ? gallery[0]?.src || FALLBACK_GALLERY[0].src
                        : activePillarSheet === "BEAUTY"
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
                      activePillarSheet === "ORIGIN"
                        ? gallery[2]?.src || FALLBACK_GALLERY[2].src
                        : activePillarSheet === "BEAUTY"
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
              {activePillarSheet === "ORIGIN" &&
                "How do you freeze a fleeting moment across time and space? Start by building a visual archive. Every photograph in the ShutterScape collection is cataloged with full focal length, aperture stop, and film emulsion telemetry."}
              {activePillarSheet === "BEAUTY" &&
                "Across Works '26 and Works '25, ShutterScape hosts heritage photowalks along the Brahmaputra, studio Xenon strobe clinics at the GCU Media Lab, and statewide inter-university exhibitions."}
              {activePillarSheet === "ASYLUM" &&
                "Our darkroom is a sanctuary for visual storytellers—bridging technical optical mastery with raw human emotion so every student at Girijananda Chowdhury University has a creative home."}
            </p>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL 3: "REGISTER YOUR INTEREST" SWISS FORM MODAL
          ============================================================ */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#FAF9F5] text-[#111111] overflow-y-auto animate-fade-in flex flex-col justify-between">
          <div>
            <div className="osl-pad-md flex items-center justify-between border-b border-black/15 sticky top-0 bg-[#FAF9F5]/95 backdrop-blur-md z-20">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#111111] font-bold">
                JOIN SHUTTERSCAPE &apos;26
              </span>
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(false)}
                className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#111111] font-bold cursor-pointer"
              >
                CLOSE
              </button>
            </div>

            <div className="osl-pad-lg space-y-6">
              <h2 className="font-heading font-black text-3xl uppercase tracking-[-0.03em] leading-[0.95] text-[#111111]">
                REGISTER
                <br />
                YOUR INTEREST
                <br />
                IN SHUTTERSCAPE:
              </h2>

              {registerSubmitted ? (
                <div className="p-6 border border-black/20 bg-[#ECEBE6] space-y-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#D92B2B] font-bold block">
                    ● TRANSMISSION RECEIVED
                  </span>
                  <h3 className="font-heading font-bold text-lg uppercase text-[#111111]">
                    WELCOME TO THE DARKROOM.
                  </h3>
                  <p className="font-body text-xs text-black/75 leading-relaxed">
                    Your registration has been logged for ShutterScape GCU. You
                    can also join our official WhatsApp community for instant
                    photowalk dispatches.
                  </p>
                  <a
                    href="https://chat.whatsapp.com/Hs71BicR1Xj3PmOyPJ5wdc?s=sw&p=a&mlu=4&ilr=4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="osl-bar-btn bg-[#111111] text-white mt-3"
                  >
                    <span>JOIN WHATSAPP COMMUNITY</span>
                    <span>↗</span>
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setRegisterSubmitted(true);
                  }}
                  className="space-y-4 pt-2"
                >
                  <input
                    type="text"
                    required
                    placeholder="NAME*"
                    className="osl-input-line"
                  />
                  <input
                    type="email"
                    required
                    placeholder="EMAIL*"
                    className="osl-input-line"
                  />
                  <input
                    type="tel"
                    placeholder="PHONE"
                    className="osl-input-line"
                  />
                  <input
                    type="text"
                    placeholder="DEPARTMENT & SEMESTER (GCU)"
                    className="osl-input-line"
                  />
                  <textarea
                    rows={3}
                    required
                    placeholder="YOUR MESSAGE / CAMERA GEAR*"
                    className="osl-input-line resize-none"
                  />
                  <select
                    defaultValue=""
                    className="osl-input-line uppercase cursor-pointer"
                  >
                    <option value="" disabled>
                      PRIMARY DISCIPLINE
                    </option>
                    <option value="STREET">STREET &amp; DOCUMENTARY</option>
                    <option value="PORTRAITURE">
                      PORTRAITURE &amp; STROBE
                    </option>
                    <option value="LANDSCAPE">LANDSCAPE &amp; WILDLIFE</option>
                    <option value="CINEMATOGRAPHY">
                      MOTION REELS &amp; VIDEO
                    </option>
                    <option value="MOBILE">MOBILE PHOTOGRAPHY</option>
                  </select>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      style={{ padding: "13px 34px" }}
                      className="bg-[#D92B2B] text-white font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] cursor-pointer shadow-md"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
