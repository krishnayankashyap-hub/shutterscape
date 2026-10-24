// src/app/about/page.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroller from "@/components/cinematic/SmoothScroller";
import ClubFooter from "@/components/cinematic/ClubFooter";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// DATA PAYLOADS
// ==========================================
const MENTORS = [
  {
    name: "Dr. Sangeeta Das",
    role: "Coordinator",
    dept: "Dept. of Mechanical Engineering",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Dr. Barsha Chhetri",
    role: "Co-Coordinator",
    dept: "Assistant Professor & Head (i/c) Dept. of Education",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
];

const LEADS = [
  {
    name: "Uttama Purkayastha",
    role: "PRESIDENT",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Ikhyt De Neog",
    role: "VICE-PRESIDENT",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Richita Sarma",
    role: "SECRETARY",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
  },
];

const CORE_MEMBERS = [
  { name: "Sohaib Hussain", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
  { name: "Mahadananda Dutta", img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600&auto=format&fit=crop" },
  { name: "Manash Pratim Sarma", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" },
  { name: "Mubina Ahmed", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" },
  { name: "Pratyush B. Choudhury", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop" },
  { name: "Hiya Das", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop" },
];

const FOUNDERS = [
  { name: "Dheemaan Deka", img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=800&auto=format&fit=crop" },
  { name: "Subhrajyoti Goswami", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" },
];

const LEGACY = [
  { name: "Gargi Medhi", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" },
  { name: "Dheemaan Deka", img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=600&auto=format&fit=crop" },
  { name: "Imran Farhat", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
  { name: "Subhrajyoti Goswami", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" },
];

interface CategoryItem {
  id: string;
  code: string;
  title: string;
  label: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: "origins", code: "01", title: "ORIGINS", label: "heroStart" },
  { id: "mentors", code: "02", title: "THE TEACHERS", label: "mentorsStart" },
  { id: "leads", code: "03", title: "BEHIND THE LENS", label: "leadsStart" },
  { id: "core", code: "04", title: "CORE MEMBERS", label: "coreStart" },
  { id: "founders", code: "05", title: "WHERE IT ALL STARTED", label: "foundersStart" },
  { id: "legacy", code: "06", title: "CARRYING IT FORWARD", label: "legacyStart" },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [activeCategory, setActiveCategory] = useState("origins");
  const [mentors, setMentors] = useState(MENTORS);
  const [leads, setLeads] = useState(LEADS);
  const [coreMembers, setCoreMembers] = useState(CORE_MEMBERS);
  const [founders, setFounders] = useState(FOUNDERS);
  const [legacy, setLegacy] = useState(LEGACY);

  useEffect(() => {
    fetch("/api/committee")
      .then((r) => r.json())
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const m = res.data.filter((it: any) => it.tier === "MENTOR");
          const l = res.data.filter((it: any) => it.tier === "LEAD");
          const c = res.data.filter((it: any) => it.tier === "CORE");
          const f = res.data.filter((it: any) => it.tier === "FOUNDER");
          const leg = res.data.filter((it: any) => it.tier === "LEGACY");
          if (m.length > 0) setMentors(m);
          if (l.length > 0) setLeads(l);
          if (c.length > 0) setCoreMembers(c);
          if (f.length > 0) setFounders(f);
          if (leg.length > 0) setLegacy(leg);
        }
      })
      .catch(() => {});
  }, []);

  // Always start at top of about chapter tunnel (prevent retaining previous page scroll offset)
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: number, options?: { immediate?: boolean }) => void };
      }
    ).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  // Jump to specific chapter section on the master timeline
  const jumpToSection = useCallback((label: string) => {
    const tl = tlRef.current;
    if (!tl || !containerRef.current) return;
    const st = tl.scrollTrigger;
    if (!st) return;

    const labelTime = tl.labels[label] ?? 0;
    const totalDuration = tl.duration();
    const progress = totalDuration > 0 ? labelTime / totalDuration : 0;
    const targetScroll = st.start + progress * (st.end - st.start);

    const lenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (target: number, options?: { duration?: number }) => void;
        };
      }
    ).__lenis;

    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, []);

  // GSAP MATCHMEDIA FORKING (RULE 2: ZERO DESKTOP TAMPERING)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    // ========================================================
    // DESKTOP LANE: (min-width: 1024px) - 100% UNTOUCHED CINEMATIC MASTER TUNNEL
    // ========================================================
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=5200",
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tlRef.current = tl;

      // Real-time active category tracker
      tl.eventCallback("onUpdate", () => {
        const prog = tl.progress();
        if (prog < 0.16) {
          setActiveCategory("origins");
        } else if (prog < 0.32) {
          setActiveCategory("mentors");
        } else if (prog < 0.50) {
          setActiveCategory("leads");
        } else if (prog < 0.70) {
          setActiveCategory("core");
        } else if (prog < 0.86) {
          setActiveCategory("founders");
        } else {
          setActiveCategory("legacy");
        }
      });

      // Subtle parallax scale for the low-brightness campus background
      tl.to(".campus-bg-image", { scale: 1.18, duration: 18, ease: "none" }, 0);

      // Mouse scroll guide fades out early
      tl.to(".hero-scroll-guide", { opacity: 0, y: 15, duration: 0.8, ease: "power2.out" }, 0);

      // SEQUENCE 1: HERO DIVE & ZOOMOUT SPLIT REVEAL
      tl.addLabel("heroStart", 0);
      tl.to(".hero-word-shutter", { scale: 24, y: "-32vh", opacity: 0, duration: 2.4, ease: "power2.inOut" }, "heroStart");
      tl.to(".hero-word-scape", { scale: 24, y: "32vh", opacity: 0, duration: 2.4, ease: "power2.inOut" }, "heroStart");
      tl.fromTo(".hero-hidden-text", { opacity: 0, scale: 0.8, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: "power2.out" }, "heroStart+=0.8");
      tl.to(".hero-hidden-text", { opacity: 0, scale: 1.15, y: -45, duration: 1.2, ease: "power2.in" }, "heroStart+=3.4");

      // SEQUENCE 2: MENTORS FOCUS PULL
      tl.addLabel("mentorsStart", "heroStart+=4.2");
      tl.fromTo(
        ".ch-2-mentors",
        { display: "none", opacity: 0, scale: 0.85, x: -40, y: 50, rotateY: 6, filter: "blur(22px)" },
        { display: "flex", opacity: 1, scale: 1, x: 0, y: 0, rotateY: 0, filter: "blur(0px)", duration: 2, ease: "power3.out" },
        "mentorsStart"
      );
      tl.to(".ch-2-mentors", { opacity: 0, scale: 1.15, x: 30, y: -40, rotateY: -4, filter: "blur(14px)", duration: 1.5, ease: "power2.in" }, "mentorsStart+=3");
      tl.set(".ch-2-mentors", { display: "none" });

      // SEQUENCE 3: LEADS VIEWFINDER
      tl.addLabel("leadsStart", "mentorsStart+=4.2");
      tl.fromTo(
        ".ch-3-leads",
        { display: "none", opacity: 0, scale: 0.9, x: 40, y: -40, rotateX: -6 },
        { display: "flex", opacity: 1, scale: 1, x: 0, y: 0, rotateX: 0, duration: 1.8, ease: "power3.out" },
        "leadsStart"
      );
      tl.to(".ch-3-leads", { opacity: 0, scale: 1.18, y: -30, duration: 1.4, ease: "power2.in" }, "leadsStart+=3");
      tl.set(".ch-3-leads", { display: "none" });

      // SEQUENCE 4: CORE MEMBERS
      tl.addLabel("coreStart", "leadsStart+=3.8");
      tl.fromTo(".ch-4-core", { display: "none", opacity: 0, y: "15vh", scale: 0.96 }, { display: "flex", opacity: 1, y: "0vh", scale: 1, duration: 1.6, ease: "power3.out" }, "coreStart+=0.3");
      tl.fromTo(".core-row-1", { x: 15 }, { x: -8, duration: 3.2, ease: "none" }, "coreStart+=0.3");
      tl.fromTo(".core-row-2", { x: -15 }, { x: 8, duration: 3.2, ease: "none" }, "coreStart+=0.3");
      tl.to(".ch-4-core", { opacity: 0, y: "-15vh", scale: 0.96, duration: 1.3, ease: "power2.in" }, "coreStart+=3.2");
      tl.set(".ch-4-core", { display: "none" });

      // SEQUENCE 5: FOUNDERS WIPE
      tl.addLabel("foundersStart", "coreStart+=4.2");
      tl.fromTo(".ch-5-founders", { display: "none", opacity: 0, scale: 0.9, y: 30 }, { display: "flex", opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power2.out" }, "foundersStart+=0.3");
      gsap.utils.toArray<HTMLElement>(".darkroom-wipe").forEach((el) => {
        tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power3.inOut" }, "foundersStart+=0.6");
      });
      tl.to(".ch-5-founders", { opacity: 0, scale: 1.08, duration: 1.3, ease: "power2.in" }, "foundersStart+=3.2");
      tl.set(".ch-5-founders", { display: "none" });

      // SEQUENCE 6: LEGACY HORIZONTAL PAN
      tl.addLabel("legacyStart", "foundersStart+=4.2");
      tl.fromTo(".ch-6-legacy", { display: "none", opacity: 0, y: 25 }, { display: "flex", opacity: 1, y: 0, duration: 1.3, ease: "power2.out" }, "legacyStart");
      const calcSlideDistance = () => {
        if (!trackRef.current) return -800;
        const totalW = trackRef.current.scrollWidth;
        const viewW = window.innerWidth;
        return -(totalW - viewW + 60);
      };
      tl.to(trackRef.current, { x: calcSlideDistance, duration: 4.8, ease: "none" }, "legacyStart+=0.5");
    });

    // ========================================================
    // MOBILE LANE: (max-width: 1023px) - ISOLATED TOUCH-FRIENDLY TIMELINE (ZERO OVERFLOW, ZERO OVERLAPPING)
    // ========================================================
    mm.add("(max-width: 1023px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=3200",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      tlRef.current = tl;

      // Real-time active category tracker
      tl.eventCallback("onUpdate", () => {
        const prog = tl.progress();
        if (prog < 0.16) {
          setActiveCategory("origins");
        } else if (prog < 0.32) {
          setActiveCategory("mentors");
        } else if (prog < 0.50) {
          setActiveCategory("leads");
        } else if (prog < 0.70) {
          setActiveCategory("core");
        } else if (prog < 0.86) {
          setActiveCategory("founders");
        } else {
          setActiveCategory("legacy");
        }
      });

      tl.to(".hero-scroll-guide", { opacity: 0, duration: 0.4 }, 0);

      // Mobile Sequence 1: Hero Dive (Clean, proportional scale without breaking viewport)
      tl.addLabel("heroStart", 0);
      tl.to(".hero-word-shutter", { scale: 4.5, y: "-18vh", opacity: 0, duration: 1.6, ease: "power1.inOut" }, "heroStart");
      tl.to(".hero-word-scape", { scale: 4.5, y: "18vh", opacity: 0, duration: 1.6, ease: "power1.inOut" }, "heroStart");
      tl.fromTo(".hero-hidden-text", { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power2.out" }, "heroStart+=0.6");
      tl.to(".hero-hidden-text", { opacity: 0, y: -30, duration: 0.8, ease: "power2.in" }, "heroStart+=2.2");

      // Mobile Sequence 2: Mentors (Clean vertical appearance, zero opposing parallax collision)
      tl.addLabel("mentorsStart", "heroStart+=2.8");
      tl.fromTo(".ch-2-mentors", { display: "none", opacity: 0, y: 30 }, { display: "flex", opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, "mentorsStart");
      tl.to(".ch-2-mentors", { opacity: 0, y: -30, duration: 0.8, ease: "power2.in" }, "mentorsStart+=2.0");
      tl.set(".ch-2-mentors", { display: "none" });

      // Mobile Sequence 3: Leads (Clean vertical appearance, zero opposing X/Y collisions)
      tl.addLabel("leadsStart", "mentorsStart+=2.6");
      tl.fromTo(".ch-3-leads", { display: "none", opacity: 0, y: 30 }, { display: "flex", opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, "leadsStart");
      tl.to(".ch-3-leads", { opacity: 0, y: -30, duration: 0.8, ease: "power2.in" }, "leadsStart+=2.0");
      tl.set(".ch-3-leads", { display: "none" });

      // Mobile Sequence 4: Core Members (No opposing x-axis translations, clean vertical entry)
      tl.addLabel("coreStart", "leadsStart+=2.6");
      tl.fromTo(".ch-4-core", { display: "none", opacity: 0, y: 30 }, { display: "flex", opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, "coreStart");
      tl.to(".ch-4-core", { opacity: 0, y: -30, duration: 0.8, ease: "power2.in" }, "coreStart+=2.0");
      tl.set(".ch-4-core", { display: "none" });

      // Mobile Sequence 5: Founders
      tl.addLabel("foundersStart", "coreStart+=2.6");
      tl.fromTo(".ch-5-founders", { display: "none", opacity: 0, y: 30 }, { display: "flex", opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, "foundersStart");
      tl.to(".ch-5-founders", { opacity: 0, y: -30, duration: 0.8, ease: "power2.in" }, "foundersStart+=2.0");
      tl.set(".ch-5-founders", { display: "none" });

      // Mobile Sequence 6: Legacy
      tl.addLabel("legacyStart", "foundersStart+=2.6");
      tl.fromTo(".ch-6-legacy", { display: "none", opacity: 0, y: 20 }, { display: "flex", opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "legacyStart");
      const calcMobileSlide = () => {
        if (!trackRef.current) return -400;
        const totalW = trackRef.current.scrollWidth;
        const viewW = window.innerWidth;
        return -(totalW - viewW + 24);
      };
      tl.to(trackRef.current, { x: calcMobileSlide, duration: 2.5, ease: "none" }, "legacyStart+=0.3");
    });

    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, []);

  return (
    <SmoothScroller>
      {/* RULE 3: ELIMINATE ALL HORIZONTAL OVERFLOW */}
      <main className="relative w-full max-w-[100vw] bg-[#050505] text-[#FAFAFA] selection:bg-[#D4A843] selection:text-black overflow-x-clip">
        
        {/* Cinematic Grain Overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.04] mix-blend-screen"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
        />

        {/* ============================================================
            BACK TO OUR STORY (Discover Our Story) BUTTON - FRAMELESS & BORDERLESS
            ============================================================ */}
        <Link
          href="/#scene-about-showcase"
          className="group fixed top-28 md:top-6 left-4 md:left-8 z-[9990] pointer-events-auto inline-flex items-center gap-2 py-2 px-1 font-mono text-[9.5px] sm:text-[11px] uppercase tracking-[0.22em] font-bold text-[#D4A843] hover:text-white transition-colors duration-300 bg-transparent border-0 shadow-none rounded-none focus-visible:outline-2 focus-visible:outline-[#D4A843] focus-visible:outline-offset-4"
          title="Back to Discover Our Story"
          aria-label="Back to Discover Our Story"
        >
          <span className="text-sm font-light transition-transform duration-300 group-hover:-translate-x-1.5 text-[#D4A843]">←</span>
          <span className="hidden sm:inline whitespace-nowrap transition-colors duration-300">BACK TO OUR STORY</span>
          <span className="sm:hidden whitespace-nowrap transition-colors duration-300">BACK</span>
        </Link>

        {/* =========================================================
            CLEAN MINIMALIST CATEGORY TASKBAR (Desktop Right Dock)
            ========================================================= */}
        <aside
          aria-label="Story Chapter Navigation"
          className="fixed right-6 sm:right-8 lg:right-10 top-1/2 -translate-y-1/2 z-[9970] hidden xl:flex flex-col items-end gap-3 select-none pointer-events-auto"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => jumpToSection(cat.label)}
                className="group flex items-center justify-end gap-3 py-1 cursor-pointer transition-all duration-300 bg-transparent border-0 outline-none"
                aria-label={`Jump to ${cat.title}`}
              >
                <span
                  className={`font-mono text-[9.5px] tracking-[0.2em] uppercase transition-all duration-300 ${
                    isActive
                      ? "text-white font-semibold opacity-100"
                      : "text-white/40 font-normal group-hover:text-white/80"
                  }`}
                >
                  {cat.title}
                </span>
                
                <span
                  className={`font-mono text-[9px] tracking-wider transition-colors duration-300 ${
                    isActive ? "text-[#D4A843] font-bold" : "text-white/30 group-hover:text-white/60"
                  }`}
                >
                  {cat.code}
                </span>

                {/* Subtle active line indicator */}
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? "w-4 h-[2px] bg-[#D4A843] opacity-100"
                      : "w-1.5 h-[1.5px] bg-white/25 opacity-60 group-hover:w-2.5 group-hover:bg-white/60"
                  }`}
                />
              </button>
            );
          })}
        </aside>

        {/* Mobile Minimal Chapter Indicator (Frameless, clean) */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9970] xl:hidden flex items-center gap-2 select-none pointer-events-none">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4A843] animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/80 font-bold">
            {CATEGORIES.find((c) => c.id === activeCategory)?.title || "ORIGINS"}
          </span>
        </div>

        {/* =========================================================
            MASTER CONTINUOUS TUNNEL CONTAINER
            ========================================================= */}
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
          
          {/* Constant Darkroom Base Layer */}
          <div className="master-bg absolute inset-0 z-0 bg-[#050505] pointer-events-none" />

          {/* =========================================================
              CAMPUS BACKGROUND (Simple Low Brightness, Constantly Visible)
              ========================================================= */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="campus-bg-image absolute inset-0 will-change-transform">
              <Image
                src="/images/gcu-campus-sketch.jpg"
                alt="GCU Campus Background"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center opacity-30 brightness-[0.50] contrast-[1.15] will-change-transform"
              />
            </div>

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(5,5,5,0.40) 0%, rgba(5,5,5,0.88) 100%)",
              }}
            />
          </div>

          {/* =========================================================
              ANIMATED MOUSE SCROLL GUIDE (Floating at bottom center)
              ========================================================= */}
          <div className="hero-scroll-guide absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none select-none will-change-transform">
            <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-full border border-white/35 flex justify-center pt-1.5 shadow-lg bg-black/40 backdrop-blur-xs">
              <div className="w-1 h-2 sm:h-2.5 bg-[#D4A843] rounded-full animate-bounce" />
            </div>
            <span className="font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.3em] uppercase text-white/50 font-medium">
              SCROLL TO DIVE
            </span>
          </div>

          {/* ---------------------------------------------------------
              CHAPTER 1: THE HERO DIVE WITH STACKED "shutter" / "scape."
              RULE 4: TAMED MASSIVE TYPOGRAPHY
              --------------------------------------------------------- */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4 overflow-hidden">
            <div className="hero-massive-text flex flex-col items-center justify-center text-center select-none will-change-transform z-20">
              <span className="hero-word-shutter font-heading text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-black tracking-[-0.04em] text-white lowercase leading-[0.85] md:leading-[0.82] will-change-transform">
                shutter
              </span>
              <span className="hero-word-scape font-heading text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-light tracking-[-0.02em] text-white/95 lowercase leading-[0.85] md:leading-[0.82] -mt-1 sm:-mt-3 md:-mt-5 will-change-transform">
                scape<span className="text-[#D4A843]">.</span>
              </span>
            </div>

            {/* Club description */}
            <div className="hero-hidden-text absolute flex flex-col items-center text-center max-w-3xl px-4 sm:px-6 opacity-0 will-change-transform z-10">
              <span className="font-mono text-[9px] sm:text-[11px] md:text-[13px] tracking-[0.45em] text-[#D4A843] uppercase font-bold mb-3 md:mb-4">
                CHAPTER 01 // ORIGINS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-white mb-3 sm:mb-5 leading-tight">
                More than just <br /><span className="text-[#D4A843] font-normal not-italic">a camera club.</span>
              </h2>
              <div className="w-10 sm:w-14 h-[2px] bg-[#D4A843] mb-4 sm:mb-6" />
              <p className="font-body text-xs sm:text-base md:text-lg font-light leading-relaxed text-[#FAFAFA]/90 mb-2 sm:mb-3 max-w-2xl">
                Shutterscape is the photography club of Girijananda Chowdhury University, created for students who love to observe, capture and tell stories through photographs.
              </p>
              <p className="font-body text-[11px] sm:text-sm md:text-base font-light leading-relaxed text-[#FAFAFA]/70 max-w-2xl">
                Whether you are a professional photographer or someone who simply loves clicking pictures on your phone — <span className="text-[#D4A843] font-medium">there’s a place for you here.</span>
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------------
              CHAPTER 2: MENTORS
              RULE 1 & 5: ZERO OVERLAP, MOBILE CLEAN STACK
              --------------------------------------------------------- */}
          <div className="ch-2-mentors absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 opacity-0 pointer-events-none will-change-transform">
            <div className="text-center mb-5 sm:mb-8 md:mb-12">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#D4A843] uppercase mb-1 sm:mb-2 block font-semibold">
                CHAPTER 02 // MENTORS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl uppercase tracking-widest text-white/30 leading-none">
                The Teachers Who <span className="text-white font-normal">Guide Us</span>
              </h2>
            </div>

            <div className="flex flex-row justify-center items-center gap-4 sm:gap-10 md:gap-20 w-full max-w-4xl mx-auto">
              {mentors.map((mentor, idx) => (
                <div key={idx} className="flex flex-col items-center w-[46%] sm:w-[42%] max-w-[280px] md:max-w-[300px]">
                  {/* Museum Frame */}
                  <div className="relative w-full aspect-[3/4] max-h-[160px] sm:max-h-[240px] md:max-h-none bg-[#0A0A0D] p-2 sm:p-3 rounded-md border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                    <div className="relative w-full h-full overflow-hidden rounded-sm border border-white/10">
                      <Image
                        src={mentor.img}
                        alt={mentor.name}
                        fill
                        className="object-cover grayscale contrast-110"
                      />
                    </div>
                  </div>

                  {/* Name, Role & Dept OUTSIDE the frame down below */}
                  <div className="mt-2.5 sm:mt-4 text-center">
                    <p className="font-mono text-[8px] sm:text-[9px] tracking-widest text-[#D4A843] uppercase font-bold mb-0.5 sm:mb-1">
                      {mentor.role}
                    </p>
                    <h3 className="font-heading font-bold text-xs sm:text-lg md:text-xl text-white">
                      {mentor.name}
                    </h3>
                    <p className="font-body text-[10px] sm:text-xs text-white/60 mt-0.5 sm:mt-1 max-w-[200px] sm:max-w-[240px] mx-auto line-clamp-2">
                      {mentor.dept}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------
              CHAPTER 3: LEADS (Viewfinder Reticle + Names Outside Down)
              RULE 1 & 5: CLEAN COMPACT VIEWPORT RATIOS ON MOBILE
              --------------------------------------------------------- */}
          <div className="ch-3-leads absolute inset-0 z-30 flex flex-col items-center justify-center px-3 sm:px-6 opacity-0 pointer-events-none will-change-transform">
            <div className="text-center mb-5 sm:mb-8 md:mb-12">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#D4A843] uppercase mb-1 sm:mb-2 block font-semibold">
                CHAPTER 03 // LEADERSHIP
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl uppercase tracking-widest text-white leading-none">
                Behind The Lens
              </h2>
            </div>

            <div className="flex flex-row justify-center items-center gap-2.5 sm:gap-6 md:gap-12 w-full max-w-5xl mx-auto">
              {leads.map((lead, idx) => (
                <div key={idx} className="flex flex-col items-center w-[30%] max-w-[150px] sm:max-w-[220px] md:max-w-[270px]">
                  {/* Viewfinder Frame */}
                  <div className="relative w-full aspect-[3/4] max-h-[140px] sm:max-h-[220px] md:max-h-none bg-[#0A0A0D] p-1.5 sm:p-2.5 rounded-md border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
                    <div className="relative w-full h-full overflow-hidden rounded-sm">
                      <Image
                        src={lead.img}
                        alt={lead.name}
                        fill
                        className="object-cover grayscale contrast-125"
                      />
                    </div>

                    {/* Viewfinder crosshairs */}
                    <div className="absolute inset-2 sm:inset-4 pointer-events-none flex flex-col justify-between">
                      <div className="flex justify-between w-full">
                        <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 border-t-2 border-l-2 border-white/60" />
                        <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 border-t-2 border-r-2 border-white/60" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-10 sm:h-10 border border-white/25 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#EF4444] rounded-full animate-ping" />
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 border-b-2 border-l-2 border-white/60" />
                        <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 border-b-2 border-r-2 border-white/60" />
                      </div>
                    </div>
                  </div>

                  {/* Name and Role OUTSIDE the frame down below */}
                  <div className="mt-2.5 sm:mt-3.5 text-center">
                    <p className="font-mono text-[7px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.28em] text-[#D4A843] uppercase font-bold mb-0.5">
                      {lead.role}
                    </p>
                    <h3 className="font-heading font-bold text-[11px] sm:text-base md:text-lg text-white">
                      {lead.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------
              CHAPTER 4: CORE MEMBERS
              RULE 1 & 5: MOBILE COMPACT GRID, ZERO OPPOSING X TRANSLATION
              --------------------------------------------------------- */}
          <div className="ch-4-core absolute inset-0 z-40 flex flex-col items-center justify-center px-3 sm:px-8 opacity-0 pointer-events-none text-white will-change-transform">
            <div className="max-w-5xl mx-auto flex flex-col items-center w-full">
              
              {/* Clean Section Heading */}
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#D4A843] uppercase mb-1 sm:mb-1.5 block font-bold">
                  CHAPTER 04 // THE FOUNDATION
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl font-light uppercase tracking-tight text-white">
                  Core <span className="font-bold">Members.</span>
                </h2>
              </div>

              {/* Grid Rows: Clean on desktop & mobile */}
              <div className="w-full max-w-4xl flex flex-col gap-3 sm:gap-5 md:gap-7">
                
                {/* Row 1 */}
                <div className="core-row-1 grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-8 will-change-transform">
                  {coreMembers.slice(0, 3).map((member, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="relative w-full aspect-[4/5] max-h-[110px] sm:max-h-[180px] md:max-h-[225px] bg-[#0A0A0D] rounded-md overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.7)] border border-white/15">
                        <Image
                          src={member.img}
                          alt={member.name}
                          fill
                          className="object-cover object-top grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      
                      <div className="mt-1.5 sm:mt-2.5 text-center">
                        <h3 className="font-heading font-bold text-[10px] sm:text-xs md:text-base text-white tracking-tight">
                          {member.name}
                        </h3>
                        <p className="font-mono text-[7px] sm:text-[9px] tracking-[0.16em] md:tracking-[0.2em] text-[#D4A843] uppercase font-semibold mt-0.5">
                          Core Committee
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Row 2 */}
                <div className="core-row-2 grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-8 will-change-transform">
                  {coreMembers.slice(3, 6).map((member, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="relative w-full aspect-[4/5] max-h-[110px] sm:max-h-[180px] md:max-h-[225px] bg-[#0A0A0D] rounded-md overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.7)] border border-white/15">
                        <Image
                          src={member.img}
                          alt={member.name}
                          fill
                          className="object-cover object-top grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      
                      <div className="mt-1.5 sm:mt-2.5 text-center">
                        <h3 className="font-heading font-bold text-[10px] sm:text-xs md:text-base text-white tracking-tight">
                          {member.name}
                        </h3>
                        <p className="font-mono text-[7px] sm:text-[9px] tracking-[0.16em] md:tracking-[0.2em] text-[#D4A843] uppercase font-semibold mt-0.5">
                          Core Committee
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>

          {/* ---------------------------------------------------------
              CHAPTER 5: FOUNDERS (Darkroom Silver-Gelatin Wipe)
              --------------------------------------------------------- */}
          <div className="ch-5-founders absolute inset-0 z-50 flex flex-col items-center justify-center px-4 sm:px-6 opacity-0 pointer-events-none will-change-transform">
            <div className="max-w-[950px] w-full mx-auto text-center">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#D4A843] uppercase mb-1 sm:mb-2 block font-semibold">
                CHAPTER 05 // GENESIS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl uppercase tracking-widest text-white mb-5 sm:mb-8 md:mb-12">
                Where It All Started
              </h2>

              <div className="flex flex-row justify-center items-center gap-4 sm:gap-10 md:gap-20 w-full">
                {founders.map((founder, idx) => (
                  <div key={idx} className="flex flex-col items-center w-[46%] sm:w-[42%] max-w-[280px] md:max-w-[300px]">
                    <div className="relative w-full aspect-[3/4] max-h-[160px] sm:max-h-[240px] md:max-h-none bg-[#0A0A0D] p-2 sm:p-2.5 border border-[#D4A843]/30 shadow-[0_20px_50px_rgba(212,168,67,0.15)] rounded-sm">
                      <div className="darkroom-wipe relative w-full h-full overflow-hidden will-change-transform rounded-sm">
                        <div className="absolute inset-0 z-10 bg-[#D4A843]/20 mix-blend-color pointer-events-none" />
                        <Image
                          src={founder.img}
                          alt={founder.name}
                          fill
                          className="object-cover grayscale contrast-[1.2]"
                        />
                      </div>
                    </div>

                    <div className="mt-2.5 sm:mt-4 text-center">
                      <p className="font-mono text-[8px] sm:text-[9px] tracking-widest text-[#D4A843] uppercase font-bold mb-0.5 sm:mb-1">
                        2023 // Co-Founder
                      </p>
                      <h3 className="font-heading font-bold text-xs sm:text-lg md:text-xl text-white">
                        {founder.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------
              CHAPTER 6: LEGACY
              --------------------------------------------------------- */}
          <div className="ch-6-legacy absolute inset-0 z-60 flex flex-col justify-center opacity-0 pointer-events-none overflow-hidden will-change-transform">
            
            <div className="absolute top-12 sm:top-16 md:top-24 left-4 sm:left-12 md:left-20 z-20">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#D4A843] uppercase mb-1 block font-semibold">
                CHAPTER 06 // LEGACY
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl text-white italic">
                Carrying it forward.
              </h2>
            </div>

            {/* Gallery horizontal track */}
            <div
              ref={trackRef}
              className="flex items-center mt-12 sm:mt-14 pl-6 sm:pl-[12vw] md:pl-[20vw] gap-4 sm:gap-8 md:gap-16 w-fit will-change-transform"
            >
              {legacy.map((person, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center flex-shrink-0 w-[160px] sm:w-[240px] md:w-[320px]"
                >
                  <div className="relative w-full aspect-[3/4] max-h-[200px] sm:max-h-[260px] md:max-h-none bg-[#0A0A0D] p-2 sm:p-3 rounded-md border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                    <div className="relative w-full h-full overflow-hidden rounded-sm border border-white/10">
                      <Image
                        src={person.img}
                        alt={person.name}
                        fill
                        className="object-cover opacity-90 grayscale contrast-110"
                      />
                    </div>
                  </div>

                  <div className="mt-2.5 sm:mt-3.5 text-center">
                    <h3 className="font-heading font-bold text-xs sm:text-base md:text-lg text-white tracking-wide">
                      {person.name}
                    </h3>
                    <p className="font-mono text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#D4A843] uppercase font-bold mt-0.5 sm:mt-1">
                      Legacy Torchbearer
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* =========================================================
            FOOTER: Unified Club Footer
            ========================================================= */}
        <ClubFooter variant="dark" />
      </main>
    </SmoothScroller>
  );
}
