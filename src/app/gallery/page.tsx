// src/app/gallery/page.tsx
"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroller from "@/components/cinematic/SmoothScroller";
import ClubFooter from "@/components/cinematic/ClubFooter";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 25-IMAGE EXPANDED PREMIUM PAYLOAD
// ==========================================
interface GalleryItem {
  id: string;
  title: string;
  category:
    | "DOCUMENTARY"
    | "PORTRAITURE"
    | "LANDSCAPE"
    | "ARCHITECTURE"
    | "STREET"
    | "EXPERIMENTAL";
  photographer: string;
  filmStock: string;
  exif: string;
  src: string;
  description: string;
  location: string;
}

const GALLERY_COLLECTION: GalleryItem[] = [
  { id: "g-01", title: "Monsoon Over Brahmaputra", category: "DOCUMENTARY", photographer: "Riky", location: "Brahmaputra Riverfront", filmStock: "KODAK TRI-X 400", exif: "35MM · F/2.0", src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&q=80", description: "Golden-hour riverfront documentation capturing ferry silhouettes." },
  { id: "g-02", title: "Chiaroscuro Gaze", category: "PORTRAITURE", photographer: "Pratyashi P. Das", location: "GCU Studio Lab", filmStock: "KODAK PORTRA 800", exif: "85MM · F/1.4", src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1000&q=80", description: "High-contrast Xenon strobe portrait exploring deep tonal gradients." },
  { id: "g-03", title: "Himalayan Alpenglow", category: "LANDSCAPE", photographer: "Akash Boro", location: "Eastern Himalayan Ridge", filmStock: "FUJIFILM VELVIA 50", exif: "70MM · F/4.0", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80", description: "Dawn mountain exposure capturing atmospheric cloud compression." },
  { id: "g-04", title: "Brutalist Geometry", category: "ARCHITECTURE", photographer: "Aparna Mishra", location: "GCU Campus Complex", filmStock: "ILFORD HP5 PLUS", exif: "24MM · F/8.0", src: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1000&q=80", description: "Monochrome architectural study dissecting concrete planes." },
  { id: "g-05", title: "Midnight Neon Drift", category: "STREET", photographer: "Tiku Sarkar", location: "Paltan Bazaar By-lanes", filmStock: "CINESTILL 800T", exif: "50MM · F/1.4", src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&q=80", description: "Ambient night capture harnessing the red halation of Cinestill." },
  { id: "g-06", title: "Optics & Refraction", category: "EXPERIMENTAL", photographer: "Bituparna", location: "GCU Optics Clinic", filmStock: "KODAK EKTAR 100", exif: "105MM · F/2.8", src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&q=80", description: "Extreme close-up examining manual lens aperture blades." },
  { id: "g-07", title: "Silent Peaks At Dawn", category: "LANDSCAPE", photographer: "Arjun Talukdar", location: "Kamrup Foothills", filmStock: "FUJIFILM PROVIA 100F", exif: "85MM · F/1.4", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=80", description: "Minimalist alpine silhouette at first light with atmospheric haze." },
  { id: "g-08", title: "Golden Horizon Ferry", category: "DOCUMENTARY", photographer: "Priyanka Kalita", location: "Umananda Ghat", filmStock: "KODAK GOLD 200", exif: "35MM · F/2.0", src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1000&q=80", description: "Commuters boarding the wooden river ferry in golden twilight." },
  { id: "g-09", title: "Urban Solitude", category: "STREET", photographer: "Nayan Jyoti", location: "Panbazar Commercial Zone", filmStock: "ILFORD DELTA 3200", exif: "50MM · F/1.8", src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=85", description: "Quiet contemplative moment amidst evening monsoon traffic." },
  { id: "g-10", title: "Studio Xenon Strobe", category: "PORTRAITURE", photographer: "Meghna Barman", location: "GCU Creative Studio", filmStock: "KODAK PORTRA 400", exif: "85MM · F/2.8", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&q=80", description: "Crisp architectural studio portrait with razor-sharp catchlights." },
  { id: "g-11", title: "Cantilever Shadows", category: "ARCHITECTURE", photographer: "Debashish Roy", location: "GCU Auditorium Wing", filmStock: "KODAK TRI-X 400", exif: "28MM · F/11", src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&q=80", description: "Geometric play of shadow and light dissecting the concrete louvers." },
  { id: "g-12", title: "Lens Flare Dispersion", category: "EXPERIMENTAL", photographer: "Kunal Saikia", location: "Darkroom Studio 02", filmStock: "CINESTILL 50D", exif: "50MM · F/1.2", src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&q=80", description: "Prismatic spectral dispersion captured with an uncoated prime lens." },
  { id: "g-13", title: "The Tea Garden Mist", category: "LANDSCAPE", photographer: "Manash Pratim", location: "Upper Assam Estates", filmStock: "FUJIFILM VELVIA 50", exif: "24MM · F/5.6", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1000&q=80", description: "Rolling emerald hills of the tea estates caught in the fog." },
  { id: "g-14", title: "Festival of Colors", category: "DOCUMENTARY", photographer: "Sohaib Hussain", location: "GCU Main Courtyard", filmStock: "KODAK EKTAR 100", exif: "35MM · F/2.8", src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1000&q=80", description: "Vibrant explosion of gulal captured at high shutter speeds." },
  { id: "g-15", title: "Symmetry in Motion", category: "ARCHITECTURE", photographer: "Hiya Das", location: "Library Spiral Staircase", filmStock: "ILFORD HP5 PLUS", exif: "16MM · F/4.0", src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1000&q=80", description: "A vertiginous top-down perspective of the brutalist spiral staircase." },
  { id: "g-16", title: "Midnight Rain Reflections", category: "STREET", photographer: "Imran Farhat", location: "GS Road, Guwahati", filmStock: "CINESTILL 800T", exif: "50MM · F/1.4", src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1000&q=80", description: "Cinematic puddle reflection capturing headlights and neon signs." },
  { id: "g-17", title: "Analog Chemistry", category: "EXPERIMENTAL", photographer: "Rupankar", location: "Darkroom Studio 01", filmStock: "ILFORD MULTIGRADE", exif: "50MM · F/4.0", src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&q=80", description: "Silver particles developing in fixer under safe-light red." },
  { id: "g-18", title: "Monsoon Silhouette", category: "PORTRAITURE", photographer: "Sneha Kalita", location: "GCU Campus Corridors", filmStock: "KODAK GOLD 200", exif: "50MM · F/2.0", src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1000&q=80", description: "A quiet moment framed by the brutalist campus architecture." },
  { id: "g-19", title: "Market Chaos", category: "DOCUMENTARY", photographer: "Riky", location: "Fancy Bazaar", filmStock: "KODAK PORTRA 400", exif: "35MM · F/5.6", src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1000&q=80", description: "The beautiful, overwhelming chaos of the Sunday morning market." },
  { id: "g-20", title: "Glacial Melt", category: "LANDSCAPE", photographer: "Akash Boro", location: "Tawang Valley", filmStock: "FUJIFILM PROVIA", exif: "16MM · F/8.0", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80", description: "High altitude rivers carving through the rocky moraine." },
  { id: "g-21", title: "Neon Rain", category: "STREET", photographer: "Tiku Sarkar", location: "Christian Basti", filmStock: "CINESTILL 800T", exif: "85MM · F/1.4", src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&q=80", description: "A lone figure illuminated by the glow of a pharmacy sign in the rain." },
  { id: "g-22", title: "Concrete Ribs", category: "ARCHITECTURE", photographer: "Debashish Roy", location: "Admin Block", filmStock: "ILFORD HP5 PLUS", exif: "24MM · F/8.0", src: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1000&q=80", description: "The skeletal structure of the unfinished new academic wing." },
  { id: "g-23", title: "Abstract Motion", category: "EXPERIMENTAL", photographer: "Bituparna", location: "Highway 37", filmStock: "KODAK EKTAR", exif: "50MM · 2S", src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&q=80", description: "Intentional camera movement (ICM) creating a canvas of light streaks." },
  { id: "g-24", title: "Valley of the Sun", category: "LANDSCAPE", photographer: "Arjun Talukdar", location: "Meghalaya Border", filmStock: "FUJIFILM VELVIA 50", exif: "35MM · F/11", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=80", description: "The sun piercing through the dense canopy of the living root bridges." },
  { id: "g-25", title: "Final Exposure", category: "DOCUMENTARY", photographer: "ShutterScape Archive", location: "Assam, India", filmStock: "VARIOUS EMULSIONS", exif: "VARIOUS", src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&q=80", description: "The culmination of a year of storytelling through the lens." },
];

const CATEGORIES = [
  "ALL",
  "DOCUMENTARY",
  "PORTRAITURE",
  "LANDSCAPE",
  "ARCHITECTURE",
  "STREET",
  "EXPERIMENTAL",
] as const;

// 10 hardware-accelerated cylindrical facets per frame
const SLICES_PER_CARD = 10;
const SLICE_INDICES = Array.from({ length: SLICES_PER_CARD }, (_, i) => i);

export default function CinematicGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isRibbonFocused, setIsRibbonFocused] = useState<boolean>(false);
  const [activeLightboxItem, setActiveLightboxItem] =
    useState<GalleryItem | null>(null);
  const [collection, setCollection] = useState<GalleryItem[]>(GALLERY_COLLECTION);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setCollection(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const stageRef = useRef<HTMLDivElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const ribbonStageRef = useRef<HTMLDivElement>(null);
  const captionWrapRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  // Store outer card refs and each card's cylindrical slice refs
  const cardOuterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sliceRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const sliceInnerRefs = useRef<(HTMLDivElement | null)[][]>([]);

  const filteredItems = useMemo(() => {
    return selectedCategory === "ALL"
      ? collection
      : collection.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, collection]);

  // Reset scroll to top helper
  const resetScrollToTop = useCallback(() => {
    if (typeof window === "undefined") return;
    const lenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (target: number, options?: { immediate?: boolean }) => void;
        };
      }
    ).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "scrollRestoration" in window.history
    ) {
      window.history.scrollRestoration = "manual";
    }
    resetScrollToTop();
  }, [resetScrollToTop]);

  const handleCategoryClick = useCallback(
    (cat: string) => {
      if (cat === selectedCategory) return;
      setActiveIndex(0);
      setIsRibbonFocused(false);
      resetScrollToTop();
      setSelectedCategory(cat);
    },
    [selectedCategory, resetScrollToTop]
  );

  // Smoothly scroll to a specific card on the 3D ribbon when clicking a left/right wing frame
  const scrollToFrameIndex = useCallback(
    (targetIdx: number) => {
      const st = stRef.current;
      if (!st || filteredItems.length === 0) return;
      const introEnd = 0.14;
      const maxIdx = Math.max(1, filteredItems.length - 1);
      const targetProgress =
        introEnd + (targetIdx / maxIdx) * (1 - introEnd);
      const targetScroll =
        st.start + targetProgress * (st.end - st.start);

      const lenis = (
        window as unknown as {
          __lenis?: {
            scrollTo: (
              target: number,
              options?: { immediate?: boolean; duration?: number }
            ) => void;
          };
        }
      ).__lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(targetScroll, { duration: 0.95 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    },
    [filteredItems.length]
  );

  // Lock background scroll when lightbox is open
  useEffect(() => {
    const lenis = (
      window as unknown as {
        __lenis?: { stop: () => void; start: () => void };
      }
    ).__lenis;

    if (activeLightboxItem) {
      if (lenis && typeof lenis.stop === "function") lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      if (lenis && typeof lenis.start === "function") lenis.start();
      document.body.style.overflow = "";
    }

    return () => {
      if (lenis && typeof lenis.start === "function") lenis.start();
      document.body.style.overflow = "";
    };
  }, [activeLightboxItem]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeLightboxItem) return;
      if (e.key === "Escape") setActiveLightboxItem(null);
      if (e.key === "ArrowRight") {
        const idx = filteredItems.findIndex(
          (it) => it.id === activeLightboxItem.id
        );
        const nextIdx = (idx + 1) % filteredItems.length;
        setActiveLightboxItem(filteredItems[nextIdx]);
      }
      if (e.key === "ArrowLeft") {
        const idx = filteredItems.findIndex(
          (it) => it.id === activeLightboxItem.id
        );
        const prevIdx =
          (idx - 1 + filteredItems.length) % filteredItems.length;
        setActiveLightboxItem(filteredItems[prevIdx]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxItem, filteredItems]);

  // =========================================================================
  // 120FPS ZERO-REFLOW 3D CONCAVE CYLINDRICAL RIBBON ENGINE
  // =========================================================================
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const easeInOut = gsap.parseEase("power2.inOut");
    const easeOut = gsap.parseEase("power2.out");
    const introEnd = 0.14;

    let lastActiveIdx = -1;
    let lastFocused = false;

    // Cached geometry metrics (computed ONLY on mount/resize, never during scroll)
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let isMobile = vw < 768;
    let cardW = 600;
    let cardH = 350;
    let stride = 634;
    let sliceW = 60;
    let cylRadius = 720;

    const setupStaticGeometry = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      isMobile = vw < 768;

      cardW = isMobile
        ? Math.min(290, vw * 0.74)
        : Math.min(500, Math.max(360, Math.min(vw * 0.36, vh * 0.55)));
      cardH = isMobile
        ? Math.min(205, vh * 0.3)
        : Math.min(310, Math.max(225, cardW * 0.62));
      const gap = isMobile ? 18 : 28;
      stride = cardW + gap;
      sliceW = cardW / SLICES_PER_CARD;

      cylRadius = isMobile
        ? Math.max(340, vw * 0.82)
        : Math.max(540, vw * 0.46);

      const total = filteredItems.length;
      for (let i = 0; i < total; i++) {
        const cardEl = cardOuterRefs.current[i];
        if (!cardEl) continue;

        cardEl.style.width = `${cardW}px`;
        cardEl.style.height = `${cardH}px`;
        cardEl.style.marginLeft = `${-cardW / 2}px`;
        cardEl.style.marginTop = `${-cardH / 2}px`;

        const cardSlices = sliceRefs.current[i] || [];
        const cardSliceInners = sliceInnerRefs.current[i] || [];

        for (let s = 0; s < SLICES_PER_CARD; s++) {
          const sliceEl = cardSlices[s];
          const innerEl = cardSliceInners[s];
          if (!sliceEl || !innerEl) continue;

          sliceEl.style.width = `${sliceW + 1.2}px`;
          sliceEl.style.height = `${cardH}px`;
          sliceEl.style.left = `${cardW / 2 - sliceW / 2}px`;

          innerEl.style.width = `${cardW}px`;
          innerEl.style.height = `${cardH}px`;
          innerEl.style.transform = `translate3d(${(-s * sliceW).toFixed(
            2
          )}px, 0, 0)`;
        }
      }
    };

    const renderRibbon = (progress: number) => {
      const total = filteredItems.length;

      // Phase 1 (0 -> introEnd): Hero lifts up while 3D ribbon rises into center stage
      const rawIntro = Math.min(1, Math.max(0, progress / introEnd));
      const introT = easeInOut(rawIntro);

      // Phase 2 (introEnd -> 1): Continuous horizontal progression along the 3D concave cylinder
      const ribbonProgress =
        progress <= introEnd
          ? 0
          : (progress - introEnd) / Math.max(0.0001, 1 - introEnd);
      const currentFloatIndex = ribbonProgress * Math.max(0, total - 1);

      const nearestIdx = Math.min(
        total - 1,
        Math.max(0, Math.round(currentFloatIndex))
      );
      if (nearestIdx !== lastActiveIdx) {
        lastActiveIdx = nearestIdx;
        setActiveIndex(nearestIdx);
      }

      const focusedNow = rawIntro > 0.65;
      if (focusedNow !== lastFocused) {
        lastFocused = focusedNow;
        setIsRibbonFocused(focusedNow);
      }

      // 1. Animate "VISUAL ARCHIVE." Hero
      if (heroWrapRef.current) {
        const heroY = -introT * (vh * 0.34);
        const heroScale = 1 - introT * 0.12;
        const heroOpacity = Math.max(0, 1 - rawIntro * 1.25);
        heroWrapRef.current.style.transform = `translate3d(0, ${heroY.toFixed(
          1
        )}px, 0) scale(${heroScale.toFixed(3)})`;
        heroWrapRef.current.style.opacity = `${heroOpacity.toFixed(3)}`;
      }

      // 2. Animate 3D Ribbon Stage vertical entrance
      if (ribbonStageRef.current) {
        const startOffsetY = isMobile ? vh * 0.34 : vh * 0.38;
        const currentStageY = (1 - introT) * startOffsetY;
        ribbonStageRef.current.style.transform = `translate3d(0, ${currentStageY.toFixed(
          1
        )}px, 0)`;
      }

      // 3. Animate Bottom Centered Caption & Counter
      if (captionWrapRef.current) {
        const capShow = easeOut(
          Math.min(1, Math.max(0, (rawIntro - 0.45) / 0.55))
        );
        captionWrapRef.current.style.opacity = `${capShow.toFixed(3)}`;
        captionWrapRef.current.style.transform = `translate3d(0, ${(
          (1 - capShow) *
          18
        ).toFixed(1)}px, 0)`;
      }

      // 4. Update ONLY GPU transforms for visible cards (zero layout writes)
      const curveFactor = 0.35 + 0.65 * introT;

      for (let i = 0; i < total; i++) {
        const cardEl = cardOuterRefs.current[i];
        if (!cardEl) continue;

        const deltaCards = i - currentFloatIndex;

        // Use visibility instead of display:none to prevent layout thrashing
        if (Math.abs(deltaCards) > 1.65) {
          if (cardEl.style.visibility !== "hidden") {
            cardEl.style.visibility = "hidden";
            cardEl.style.pointerEvents = "none";
          }
          continue;
        }

        if (cardEl.style.visibility !== "visible") {
          cardEl.style.visibility = "visible";
          cardEl.style.pointerEvents = "auto";
        }
        cardEl.style.zIndex = `${Math.round(100 - Math.abs(deltaCards) * 20)}`;

        const cardCenterX = deltaCards * stride;
        const cardSlices = sliceRefs.current[i] || [];

        for (let s = 0; s < SLICES_PER_CARD; s++) {
          const sliceEl = cardSlices[s];
          if (!sliceEl) continue;

          const localX = (s + 0.5) * sliceW - cardW / 2;
          const u = cardCenterX + localX;

          const rawPhi = u / cylRadius;
          const phi = Math.max(-1.38, Math.min(1.38, rawPhi));

          const cylX = cylRadius * Math.sin(phi);
          const cylZ = cylRadius * (1 - Math.cos(phi)) * curveFactor;
          const rotYDeg = -((phi * 180) / Math.PI) * curveFactor;

          sliceEl.style.transform = `translate3d(${cylX.toFixed(
            1
          )}px, 0px, ${cylZ.toFixed(1)}px) rotateY(${rotYDeg.toFixed(1)}deg)`;
        }
      }
    };

    setupStaticGeometry();
    renderRibbon(0);

    const totalScrollVh = Math.max(280, filteredItems.length * 48);

    const st = ScrollTrigger.create({
      trigger: stage,
      start: "top top",
      end: () => `+=${Math.round((window.innerHeight * totalScrollVh) / 100)}`,
      pin: true,
      scrub: 0.4,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        renderRibbon(self.progress);
      },
      onRefresh: (self) => {
        setupStaticGeometry();
        renderRibbon(self.progress);
      },
    });

    stRef.current = st;

    const handleResize = () => {
      setupStaticGeometry();
      renderRibbon(st.progress);
    };
    window.addEventListener("resize", handleResize);

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
      st.kill();
      stRef.current = null;
    };
  }, [filteredItems]);

  const currentItem = filteredItems[activeIndex] || filteredItems[0];

  return (
    <SmoothScroller>
      <main className="relative min-h-screen bg-white text-[#141413] selection:bg-[#141413] selection:text-white overflow-x-clip">
        {/* Subtle Paper Grain Texture */}
        <div
          className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.025] mix-blend-multiply"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />

        {/* ============================================================
            BACK TO EXHIBITION BUTTON - Lowered cleanly below global navbar
            ============================================================ */}
        <Link
          href="/#scene-exhibition"
          className="group fixed top-[114px] sm:top-[128px] md:top-[144px] left-4 md:left-8 z-[9990] pointer-events-auto inline-flex items-center gap-2 py-1.5 px-1 font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold text-[#141413] hover:text-[#D4A843] transition-colors duration-300 bg-transparent border-0 shadow-none"
          title="Back to Exhibition"
          aria-label="Back to Exhibition"
        >
          <span className="text-sm font-light transition-transform duration-300 group-hover:-translate-x-1.5 text-[#D4A843]">
            ←
          </span>
          <span className="hidden sm:inline whitespace-nowrap transition-colors duration-300">
            BACK TO EXHIBITION
          </span>
          <span className="sm:hidden whitespace-nowrap transition-colors duration-300">
            BACK
          </span>
        </Link>

        {/* ============================================================
            CLEAN, FRAMELESS, BORDERLESS & BOLD CATEGORY TASKBAR
            Moved further down (md:top-[144px]) so it never touches the navbar!
            ============================================================ */}
        <nav
          aria-label="Gallery Categories"
          className="fixed top-[64px] sm:top-[68px] md:top-[72px] left-1/2 -translate-x-1/2 z-[9970] pointer-events-auto select-none w-max max-w-[94vw] overflow-x-auto no-scrollbar flex items-center justify-start sm:justify-center gap-2 sm:gap-6 md:gap-9 py-1.5 px-3 sm:px-4"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className="group relative flex flex-col items-center justify-center min-h-[38px] min-w-[44px] py-1 px-2 sm:px-2.5 bg-transparent border-0 cursor-pointer outline-none transition-all duration-300 shrink-0 touch-manipulation"
                aria-label={`Filter by ${cat}`}
              >
                <span
                  className={`font-mono text-[11px] sm:text-[12.5px] md:text-[13.5px] tracking-[0.2em] sm:tracking-[0.24em] uppercase transition-all duration-300 whitespace-nowrap ${
                    isSelected
                      ? "text-[#141413] font-black scale-105"
                      : "text-[#141413]/55 hover:text-[#141413] font-bold"
                  }`}
                >
                  {cat}
                </span>

                <span
                  className={`absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#D4A843] rounded-full transition-all duration-300 origin-center ${
                    isSelected
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* ============================================================
            MASTER PINNED 100VH STAGE (HERO -> 3D CURVED RIBBON)
            ============================================================ */}
        <div
          ref={stageRef}
          className="relative w-full h-screen overflow-hidden select-none"
        >
          {/* ---------------------------------------------------------
              STAGE 1: THE "VISUAL ARCHIVE." HERO
              --------------------------------------------------------- */}
          <div
            ref={heroWrapRef}
            className="pointer-events-none absolute inset-x-0 top-[17vh] sm:top-[18vh] z-10 flex flex-col items-center justify-center px-6 will-change-transform"
          >
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.36em] uppercase text-[#B8860B] mb-2 font-bold">
              FEATURED EXHIBITION ARCHIVE
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[0.9] md:leading-[0.88] uppercase tracking-tighter text-[#141413] m-0 text-center w-full">
              Visual
              <br />
              <span className="text-[#D4A843] italic font-normal">
                Archive.
              </span>
            </h1>
            <p className="mt-3 sm:mt-4 max-w-lg font-body text-xs sm:text-sm text-[#141413]/70 text-center leading-relaxed">
              Scroll down to glide through the 3D panoramic filmstrip. Click any
              frame to launch the optical darkroom loupe.
            </p>
          </div>

          {/* ---------------------------------------------------------
              STAGE 2: 3D CONCAVE CYLINDRICAL CURVED RIBBON
              --------------------------------------------------------- */}
          <div
            ref={ribbonStageRef}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none will-change-transform"
            style={{
              perspective: "720px",
              perspectiveOrigin: "50% 50%",
              transformStyle: "preserve-3d",
            }}
          >
            {filteredItems.map((item, cardIdx) => {
              if (!sliceRefs.current[cardIdx]) {
                sliceRefs.current[cardIdx] = [];
              }
              if (!sliceInnerRefs.current[cardIdx]) {
                sliceInnerRefs.current[cardIdx] = [];
              }

              const isCenterCard = cardIdx === activeIndex;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardOuterRefs.current[cardIdx] = el;
                  }}
                  onClick={() => {
                    if (isRibbonFocused && cardIdx !== activeIndex) {
                      scrollToFrameIndex(cardIdx);
                    } else {
                      setActiveLightboxItem(item);
                    }
                  }}
                  className="absolute top-1/2 left-1/2 cursor-pointer pointer-events-auto group"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {SLICE_INDICES.map((s) => (
                    <div
                      key={s}
                      ref={(el) => {
                        sliceRefs.current[cardIdx][s] = el;
                      }}
                      className="absolute top-0 overflow-hidden will-change-transform"
                      style={{
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      {/* Full Card Content Layer — GPU background image avoids 250+ duplicate <img> nodes */}
                      <div
                        ref={(el) => {
                          sliceInnerRefs.current[cardIdx][s] = el;
                        }}
                        className="relative overflow-hidden rounded-[6px] bg-[#0B0B0E] border border-black/15 will-change-transform"
                        style={{
                          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 48%, rgba(0,0,0,0.28) 100%), url(${item.src})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        {/* Top-Left Category Stamp & Serial Code */}
                        <div className="absolute top-4 left-5 right-5 flex items-center justify-between pointer-events-none">
                          <span className="px-3 py-1 rounded bg-black/80 border border-white/20 font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#D4A843] font-semibold">
                            {item.category}
                          </span>
                          <span className="font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.22em] text-white/85 uppercase font-medium">
                            {item.filmStock}
                          </span>
                        </div>

                        {/* Poster Typography & Description inside the Frame */}
                        <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3 pointer-events-none">
                          <div className="max-w-[80%]">
                            <h2 className="font-serif text-xl sm:text-2xl md:text-[26px] text-white font-light leading-[1.05] tracking-tight">
                              {item.title}
                            </h2>
                            <p className="mt-1.5 font-body text-[11px] sm:text-xs text-white/85 font-normal leading-snug line-clamp-2">
                              {item.description}
                            </p>
                          </div>

                          <span
                            className={`shrink-0 px-4 py-1.5 rounded-full font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.2em] ${
                              isCenterCard
                                ? "bg-[#D4A843] text-[#050505] font-bold"
                                : "bg-black/70 text-white border border-white/25"
                            }`}
                          >
                            INSPECT ↗
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* ---------------------------------------------------------
              STAGE 3: LARGER, EASY-TO-READ BOTTOM CAPTION & SLIDE COUNTER
              --------------------------------------------------------- */}
          <div
            ref={captionWrapRef}
            style={{ opacity: 0 }}
            className="pointer-events-auto absolute bottom-4 sm:bottom-5 inset-x-0 z-30 flex flex-col items-center justify-center px-6 text-center will-change-transform"
          >
            {currentItem && (
              <>
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-[#141413] font-normal tracking-wide leading-tight">
                  {currentItem.title}
                </h3>

                <p className="mt-1 max-w-xl font-body text-xs sm:text-[13px] text-[#141413]/80 leading-relaxed font-normal">
                  {currentItem.description}
                </p>

                <p className="mt-1.5 font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#141413]/75 font-semibold">
                  {currentItem.category} · BY {currentItem.photographer} ·{" "}
                  <span className="text-[#B8860B] font-bold">
                    {currentItem.exif}
                  </span>
                </p>

                <div className="mt-2 flex items-center gap-5 font-mono text-xs sm:text-[13px] md:text-sm tracking-[0.28em] text-[#141413]/70 font-bold">
                  <button
                    type="button"
                    onClick={() =>
                      scrollToFrameIndex(Math.max(0, activeIndex - 1))
                    }
                    className="hover:text-[#141413] transition-colors cursor-pointer px-2 py-1"
                    aria-label="Previous Frame"
                  >
                    ←
                  </button>
                  <span>
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(filteredItems.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      scrollToFrameIndex(
                        Math.min(filteredItems.length - 1, activeIndex + 1)
                      )
                    }
                    className="hover:text-[#141413] transition-colors cursor-pointer px-2 py-1"
                    aria-label="Next Frame"
                  >
                    →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ============================================================
            FULLSCREEN OPTICAL LIGHTBOX MODAL
            ============================================================ */}
        {activeLightboxItem && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-10 pointer-events-auto"
            onClick={() => setActiveLightboxItem(null)}
          >
            <div
              className="relative w-full max-w-7xl bg-white text-[#141413] border border-black/15 rounded-2xl p-6 md:p-10 shadow-[0_40px_120px_rgba(0,0,0,0.65)] flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-5">
                <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs tracking-[0.24em] text-[#B8860B] uppercase font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#D4A843] animate-pulse" />
                  <span>ARCHIVAL LOUPE // {activeLightboxItem.category}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveLightboxItem(null)}
                  className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-black/20 hover:border-[#141413] text-[#141413] hover:bg-[#141413] hover:text-white flex items-center justify-center font-mono text-base transition-colors cursor-pointer touch-manipulation"
                  aria-label="Close Lightbox"
                >
                  ✕
                </button>
              </div>

              <div className="relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] rounded-xl overflow-hidden bg-black shadow-2xl border border-black/10">
                <Image
                  src={activeLightboxItem.src}
                  alt={activeLightboxItem.title}
                  fill
                  unoptimized={true}
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-2">
                <div className="flex-1">
                  <h2 className="font-serif font-light text-2xl sm:text-3xl md:text-5xl text-[#141413] m-0">
                    {activeLightboxItem.title}
                  </h2>
                  <p className="font-body text-sm sm:text-base md:text-lg text-[#141413]/80 mt-3 max-w-3xl leading-relaxed">
                    {activeLightboxItem.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs md:text-[13px] tracking-[0.18em] sm:tracking-[0.2em] text-[#141413]/75 uppercase font-mono font-semibold">
                    <span className="text-[#B8860B]">
                      BY {activeLightboxItem.photographer}
                    </span>
                    <span>·</span>
                    <span>{activeLightboxItem.location}</span>
                    <span>·</span>
                    <span>{activeLightboxItem.exif}</span>
                    <span>·</span>
                    <span className="text-[#141413]">
                      {activeLightboxItem.filmStock}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 mt-4 md:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = filteredItems.findIndex(
                        (it) => it.id === activeLightboxItem.id
                      );
                      setActiveLightboxItem(
                        filteredItems[
                          (idx - 1 + filteredItems.length) %
                            filteredItems.length
                        ]
                      );
                    }}
                    className="font-mono text-xs tracking-[0.22em] min-h-[44px] min-w-[44px] px-6 py-3.5 rounded-full border border-black/20 hover:border-[#141413] hover:bg-[#141413] text-[#141413] hover:text-white transition-all duration-300 cursor-pointer touch-manipulation flex items-center justify-center flex-1 sm:flex-initial font-bold"
                  >
                    ← PREV
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = filteredItems.findIndex(
                        (it) => it.id === activeLightboxItem.id
                      );
                      setActiveLightboxItem(
                        filteredItems[(idx + 1) % filteredItems.length]
                      );
                    }}
                    className="font-mono text-xs tracking-[0.22em] min-h-[44px] min-w-[44px] px-6 py-3.5 rounded-full border border-black/20 hover:border-[#141413] hover:bg-[#141413] text-[#141413] hover:text-white transition-all duration-300 cursor-pointer touch-manipulation flex items-center justify-center flex-1 sm:flex-initial font-bold"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            FOOTER: Unified Club Footer
            ========================================================= */}
        <ClubFooter variant="dark" />
      </main>
    </SmoothScroller>
  );
}