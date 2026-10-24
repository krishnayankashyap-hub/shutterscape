// src/components/cinematic/TimelinePeek.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ActivityChapter {
  id: string;
  frameCode: string;
  filmStock: string;
  status: "UPCOMING" | "COMPLETED" | "ARCHIVE";
  isUpcoming: boolean;
  category: string;
  date: string;
  location: string;
  title: string;
  description: string;
  exif: string;
  src: string;
}

const ACTIVITY_CHAPTERS: ActivityChapter[] = [
  {
    id: "01",
    frameCode: "21A",
    filmStock: "KODAK PORTRA 400",
    status: "UPCOMING",
    isUpcoming: true,
    category: "PHOTOWALK",
    date: "NOV 14, 2026",
    location: "Brahmaputra Riverfront",
    title: "Brahmaputra Heritage Photowalk 4.0",
    description:
      "Golden-hour riverfront documentation exploring ferry silhouettes, twilight reflections, and colonial architecture.",
    exif: "35MM · F/2.0 · 1/1000S · ISO 200",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=85",
  },
  {
    id: "02",
    frameCode: "22B",
    filmStock: "ILFORD HP5 PLUS",
    status: "COMPLETED",
    isUpcoming: false,
    category: "WORKSHOP",
    date: "OCT 04, 2026",
    location: "GCU Media Lab",
    title: "Mastering Manual Optics & Xenon Strobe",
    description:
      "Hands-on technical clinic covering aperture control, high-speed sync flash, and Chiaroscuro portrait lighting.",
    exif: "85MM · F/1.4 · 1/250S · ISO 100",
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1400&q=85",
  },
  {
    id: "03",
    frameCode: "23C",
    filmStock: "KODAK VISION3 500T",
    status: "ARCHIVE",
    isUpcoming: false,
    category: "EXHIBITION",
    date: "AUG 22, 2026",
    location: "GCU Central Atrium",
    title: "Frames Beyond Time — Annual Exhibition",
    description:
      "Curated physical print showcase featuring 60+ archival photographs by GCU students and faculty mentors.",
    exif: "50MM · F/2.8 · 1/500S · ISO 400",
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400&q=85",
  },
  {
    id: "04",
    frameCode: "24D",
    filmStock: "CINESTILL 800T",
    status: "ARCHIVE",
    isUpcoming: false,
    category: "COMPETITION",
    date: "APR 18, 2026",
    location: "Inter-University Circuit",
    title: "Chiaroscuro — National Street Challenge",
    description:
      "48-hour visual storytelling challenge celebrating high-contrast urban geometry and human emotion.",
    exif: "24MM · F/4.0 · 1/1250S · ISO 400",
    src: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1400&q=85",
  },
  {
    id: "05",
    frameCode: "25E",
    filmStock: "FUJIFILM VELVIA 50",
    status: "ARCHIVE",
    isUpcoming: false,
    category: "EXPEDITION",
    date: "FEB 09, 2026",
    location: "Deepor Beel Wildlife Sanctuary",
    title: "Mist, Avian Optics & Telephoto Study",
    description:
      "Dawn expedition focusing on long-focal tracking, atmospheric compression, and conservation storytelling.",
    exif: "200MM · F/2.8 · 1/2000S · ISO 320",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&q=85",
  },
];

const ARCHIVE_METRICS = [
  { count: "18", label: "HERITAGE PHOTOWALKS", code: "FIELD // 01" },
  { count: "22", label: "OPTICS & STROBE CLINICS", code: "LAB // 02" },
  { count: "12", label: "CURATED EXHIBITIONS", code: "GALLERY // 03" },
];

export default function TimelinePeek() {
  const sectionRef = useRef<HTMLElement>(null);
  const giantTextGroupRef = useRef<HTMLDivElement>(null);
  const recentTextRef = useRef<HTMLHeadingElement>(null);
  const chaptersTextRef = useRef<HTMLSpanElement>(null);
  const reelTrackRef = useRef<HTMLDivElement>(null);
  const innerImagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const archiveSummaryRef = useRef<HTMLDivElement>(null);
  const darkroomIrisRef = useRef<HTMLDivElement>(null);
  const progressBarFillRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);

  const magneticBtnRef = useRef<HTMLAnchorElement>(null);
  const magneticArrowRef = useRef<HTMLSpanElement>(null);

  const [activeChapter, setActiveChapter] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [chapters, setChapters] = useState<ActivityChapter[]>(ACTIVITY_CHAPTERS);

  useEffect(() => {
    fetch("/api/activities?year=2026")
      .then((r) => r.json())
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setChapters(
            res.data.slice(0, 5).map((d: any, idx: number) => ({
              id: String(idx + 1).padStart(2, "0"),
              frameCode: `${21 + idx}A`,
              filmStock: d.filmStock || "KODAK PORTRA 400",
              status: d.isUpcoming ? "UPCOMING" : "COMPLETED",
              isUpcoming: Boolean(d.isUpcoming),
              category: d.category || "PHOTOWALK",
              date: d.date,
              location: d.location || "Guwahati",
              title: d.title,
              description: d.description || "",
              exif: d.exif || "35MM · F/2.0",
              src: d.img,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 1024);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Magnetic Button Physics
  useEffect(() => {
    const btn = magneticBtnRef.current;
    const arrow = magneticArrowRef.current;
    if (!btn || !arrow) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.45, ease: "power3.out" });
    const arrowXTo = gsap.quickTo(arrow, "x", {
      duration: 0.35,
      ease: "power3.out",
    });

    const handleMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      xTo(dx * 0.28);
      yTo(dy * 0.35);
      arrowXTo(6 + dx * 0.08);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
      arrowXTo(0);
    };

    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Master GSAP ScrollTrigger Choreography
  useEffect(() => {
    const section = sectionRef.current;
    const track = reelTrackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const validInnerImages = innerImagesRef.current.filter(Boolean);

      gsap.set(track, { x: "100vw" });
      gsap.set(archiveSummaryRef.current, {
        opacity: 0,
        y: 80,
        pointerEvents: "none",
      });
      gsap.set(darkroomIrisRef.current, { clipPath: "circle(0% at 50% 50%)" });

      const getEndTranslateX = () =>
        -(track.scrollWidth + window.innerWidth * 0.15);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          onUpdate: (self) => {
            const p = self.progress;
            const reelP = Math.min(1, Math.max(0, (p - 0.05) / 0.7));
            const idx = Math.min(
              chapters.length,
              Math.max(1, Math.ceil(reelP * chapters.length))
            );
            setActiveChapter(idx);

            if (progressBarFillRef.current) {
              progressBarFillRef.current.style.transform = `scaleX(${p})`;
            }
            if (timecodeRef.current) {
              const totalFrames = Math.floor(p * 1800);
              const secs = String(Math.floor(totalFrames / 24)).padStart(
                2,
                "0"
              );
              const frames = String(totalFrames % 24).padStart(2, "0");
              timecodeRef.current.textContent = `TC 00:04:${secs}:${frames}`;
            }
          },
        },
      });

      // PHASE 1: Giant Title scales down and fades into the watermark background
      tl.to(
        giantTextGroupRef.current,
        {
          y: isMobile ? "-15vh" : "-20vh",
          scale: 0.85,
          opacity: 0.1,
          duration: 1.2,
          ease: "power2.out",
        },
        0
      );

      // PHASE 2: SPLIT-TEXT PARALLAX (Left to Right / Right to Left)
      tl.to(
        recentTextRef.current,
        { x: isMobile ? "-6vw" : "-20vw", duration: 7, ease: "none" },
        0.5
      );
      tl.to(
        chaptersTextRef.current,
        { x: isMobile ? "6vw" : "20vw", duration: 7, ease: "none" },
        0.5
      );

      // PHASE 2 (cont): Horizontal 35mm Film Reel unspools
      tl.to(
        track,
        {
          x: () => getEndTranslateX(),
          duration: 7,
          ease: "none",
        },
        0.5
      );

      if (validInnerImages.length > 0) {
        tl.fromTo(
          validInnerImages,
          { xPercent: -12, scale: 1.15 },
          { xPercent: 12, scale: 1.02, duration: 7, ease: "none" },
          0.5
        );
      }

      // PHASE 3: Title fades out completely
      tl.to(giantTextGroupRef.current, { opacity: 0, duration: 0.5 }, 7.2);

      // PHASE 4: Editorial Summary glides in
      tl.to(
        archiveSummaryRef.current,
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 1.2,
          ease: "power3.out",
        },
        7.8
      );

      // PHASE 5: Circular Aperture Iris Wipe smoothly handoffs to Scene 5
      tl.to(
        darkroomIrisRef.current,
        {
          clipPath: "circle(150% at 50% 50%)",
          duration: 1.0,
          ease: "power2.inOut",
        },
        8.8
      );
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[460vh] bg-[#F4F4F5] select-none"
    >
      {/* CSS Sticky Container prevents layout jumps and conflicts with GSAP Pins */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#F4F4F5] flex flex-col justify-between">
        {/* Paper Grain Texture to match Scene 3 Light-Table */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply pointer-events-none z-0" />

        {/* TOP HUD */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-36 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D4A843]" />
            <span className="font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.32em] text-[#050505]/70 uppercase">
              SCENE 04 // THE TIMELINE PEEK
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-mono text-[10px] tracking-[0.26em] text-[#050505]/45">
            <span>LIGHT-TABLE INSPECTION</span>
            <span ref={timecodeRef} className="text-[#050505]/80">
              TC 00:04:00:00
            </span>
          </div>
          <div className="font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.24em] text-[#050505]">
            CHAPTER{" "}
            <strong className="text-[#D4A843]">
              {String(activeChapter).padStart(2, "0")}
            </strong>{" "}
            / 05
          </div>
        </div>

        {/* LAYER 1: SPLIT PARALLAX TITLE (Left to Right / Right to Left) */}
        <div
          ref={giantTextGroupRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4"
        >
          <p className="font-mono text-[#050505] text-[10px] sm:text-xs md:text-sm tracking-[0.4em] mb-3 md:mb-4 opacity-60 text-center uppercase">
            CHRONOLOGICAL FILM ARCHIVE // GCU
          </p>
          <div className="flex flex-col items-center">
            <h2
              ref={recentTextRef}
              className="font-serif text-[#050505] text-4xl sm:text-7xl md:text-[12vw] leading-[0.88] uppercase text-center font-light tracking-tight will-change-transform"
            >
              Recent
            </h2>
            <span
              ref={chaptersTextRef}
              className="font-serif text-[#D4A843] text-4xl sm:text-7xl md:text-[12vw] leading-[0.88] uppercase text-center font-normal italic tracking-tight will-change-transform"
            >
              Chapters.
            </span>
          </div>
        </div>

        {/* LAYER 2: HORIZONTAL 35MM FILM STRIP */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center pointer-events-none mt-[8vh] sm:mt-[6vh]">
          <div
            ref={reelTrackRef}
            className="flex items-center gap-6 sm:gap-20 md:gap-40 will-change-transform pointer-events-auto pl-[6vw] sm:pl-[10vw]"
          >
            {chapters.map((chapter, idx) => (
              <article
                key={chapter.id}
                className="w-[88vw] md:w-[700px] lg:w-[840px] shrink-0 flex flex-col"
              >
                {/* HEADER ABOVE FRAME */}
                <div className="flex items-end justify-between px-1 relative z-0 mb-3 md:mb-5">
                  <div className="flex items-baseline gap-3 md:gap-6">
                    <span className="font-serif text-4xl sm:text-[64px] md:text-[88px] text-[#050505] leading-none tracking-tighter">
                      {chapter.id}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em] text-[#D4A843] uppercase pb-1 md:pb-2">
                      {chapter.category}{" "}
                      <span className="text-[#050505]/30 mx-1 md:mx-2">·</span>{" "}
                      {chapter.date}
                    </span>
                  </div>

                  <span className="font-mono text-[8.5px] sm:text-[9px] md:text-[11px] tracking-[0.22em] text-[#050505]/35 pb-1 md:pb-2 uppercase">
                    [{chapter.frameCode}]
                  </span>
                </div>

                {/* MASSIVE 35MM FILM STRIP */}
                <div className="relative z-10 bg-[#0A0A0C] p-3 sm:p-4 md:p-5 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.2)] border border-[#050505]/20">
                  <div className="flex justify-between mb-3 sm:mb-4 px-2 md:px-3">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-2 sm:w-3 md:w-4 h-1.5 sm:h-2 md:h-2.5 rounded-[1.5px] bg-[#F4F4F5] opacity-90 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]"
                      />
                    ))}
                  </div>

                  <div className="relative w-full h-[180px] sm:h-[320px] md:h-[420px] lg:h-[480px] rounded-[3px] overflow-hidden border border-white/10">
                    <div
                      ref={(el) => {
                        innerImagesRef.current[idx] = el;
                      }}
                      className="absolute inset-0 w-[124%] -left-[12%] h-full will-change-transform"
                    >
                      <Image
                        src={chapter.src}
                        alt={chapter.title}
                        fill
                        sizes="(max-width: 1024px) 90vw, 900px"
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 pointer-events-none" />

                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between font-mono text-[8.5px] sm:text-[9px] md:text-[11px] tracking-[0.2em] text-[#D4A843] pointer-events-none drop-shadow-md">
                      <span>{chapter.location}</span>
                      <span className="hidden md:inline">{chapter.exif}</span>
                    </div>
                  </div>

                  <div className="flex justify-between mt-3 sm:mt-4 px-2 md:px-3">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-2 sm:w-3 md:w-4 h-1.5 sm:h-2 md:h-2.5 rounded-[1.5px] bg-[#F4F4F5] opacity-90 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]"
                      />
                    ))}
                  </div>

                  <div className="mt-2.5 sm:mt-3 px-2 md:px-3 flex justify-between font-mono text-[7.5px] sm:text-[8px] md:text-[9.5px] tracking-[0.25em] text-[#D4A843]/80">
                    <span>{chapter.filmStock}</span>
                    <span>GCU ARCHIVE // {chapter.frameCode}</span>
                  </div>
                </div>

                <div className="h-2 sm:h-6 md:h-12 w-full shrink-0"></div>

                {/* EDITORIAL CONTENT BELOW STRIP */}
                <div className="relative z-10 px-1 md:px-2 flex flex-col md:flex-row justify-between items-start gap-4 md:gap-12">
                  <div className="max-w-2xl">
                    <h3 className="font-serif text-lg sm:text-2xl md:text-[40px] text-[#050505] leading-[1.15] font-light tracking-tight">
                      {chapter.title}
                    </h3>
                    <p className="font-body text-xs sm:text-[13px] md:text-[16px] text-[#050505]/65 mt-1.5 sm:mt-3 md:mt-4 leading-[1.5]">
                      {chapter.description}
                    </p>
                  </div>

                  <div className="shrink-0 pt-1 md:pt-2">
                    {chapter.isUpcoming ? (
                      <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em] text-[#D4A843] uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#D4A843] animate-pulse" />
                        UPCOMING
                      </span>
                    ) : (
                      <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em] text-[#050505]/40 uppercase">
                        // {chapter.status}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* LAYER 3: BULLETPROOF ARCHIVE SUMMARY (FLEX + SHRINK-0) */}
        <div
          ref={archiveSummaryRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#F4F4F5] px-4 sm:px-6 pt-24 sm:pt-28 md:pt-36 pb-8"
        >
          <div className="max-w-5xl w-full flex flex-col items-center text-center gap-3 sm:gap-8 md:gap-14">
            <div className="flex flex-col items-center gap-2 sm:gap-4 md:gap-6 shrink-0 max-w-3xl">
              <span className="font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] text-[#D4A843] uppercase">
                Living Visual Chronicle // Est. 2023
              </span>
              <p className="font-serif text-base sm:text-2xl md:text-4xl italic font-light leading-snug sm:leading-[1.38] text-[#050505]">
                “From dawn expeditions across Assam’s wetlands to late-night
                strobe clinics in our campus studio — every gathering is a new
                frame in the reel.”
              </p>
            </div>

            <div className="w-full flex flex-col items-center border-t border-[#050505]/10 pt-3 sm:pt-8 md:pt-12 gap-3 sm:gap-8 md:gap-12 shrink-0">
              <span className="font-mono text-[8.5px] sm:text-[9.5px] md:text-[10.5px] tracking-[0.28em] text-[#050505]/40 uppercase shrink-0">
                CUMULATIVE CHAPTERS LOGGED //
              </span>

              <div className="flex flex-wrap justify-center items-start gap-4 sm:gap-12 md:gap-24 shrink-0 w-full">
                {ARCHIVE_METRICS.map((item) => (
                  <div
                    key={item.code}
                    className="flex flex-col items-center gap-1 sm:gap-3 shrink-0"
                  >
                    <span className="font-serif text-2xl sm:text-5xl md:text-6xl text-[#050505] font-light leading-none">
                      {item.count}
                    </span>
                    <div className="flex flex-col items-center gap-0.5 sm:gap-1.5">
                      <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] text-[#050505]/30">
                        {item.code}
                      </span>
                      <span className="font-mono text-[8px] sm:text-[9.5px] md:text-[10.5px] tracking-[0.2em] text-[#D4A843] uppercase text-center">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frameless & Borderless Editorial CTA Button to /activities */}
            <div className="shrink-0 pt-2 md:pt-4">
              <Link
                ref={magneticBtnRef}
                href="/activities"
                className="group font-mono relative inline-flex items-center gap-3 sm:gap-4 min-h-[44px] py-2 px-1 text-[#050505] hover:text-[#D4A843] text-[10.5px] sm:text-[11px] md:text-[12.5px] tracking-[0.3em] uppercase font-bold transition-colors duration-300 cursor-pointer touch-manipulation bg-transparent border-0 shadow-none rounded-none focus-visible:outline-2 focus-visible:outline-[#D4A843] focus-visible:outline-offset-4"
                title="Enter Full Timeline"
                aria-label="Enter Full Timeline"
              >
                <span className="transition-colors duration-300">Enter Full Timeline</span>
                <span
                  ref={magneticArrowRef}
                  className="text-lg sm:text-xl md:text-2xl font-light transition-transform duration-300 group-hover:translate-x-1.5 text-[#D4A843]"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM HUD */}
        <div className="relative z-25 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-3 sm:pb-6 flex items-center justify-between gap-4 sm:gap-6">
          <span className="font-mono text-[8.5px] sm:text-[9.5px] md:text-[10px] tracking-[0.24em] text-[#050505]/50 shrink-0 uppercase">
            35MM CONTACT SHEET
          </span>
          <div className="relative flex-1 h-[1.5px] bg-[#050505]/10 overflow-hidden rounded-full max-w-md">
            <div
              ref={progressBarFillRef}
              className="absolute inset-0 bg-[#D4A843] origin-left scale-x-0"
            />
          </div>
          <Link
            href="/activities"
            className="font-mono text-[8.5px] sm:text-[9.5px] md:text-[10px] tracking-[0.24em] text-[#D4A843] hover:text-[#050505] transition-colors shrink-0 uppercase min-h-[44px] flex items-center touch-manipulation"
          >
            ARCHIVE INDEX →
          </Link>
        </div>

        {/* CIRCULAR APERTURE WIPE DIRECTLY HANDING OFF TO SCENE 5 */}
        <div
          ref={darkroomIrisRef}
          className="absolute inset-0 z-40 bg-[#060608] pointer-events-none"
          style={{ clipPath: "circle(0% at 50% 50%)" }}
        />
      </div>
    </section>
  );
}