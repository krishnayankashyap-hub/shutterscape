// src/components/mobile/MobileOilstainExperience.tsx
/* eslint-disable @next/next/no-img-element */
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Image from "next/image";
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
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=75",
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
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=75",
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
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=75",
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
    src: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=75",
    description:
      "Architectural study dissecting concrete planes and warm afternoon shadows across campus.",
  },
  {
    id: "g-05",
    title: "Midnight Neon Drift",
    category: "STREET",
    photographer: "Tiku Sarkar",
    location: "Paltan Bazaar By-lanes",
    filmStock: "CINESTILL 800T",
    exif: "50MM · F/1.4",
    src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=75",
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
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=75",
    description:
      "Extreme close-up examining manual lens aperture blades and glass elements.",
  },
];

const FALLBACK_REELS = [
  {
    id: "01",
    photographer: "World Photography Day",
    videoSrc: "/api/media/6adf9397d782e64ad5ebca9a",
  },
  {
    id: "02",
    photographer: "Glimpse of Grooming Club’s Ramp Walk",
    videoSrc: "/api/media/6ade6c0a40346d3181c85f3a",
  },
  {
    id: "03",
    photographer: "Wall Painting",
    videoSrc: "/api/media/6adf48963c63e8ae4ff0a9d7",
  },
  {
    id: "04",
    photographer: "Photography Workshop ",
    videoSrc: "/api/media/6adf48cd3c63e8ae4ff0a9d8",
  },
  {
    id: "05",
    photographer: "A New Beginning",
    videoSrc: "/api/media/6adf8b6180149ddb913bffa9",
  },
  {
    id: "06",
    photographer: "Magic of Filmmaking",
    videoSrc: "/api/media/6adf8b8e3b59d4ea46c821f6",
  },
];

function getReelInitials(name: string) {
  if (!name) return "SS";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const FALLBACK_ACTIVITIES = [
  {
    id: "ACT-26-01",
    year: "2026",
    shortTitle: "BRAHMAPUTRA 4.0",
    title: "Brahmaputra Heritage Photowalk 4.0",
    category: "PHOTOWALK",
    date: "NOV 14, 2026",
    duration: "1 DAY EXPEDITION",
    location: "Riverfront, Guwahati",
    exif: "35MM · F/2.0 · 1/1000S",
    filmStock: "KODAK PORTRA 400",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=75",
    description:
      "Golden-hour riverfront documentation exploring ferry silhouettes, old ghats, and twilight reflections along the Brahmaputra with live mentor framing critiques.",
    isUpcoming: true,
  },
  {
    id: "ACT-26-02",
    year: "2026",
    shortTitle: "XENON STROBE LAB",
    title: "Mastering Manual Optics & Xenon Strobe",
    category: "WORKSHOP",
    date: "NOV 28, 2026",
    duration: "2 DAYS LAB CLINIC",
    location: "GCU Media Lab",
    exif: "85MM · F/1.4 · 1/250S",
    filmStock: "ILFORD HP5 PLUS",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=75",
    description:
      "Hands-on technical clinic covering manual aperture control, high-speed sync Xenon flash choreography, and Chiaroscuro portrait lighting setups.",
    isUpcoming: true,
  },
  {
    id: "ACT-26-03",
    year: "2026",
    shortTitle: "FRAMES BEYOND TIME",
    title: "Frames Beyond Time — Annual Exhibition",
    category: "EXHIBITION",
    date: "AUG 22, 2026",
    duration: "3 DAYS SHOWCASE",
    location: "GCU Central Atrium",
    exif: "50MM · F/2.8 · 1/500S",
    filmStock: "KODAK VISION3 500T",
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=75",
    description:
      "Curated physical print showcase featuring 60+ archival photographs, contact sheets, and visual essays captured by Girijananda Chowdhury University students.",
    isUpcoming: false,
  },
  {
    id: "ACT-25-01",
    year: "2025",
    shortTitle: "CAMPUS NOCTURNES",
    title: "Campus Nocturnes — Night Photography",
    category: "COMPETITION",
    date: "DEC 12, 2025",
    duration: "NIGHT MARATHON",
    location: "GCU Main Campus",
    exif: "14MM · F/2.8 · 15S",
    filmStock: "KODAK EKTAR 100",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=75",
    description:
      "Late-night practical challenge exploring long-exposure light trails, astrophotography framing, and tungsten architectural silhouettes across campus.",
    isUpcoming: false,
  },
];

const FALLBACK_COMMITTEE = [
  {
    name: "Dr. Sangeeta Das",
    role: "Coordinator",
    tier: "MENTOR",
    dept: "Dept. of Mechanical Engineering",
    bio: "Guides ShutterScape's annual exhibitions, inter-university visual symposia, and archival documentation initiatives across GCU.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=75&w=600&auto=format&fit=crop",
  },
  {
    name: "Dr. Barsha Chhetri",
    role: "Co-Coordinator",
    tier: "MENTOR",
    dept: "Assistant Professor & Head (i/c) Dept. of Education",
    bio: "Mentors student storytellers in visual literacy, cultural documentation, and curatorial ethics at Girijananda Chowdhury University.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=75&w=600&auto=format&fit=crop",
  },
  {
    name: "Uttama Purkayastha",
    role: "President",
    tier: "LEAD",
    dept: "Executive Leadership · GCU",
    bio: "Leads creative direction, campus-wide exhibitions, and visual archive curation for ShutterScape.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=75&w=600&auto=format&fit=crop",
  },
  {
    name: "Ikhyt De Neog",
    role: "Vice-President",
    tier: "LEAD",
    dept: "Operations & Field Expeditions",
    bio: "Coordinates outdoor heritage photowalks, technical lighting workshops, and inter-collegiate challenges.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=75&w=600&auto=format&fit=crop",
  },
  {
    name: "Richita Sarma",
    role: "Secretary",
    tier: "LEAD",
    dept: "Editorial & Archive Administration",
    bio: "Oversees member onboarding, exhibition catalogs, and the preservation of student photographic plates.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=75&w=600&auto=format&fit=crop",
  },
  {
    name: "Sohaib Hussain",
    role: "Core Member",
    tier: "CORE",
    dept: "Documentary & Street Division",
    bio: "Specializes in high-shutter action documentary and candid street narratives across Guwahati.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=75&w=600&auto=format&fit=crop",
  },
  {
    name: "Mahadananda Dutta",
    role: "Core Member",
    tier: "CORE",
    dept: "Optics & Strobe Lead",
    bio: "Focuses on studio strobe choreography, Chiaroscuro portraiture, and manual lens experimentation.",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=75&w=600&auto=format&fit=crop",
  },
  {
    name: "Manash Pratim Sarma",
    role: "Core Member",
    tier: "CORE",
    dept: "Landscape & Expedition",
    bio: "Documents alpine ridges, riverfront twilight, and ecological heritage throughout Assam.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=75&w=600&auto=format&fit=crop",
  },
  {
    name: "Mubina Ahmed",
    role: "Core Member",
    tier: "CORE",
    dept: "Curation & Print Design",
    bio: "Manages exhibition sequencing, matte framing standards, and visual storytelling critiques.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=75&w=600&auto=format&fit=crop",
  },
  {
    name: "Pratyush B. Choudhury",
    role: "Core Member",
    tier: "CORE",
    dept: "Cinematography & Reels",
    bio: "Directs vertical motion reels, color grading workflows, and behind-the-scenes event films.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=75&w=600&auto=format&fit=crop",
  },
  {
    name: "Hiya Das",
    role: "Core Member",
    tier: "CORE",
    dept: "Architectural & Spatial Study",
    bio: "Explores brutalist geometry, symmetry, and natural shadow play across campus structures.",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=75&w=600&auto=format&fit=crop",
  },
  {
    name: "Dheemaan Deka",
    role: "2023 // Co-Founder",
    tier: "FOUNDER",
    dept: "Founding Visionary",
    bio: "Co-founded ShutterScape in 2023 to unite GCU's visual artists under a single creative collective.",
    img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=75&w=600&auto=format&fit=crop",
  },
  {
    name: "Subhrajyoti Goswami",
    role: "2023 // Co-Founder",
    tier: "FOUNDER",
    dept: "Founding Architect",
    bio: "Established the club's signature photowalk culture, darkroom critique sessions, and annual print exhibitions.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=75&w=600&auto=format&fit=crop",
  },
  {
    name: "Gargi Medhi",
    role: "Legacy Torchbearer",
    tier: "LEGACY",
    dept: "Alumni Mentorship Council",
    bio: "Pioneered early portraiture symposia and continues to mentor incoming student photographers.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=75&w=600&auto=format&fit=crop",
  },
  {
    name: "Imran Farhat",
    role: "Legacy Torchbearer",
    tier: "LEGACY",
    dept: "Nocturnal & Street Archive",
    bio: "Known for low-light urban documentation and training junior members in manual exposure.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=75&w=600&auto=format&fit=crop",
  },
];

const MEMBER_CARD_BACKDROPS = [
  "#8CE99A", // Mint Studio Green
  "#FFA8A8", // Coral Peach
  "#74C0FC", // Sky Blue
  "#D0BFFF", // Soft Lavender
  "#FFE066", // Warm Amber Gold
  "#FCC2D7", // Rose Quartz
];

type AboutTabKey =
  | "ORIGINS"
  | "THE TEACHERS"
  | "BEHIND THE LENS"
  | "CORE MEMBERS"
  | "WHERE IT ALL STARTED"
  | "CARRYING IT FORWARD";

const ABOUT_CHAPTER_TABS: {
  id: AboutTabKey;
  code: string;
  shortLabel: string;
}[] = [
  { id: "ORIGINS", code: "01", shortLabel: "ORIGINS" },
  { id: "THE TEACHERS", code: "02", shortLabel: "THE TEACHERS" },
  { id: "BEHIND THE LENS", code: "03", shortLabel: "BEHIND THE LENS" },
  { id: "CORE MEMBERS", code: "04", shortLabel: "CORE MEMBERS" },
  { id: "WHERE IT ALL STARTED", code: "05", shortLabel: "WHERE IT ALL STARTED" },
  { id: "CARRYING IT FORWARD", code: "06", shortLabel: "CARRYING IT FORWARD" },
];

type OpticalLabKey = "LOUPE" | "EMULSION" | "STROBE" | null;
type NavTabId = "home" | "gallery" | "about" | "activity" | "moments";

const FLOATING_NAV_ITEMS: {
  id: NavTabId;
  label: string;
  sectionId: string;
}[] = [
  { id: "home", label: "Home", sectionId: "mobile-hero-top" },
  { id: "gallery", label: "Gallery", sectionId: "mobile-light-spec-section" },
  { id: "about", label: "About", sectionId: "mobile-light-about-section" },
  { id: "activity", label: "Activity", sectionId: "mobile-dark-showcase" },
  { id: "moments", label: "Moments", sectionId: "mobile-chronology-matrix" },
];

function renderFloatingNavIcon(id: NavTabId, isActive: boolean) {
  const strokeColor = isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.72)";
  const size = isActive ? 16 : 15;
  switch (id) {
    case "home":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 10.5L12 3l9 7.5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z" />
          <circle cx="12" cy="14" r="2.5" />
        </svg>
      );
    case "gallery":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "about":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3z" />
          <path d="M18 4l.8 2.2L21 7l-2.2.8L18 10l-.8-2.2L15 7l2.2-.8L18 4z" />
        </svg>
      );
    case "activity":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="22 3 2 11 11 14 14 22 22 3" />
        </svg>
      );
    case "moments":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      );
  }
}

function buildCompactNotchPath(cx: number): string {
  const safeCx = Math.max(51, Math.min(259, cx));
  const nStart = (safeCx - 21).toFixed(2);
  const c1 = (safeCx - 12.5).toFixed(2);
  const center = safeCx.toFixed(2);
  const c2 = (safeCx + 12.5).toFixed(2);
  const nEnd = (safeCx + 21).toFixed(2);

  return `M 22 0 L ${nStart} 0 C ${c1} 0, ${c1} 19.5, ${center} 19.5 C ${c2} 19.5, ${c2} 0, ${nEnd} 0 L 288 0 A 22 22 0 0 1 310 22 L 310 28 A 22 22 0 0 1 288 50 L 22 50 A 22 22 0 0 1 0 28 L 0 22 A 22 22 0 0 1 22 0 Z`;
}

const SLICES_PER_CARD = 6;
const SLICE_INDICES = Array.from({ length: SLICES_PER_CARD }, (_, i) => i);

// =========================================================================
// 1. RESTORED FULL-BLEED "SHUTTER*SCAPE*" MATRIX + COLORED STOP-MOTION
//    PHOTO + FRAMELESS/BORDERLESS EDITORIAL PARAGRAPHS WITH BREATHING SPACE
// =========================================================================
const StopMotionFlipbook = React.memo(function StopMotionFlipbook({
  matrixStack,
}: {
  matrixStack: Array<{ src: string; title: string; orientation: string }>;
}) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      isVisibleRef.current = true;
      setIsHighlighted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) setIsHighlighted(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (matrixStack.length <= 1) return;
    const interval = setInterval(() => {
      if (isVisibleRef.current) {
        setPhotoIdx((prev) => (prev + 1) % matrixStack.length);
      }
    }, 850);
    return () => clearInterval(interval);
  }, [matrixStack.length]);

  const currentFrame = matrixStack[photoIdx % matrixStack.length];

  return (
    <div style={{ paddingTop: "8px", paddingBottom: "8px" }}>
      {/* Top Frameless, Borderless Paragraph with Breathing Space & Colorful Highlights */}
      <p
        style={{ marginBottom: "28px" }}
        className="font-serif text-[18px] leading-[1.6] text-[#111111] font-normal"
      >
        Born at{" "}
        <span
          style={{ padding: "1px 6px" }}
          className={`inline-block rounded font-heading font-bold text-[13.5px] uppercase tracking-tight transition-all duration-700 ${
            isHighlighted
              ? "bg-[#D4A843] text-[#111111]"
              : "bg-transparent text-[#111111]"
          }`}
        >
          Girijananda Chowdhury University
        </span>{" "}
        in Assam,{" "}
        <span className="italic font-semibold underline decoration-[#D92B2B] decoration-wavy decoration-1 underline-offset-4">
          ShutterScape
        </span>{" "}
        is our unmedicated{" "}
        <span
          style={{ padding: "1px 6px" }}
          className={`inline-block rounded font-mono text-[11.5px] font-bold uppercase tracking-wider transition-all duration-700 delay-150 ${
            isHighlighted
              ? "bg-[#D92B2B] text-white"
              : "bg-transparent text-[#111111]"
          }`}
        >
          Visual Archive
        </span>{" "}
        — a pure manifesto of{" "}
        <span className="border-b-2 border-dashed border-[#0F766E] font-semibold text-[#0F766E]">
          analog optics
        </span>
        ,{" "}
        <span className="border-b-2 border-dashed border-[#D4A843] font-semibold">
          street documentary
        </span>
        , and creative excess.
      </p>

      {/* Restored Original Giant Static "SHUTTER*SCAPE*" Background Block + FULL-COLOR Stop-Motion Photo */}
      <div
        ref={containerRef}
        onClick={() => setPhotoIdx((prev) => (prev + 1) % matrixStack.length)}
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
        className="relative w-full overflow-hidden flex items-center justify-center border-y border-black/15 bg-[#FAF9F5] cursor-pointer"
      >
        <div
          aria-hidden="true"
          className="font-heading font-black text-[13vw] leading-[0.86] tracking-[-0.04em] uppercase text-[#111111] text-center select-none break-all"
        >
          SHUTTER*SCAPE*GCU*35MM*RAW*OPTICS*DARKROOM*ASSAM*
        </div>

        {matrixStack.map((frame, i) => {
          const isCurrent = i === photoIdx % matrixStack.length;
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
              className="absolute bg-white shadow-[0_22px_55px_rgba(0,0,0,0.45)] border border-black/15 pointer-events-none transition-opacity duration-200"
            >
              <img
                src={frame.src}
                alt={frame.title}
                className="w-full h-full object-cover saturate-[1.15] contrast-[1.04]"
                loading="lazy"
                decoding="async"
              />
            </div>
          );
        })}
      </div>

      {/* Bottom Frameless, Borderless Paragraph with Breathing Space & Colorful Accents */}
      <div style={{ marginTop: "28px" }}>
        <span
          style={{ marginBottom: "10px" }}
          className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#D92B2B] font-bold block"
        >
          DOUBLE VISION // {currentFrame?.title || "GCU ARCHIVE"}
        </span>
        <p className="font-serif text-[17px] text-[#111111]/85 leading-[1.6]">
          ShutterScape was created for students who love to{" "}
          <span className="font-semibold text-[#111111] underline decoration-[#D4A843] decoration-2 underline-offset-4">
            observe, capture, and tell stories
          </span>{" "}
          through photographs. Whether you shoot on a{" "}
          <span
            style={{ padding: "1px 6px" }}
            className="rounded bg-[#FFF3BF] text-[#8C6D1F] font-mono text-[10.5px] font-bold"
          >
            35mm SLR
          </span>
          , a{" "}
          <span
            style={{ padding: "1px 6px" }}
            className="rounded bg-[#E7F5FF] text-[#1864AB] font-mono text-[10.5px] font-bold"
          >
            mirrorless rig
          </span>
          , or your{" "}
          <span
            style={{ padding: "1px 6px" }}
            className="rounded bg-[#EBFBEE] text-[#2B8A3E] font-mono text-[10.5px] font-bold"
          >
            phone
          </span>{" "}
          —{" "}
          <span className="italic font-semibold text-[#D92B2B]">
            there is a place for you in our darkroom.
          </span>
        </p>
      </div>
    </div>
  );
});

// =========================================================================
// 2. SEAMLESS AUTOMATIC ROTATING HALF-WHEEL COLORED FAN (Section 4)
//    Blends 100% seamlessly into the #ECEBE6 page background with ZERO box!
// =========================================================================
const HalfWheelGalleryFan = React.memo(function HalfWheelGalleryFan({
  items,
  onSelectCard,
}: {
  items: any[];
  onSelectCard: (idx: number) => void;
}) {
  const wheelCards = useMemo(() => items.slice(0, 8), [items]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const isInViewRef = useRef<boolean>(true);

  useEffect(() => {
    const count = wheelCards.length;
    if (count === 0) return;

    let rafId = 0;
    let lastTime = performance.now();

    const updateWheel = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (isInViewRef.current && !isPausedRef.current) {
        angleRef.current = (angleRef.current + dt * 13) % 360;
      }

      const baseAngle = angleRef.current;
      const stepDeg = 180 / Math.max(4, count - 1);

      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const rawDeg = (i * stepDeg + baseAngle) % 220;
        const deg = rawDeg - 110;
        const rad = (deg * Math.PI) / 180;

        // Semicircular arc anchored to the bottom edge so it emerges cleanly out of the divider line
        const radius = 122;
        const x = Math.sin(rad) * radius;
        const y = -Math.cos(rad) * radius + 68;
        const scale = Math.max(0.75, 1 - Math.abs(deg) / 240);
        const opacity =
          Math.abs(deg) > 95
            ? 0
            : 1 - Math.max(0, (Math.abs(deg) - 72) / 23);
        const zIdx = Math.round(50 - Math.abs(deg) * 0.4);

        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(
          1
        )}px, 0) rotate(${deg.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = `${opacity.toFixed(2)}`;
        el.style.zIndex = `${zIdx}`;
      }

      if (isInViewRef.current) {
        rafId = requestAnimationFrame(updateWheel);
      } else {
        rafId = 0;
      }
    };

    const el = stageRef.current;
    let io: IntersectionObserver | null = null;
    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          isInViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting && !rafId) {
            lastTime = performance.now();
            rafId = requestAnimationFrame(updateWheel);
          }
        },
        { rootMargin: "100px 0px" }
      );
      io.observe(el);
    } else {
      rafId = requestAnimationFrame(updateWheel);
    }

    return () => {
      if (io) io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [wheelCards]);

  return (
    <div
      ref={stageRef}
      onTouchStart={() => {
        isPausedRef.current = true;
      }}
      onTouchEnd={() => {
        isPausedRef.current = false;
      }}
      className="relative w-full h-[275px] bg-transparent overflow-hidden flex items-center justify-center select-none"
    >
      {/* Rotating Full-Color Cards Directly on the #ECEBE6 Page Canvas */}
      <div className="relative w-full h-full flex items-center justify-center">
        {wheelCards.map((item, idx) => (
          <div
            key={item._id || item.id || idx}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            onClick={() => onSelectCard(idx)}
            style={{
              width: "132px",
              height: "178px",
              padding: "5px",
              willChange: "transform, opacity",
            }}
            className="absolute bg-white rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.18)] border border-black/10 cursor-pointer"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#111111]">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover saturate-[1.16]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/85 via-black/35 to-transparent">
                <span className="block font-mono text-[6.5px] tracking-[0.16em] uppercase text-[#D4A843] font-bold truncate">
                  {item.category}
                </span>
                <span className="block font-serif text-[11px] text-white leading-tight truncate">
                  {item.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default function MobileOilstainExperience() {
  const [gallery, setGallery] = useState<any[]>(FALLBACK_GALLERY);
  const [activities, setActivities] = useState<any[]>(FALLBACK_ACTIVITIES);
  const [committee, setCommittee] = useState<any[]>(FALLBACK_COMMITTEE);
  const [reels, setReels] = useState<any[]>(FALLBACK_REELS);
  const [activeReelIdx, setActiveReelIdx] = useState<number>(0);
  const [activeAudioReelIdx, setActiveAudioReelIdx] = useState<number | null>(null);
  const [reelProgressMap, setReelProgressMap] = useState<Record<string, number>>({});
  const reelTouchStartXRef = useRef<number>(0);

  // Interactive UI States
  const [activeNavTab, setActiveNavTab] = useState<NavTabId>("home");
  const [isScrolledTop, setIsScrolledTop] = useState(false);

  // Full-Screen Dedicated Pages
  const [isGalleryPageOpen, setIsGalleryPageOpen] = useState(false);
  const [galleryFilterCat, setGalleryFilterCat] = useState<string>("ALL");
  const [expandedGalleryId, setExpandedGalleryId] = useState<string | null>(
    null
  );

  const [isActivitiesPageOpen, setIsActivitiesPageOpen] = useState(false);
  const [activityFilterCat, setActivityFilterCat] = useState<string>("ALL");
  const [activeActivitySlideIdx, setActiveActivitySlideIdx] = useState(0);

  // Section 3 Editorial Spotlight State
  const [hotEventIdx, setHotEventIdx] = useState(0);

  // Section 4 Creative Optical Lab States
  const [activeOpticalLab, setActiveOpticalLab] =
    useState<OpticalLabKey>(null);
  const [selectedFocalMm, setSelectedFocalMm] = useState<number>(50);
  const [selectedEmulsion, setSelectedEmulsion] = useState<
    "PORTRA" | "CINESTILL" | "VELVIA"
  >("PORTRA");

  // Section 5 6-Chapter About & Member Bio Modal
  const [activeAboutTab, setActiveAboutTab] =
    useState<AboutTabKey>("ORIGINS");
  const [selectedMemberModal, setSelectedMemberModal] = useState<{
    person: any;
    bgColor: string;
  } | null>(null);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerEventName, setRegisterEventName] = useState<string>("");
  const [registerSubmitted, setRegisterSubmitted] = useState(false);
  const [heroAnimKey, setHeroAnimKey] = useState(0);
  const [isHeroAnimReady, setIsHeroAnimReady] = useState(false);
  const [isHeroMuted, setIsHeroMuted] = useState(true);

  const heroSectionRef = useRef<HTMLElement>(null);
  const archiveSectionRef = useRef<HTMLElement>(null);
  const ribbonDropWrapRef = useRef<HTMLDivElement>(null);
  const lowerContentRiseRef = useRef<HTMLDivElement>(null);
  const activitiesPeekScrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // Refs for glitch-free 60fps Notch & Bubble Spring Interpolation
  const clipPathElementRef = useRef<SVGPathElement>(null);
  const borderPathElementRef = useRef<SVGPathElement>(null);
  const activeBubbleRef = useRef<HTMLDivElement>(null);
  const currentNotchXRef = useRef<number>(51);
  const targetNotchXRef = useRef<number>(51);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const programmaticScrollTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  // Refs for the 3D Concave Cylindrical Curved Auto-Ribbon
  const curvedCardOuterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const curvedSliceRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const curvedSliceInnerRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const isRibbonPausedRef = useRef<boolean>(false);
  const isRibbonInViewRef = useRef<boolean>(true);
  const isNotchAnimatingRef = useRef<boolean>(false);
  const playheadRef = useRef<number>(0);

  // Cached Section Offsets
  const sectionOffsetsRef = useRef<{
    vh: number;
    galleryTop: number;
    activityTop: number;
    aboutTop: number;
    momentsTop: number;
  }>({
    vh: 800,
    galleryTop: 800,
    activityTop: 1800,
    aboutTop: 2800,
    momentsTop: 3600,
  });

  const toggleHeroAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = heroVideoRef.current;
    if (!vid) return;
    if (isHeroMuted) {
      vid.muted = false;
      setIsHeroMuted(false);
      vid.play().catch(() => {});
    } else {
      vid.muted = true;
      setIsHeroMuted(true);
    }
  };

  const lockProgrammaticScroll = (durationMs = 900) => {
    isProgrammaticScrollRef.current = true;
    if (programmaticScrollTimerRef.current) {
      clearTimeout(programmaticScrollTimerRef.current);
    }
    programmaticScrollTimerRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, durationMs);
  };

  const handleEnterArchiveTransition = () => {
    lockProgrammaticScroll(950);
    setActiveNavTab("gallery");
    archiveSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFloatingNavClick = (
    item: (typeof FLOATING_NAV_ITEMS)[number]
  ) => {
    lockProgrammaticScroll(950);
    setActiveNavTab(item.id);
    if (item.id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.getElementById(item.sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const startNotchAnimation = useCallback(() => {
    if (isNotchAnimatingRef.current) return;
    isNotchAnimatingRef.current = true;

    const animateNotch = () => {
      const diff = targetNotchXRef.current - currentNotchXRef.current;
      if (Math.abs(diff) > 0.15) {
        currentNotchXRef.current += diff * 0.26;
        const cx = currentNotchXRef.current;
        const dStr = buildCompactNotchPath(cx);

        if (clipPathElementRef.current) {
          clipPathElementRef.current.setAttribute("d", dStr);
        }
        if (borderPathElementRef.current) {
          borderPathElementRef.current.setAttribute("d", dStr);
        }
        if (activeBubbleRef.current) {
          const pct = (cx / 310) * 100;
          activeBubbleRef.current.style.left = `${pct.toFixed(2)}%`;
        }

        requestAnimationFrame(animateNotch);
      } else {
        currentNotchXRef.current = targetNotchXRef.current;
        const cx = currentNotchXRef.current;
        const dStr = buildCompactNotchPath(cx);

        if (clipPathElementRef.current) {
          clipPathElementRef.current.setAttribute("d", dStr);
        }
        if (borderPathElementRef.current) {
          borderPathElementRef.current.setAttribute("d", dStr);
        }
        if (activeBubbleRef.current) {
          const pct = (cx / 310) * 100;
          activeBubbleRef.current.style.left = `${pct.toFixed(2)}%`;
        }

        isNotchAnimatingRef.current = false;
      }
    };

    requestAnimationFrame(animateNotch);
  }, []);

  useEffect(() => {
    const idx = Math.max(
      0,
      FLOATING_NAV_ITEMS.findIndex((it) => it.id === activeNavTab)
    );
    targetNotchXRef.current = 51 + idx * 52;
    startNotchAnimation();
  }, [activeNavTab, startNotchAnimation]);

  // Zero-Reflow Scroll Engine
  useEffect(() => {
    let scrollRafId = 0;
    let isHeroCurrentlyHidden = false;
    let lastDropP = -1;

    const measureSectionOffsets = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const vh = window.innerHeight || 800;
      const getTop = (id: string, fallback: number) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + scrollY : fallback;
      };

      sectionOffsetsRef.current = {
        vh,
        galleryTop: getTop("mobile-light-spec-section", vh),
        activityTop: getTop("mobile-dark-showcase", vh * 2),
        aboutTop: getTop("mobile-light-about-section", vh * 3.5),
        momentsTop: getTop("mobile-chronology-matrix", vh * 4.5),
      };
    };

    const onScroll = () => {
      if (scrollRafId) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = 0;
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const { vh, galleryTop, activityTop, aboutTop, momentsTop } =
          sectionOffsetsRef.current;

        const shouldBeScrolled = scrollY > 24;
        setIsScrolledTop((prev) =>
          prev !== shouldBeScrolled ? shouldBeScrolled : prev
        );

        const heroCovered = scrollY >= galleryTop + 16;
        if (heroCovered !== isHeroCurrentlyHidden) {
          isHeroCurrentlyHidden = heroCovered;
          if (heroSectionRef.current) {
            heroSectionRef.current.style.visibility = heroCovered
              ? "hidden"
              : "visible";
          }
          if (heroVideoRef.current) {
            if (heroCovered) {
              heroVideoRef.current.pause();
            } else {
              heroVideoRef.current.play().catch(() => {});
            }
          }
        }

        const secTopInViewport = galleryTop - scrollY;
        const raw = (vh * 0.58 - secTopInViewport) / (vh * 0.58);
        const p = Math.max(0, Math.min(1, raw));

        if (Math.abs(p - lastDropP) > 0.002) {
          lastDropP = p;
          const ribbonWrap = ribbonDropWrapRef.current;
          const lowerWrap = lowerContentRiseRef.current;
          if (ribbonWrap && lowerWrap) {
            const ease = 1 - Math.pow(1 - p, 3);
            const dropY = (1 - ease) * -48;
            const scale = 0.9 + ease * 0.1;
            ribbonWrap.style.transform = `translate3d(0, ${dropY.toFixed(
              1
            )}px, 0) scale(${scale.toFixed(3)})`;

            const textP = Math.max(0, Math.min(1, (p - 0.15) / 0.85));
            const textY = (1 - textP) * 20;
            lowerWrap.style.transform = `translate3d(0, ${textY.toFixed(
              1
            )}px, 0)`;
            lowerWrap.style.opacity = `${(0.2 + textP * 0.8).toFixed(2)}`;
          }
        }

        if (!isProgrammaticScrollRef.current) {
          const triggerLine = scrollY + vh * 0.52;
          let nextTab: NavTabId = "home";
          if (scrollY < vh * 0.45) {
            nextTab = "home";
          } else if (triggerLine >= momentsTop) {
            nextTab = "moments";
          } else if (triggerLine >= aboutTop) {
            nextTab = "about";
          } else if (triggerLine >= activityTop) {
            nextTab = "activity";
          } else if (triggerLine >= galleryTop) {
            nextTab = "gallery";
          }
          setActiveNavTab((prev) => (prev !== nextTab ? nextTab : prev));
        }
      });
    };

    measureSectionOffsets();
    const remeasureTimer = setTimeout(measureSectionOffsets, 800);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measureSectionOffsets, { passive: true });
    onScroll();

    return () => {
      clearTimeout(remeasureTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureSectionOffsets);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
    };
  }, [
    gallery.length,
    activities.length,
    activeAboutTab,
    activeOpticalLab,
  ]);

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
        setReels(
          reelRes.value.data.map((d: any, idx: number) => {
            const def = FALLBACK_REELS[idx % FALLBACK_REELS.length];
            const validSrc =
              d.videoSrc && !d.videoSrc.startsWith("blob:")
                ? d.videoSrc
                : def.videoSrc;
            return {
              id: d._id || String(idx + 1).padStart(2, "0"),
              photographer: d.photographer || def.photographer,
              videoSrc: validSrc,
            };
          })
        );
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
    const timer = setTimeout(triggerAnim, 2850);

    return () => {
      window.removeEventListener("shutterscape:loader-complete", triggerAnim);
      clearTimeout(timer);
    };
  }, []);

  // Ultra-Lightweight 3D Concave Cylindrical Curved Ribbon Engine (Section 2)
  useEffect(() => {
    const total = gallery.length;
    if (total === 0) return;

    let vw = window.innerWidth;
    let cardW = Math.min(310, Math.max(255, vw * 0.75));
    let cardH = Math.round(cardW * 0.62);
    let gap = 18;
    let stride = cardW + gap;
    let sliceW = cardW / SLICES_PER_CARD;
    let cylRadius = Math.max(340, vw * 0.86);

    const renderCylindricalSlices = (currentFloatIdx: number) => {
      for (let i = 0; i < total; i++) {
        const cardEl = curvedCardOuterRefs.current[i];
        if (!cardEl) continue;

        let deltaCards = i - currentFloatIdx;
        if (deltaCards > total / 2) deltaCards -= total;
        if (deltaCards < -total / 2) deltaCards += total;

        if (Math.abs(deltaCards) > 1.38) {
          if (cardEl.style.display !== "none") {
            cardEl.style.display = "none";
          }
          continue;
        }

        if (cardEl.style.display !== "block") {
          cardEl.style.display = "block";
        }
        cardEl.style.zIndex = `${Math.round(100 - Math.abs(deltaCards) * 20)}`;

        const cardCenterX = deltaCards * stride;
        const cardSlices = curvedSliceRefs.current[i] || [];

        for (let s = 0; s < SLICES_PER_CARD; s++) {
          const sliceEl = cardSlices[s];
          if (!sliceEl) continue;

          const localX = (s + 0.5) * sliceW - cardW / 2;
          const u = cardCenterX + localX;

          const rawPhi = u / cylRadius;
          const phi = Math.max(-1.32, Math.min(1.32, rawPhi));

          const cylX = cylRadius * Math.sin(phi);
          const cylZ = cylRadius * (1 - Math.cos(phi));
          const rotYDeg = -((phi * 180) / Math.PI);

          sliceEl.style.transform = `translate3d(${cylX.toFixed(
            1
          )}px, 0px, ${cylZ.toFixed(1)}px) rotateY(${rotYDeg.toFixed(1)}deg)`;
        }
      }
    };

    const setupStaticCardMetrics = () => {
      vw = window.innerWidth;
      cardW = Math.min(310, Math.max(255, vw * 0.75));
      cardH = Math.round(cardW * 0.62);
      gap = 18;
      stride = cardW + gap;
      sliceW = cardW / SLICES_PER_CARD;
      cylRadius = Math.max(340, vw * 0.86);

      for (let i = 0; i < total; i++) {
        const cardEl = curvedCardOuterRefs.current[i];
        if (!cardEl) continue;

        cardEl.style.width = `${cardW}px`;
        cardEl.style.height = `${cardH}px`;
        cardEl.style.marginLeft = `${-cardW / 2}px`;
        cardEl.style.marginTop = `${-cardH / 2}px`;

        const cardSlices = curvedSliceRefs.current[i] || [];
        const cardInners = curvedSliceInnerRefs.current[i] || [];

        for (let s = 0; s < SLICES_PER_CARD; s++) {
          const sliceEl = cardSlices[s];
          const innerEl = cardInners[s];
          if (!sliceEl || !innerEl) continue;

          sliceEl.style.width = `${sliceW + 1.4}px`;
          sliceEl.style.height = `${cardH}px`;
          sliceEl.style.left = `${cardW / 2 - sliceW / 2}px`;

          innerEl.style.width = `${cardW}px`;
          innerEl.style.height = `${cardH}px`;
          innerEl.style.transform = `translate3d(${(-s * sliceW).toFixed(
            2
          )}px, 0, 0)`;
        }
      }

      renderCylindricalSlices(playheadRef.current);
    };

    setupStaticCardMetrics();

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (isRibbonInViewRef.current && !isRibbonPausedRef.current) {
        playheadRef.current = (playheadRef.current + dt * 0.16) % total;
        renderCylindricalSlices(playheadRef.current);
      }

      if (isRibbonInViewRef.current) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const secEl = archiveSectionRef.current;
    let io: IntersectionObserver | null = null;
    if (secEl && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          isRibbonInViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting && !rafId) {
            lastTime = performance.now();
            rafId = requestAnimationFrame(tick);
          }
        },
        { rootMargin: "120px 0px" }
      );
      io.observe(secEl);
    } else {
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("resize", setupStaticCardMetrics, {
      passive: true,
    });

    return () => {
      if (io) io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setupStaticCardMetrics);
    };
  }, [gallery]);

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

  const hotEventsList = useMemo(() => {
    const upcomingOnly = activities.filter((ev) => ev.isUpcoming);
    return upcomingOnly.length > 0 ? upcomingOnly : activities.slice(0, 4);
  }, [activities]);

  useEffect(() => {
    if (hotEventsList.length <= 1) return;
    const timer = setInterval(() => {
      setHotEventIdx((prev) => (prev + 1) % hotEventsList.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [hotEventsList.length]);

  const currentHotEvent =
    hotEventsList[hotEventIdx % Math.max(1, hotEventsList.length)] ||
    FALLBACK_ACTIVITIES[0];

  const filteredGalleryItems = useMemo(() => {
    if (galleryFilterCat === "ALL") return gallery;
    return gallery.filter(
      (g) => (g.category || "").toUpperCase() === galleryFilterCat
    );
  }, [gallery, galleryFilterCat]);

  const filteredActivityItems = useMemo(() => {
    if (activityFilterCat === "ALL") return activities;
    return activities.filter(
      (a) =>
        (a.category || "").toUpperCase() === activityFilterCat ||
        String(a.year) === activityFilterCat
    );
  }, [activities, activityFilterCat]);

  const activeActivityDetail =
    filteredActivityItems[
      activeActivitySlideIdx % Math.max(1, filteredActivityItems.length)
    ] || FALLBACK_ACTIVITIES[0];

  const scrollActivitiesPeekTo = (idx: number) => {
    const total = filteredActivityItems.length;
    if (total === 0) return;
    const clamped = (idx + total) % total;
    setActiveActivitySlideIdx(clamped);
    if (activitiesPeekScrollRef.current) {
      const container = activitiesPeekScrollRef.current;
      const cardEl = container.children[clamped] as HTMLElement | undefined;
      if (cardEl) {
        container.scrollTo({
          left: cardEl.offsetLeft - 20,
          behavior: "smooth",
        });
      }
    }
  };

  // Committee Member Buckets
  const mentorsList = useMemo(() => {
    const m = committee.filter((c) => c.tier === "MENTOR");
    return m.length > 0
      ? m
      : FALLBACK_COMMITTEE.filter((c) => c.tier === "MENTOR");
  }, [committee]);

  const leadsList = useMemo(() => {
    const l = committee.filter((c) => c.tier === "LEAD");
    return l.length > 0
      ? l
      : FALLBACK_COMMITTEE.filter((c) => c.tier === "LEAD");
  }, [committee]);

  const coreList = useMemo(() => {
    const c = committee.filter((m) => m.tier === "CORE");
    return c.length > 0
      ? c
      : FALLBACK_COMMITTEE.filter((m) => m.tier === "CORE");
  }, [committee]);

  const foundersList = useMemo(() => {
    const f = committee.filter((m) => m.tier === "FOUNDER");
    return f.length > 0
      ? f
      : FALLBACK_COMMITTEE.filter((m) => m.tier === "FOUNDER");
  }, [committee]);

  const legacyList = useMemo(() => {
    const leg = committee.filter((m) => m.tier === "LEGACY");
    return leg.length > 0
      ? leg
      : FALLBACK_COMMITTEE.filter(
          (m) => m.tier === "LEGACY" || m.tier === "FOUNDER"
        );
  }, [committee]);

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

  // Silky smooth mobile performance: only play the active center reel video; pause all others
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === activeReelIdx) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [activeReelIdx]);

  const getReelCardStyle = (index: number) => {
    const total = reels.length;
    let relativeIndex = index - activeReelIdx;

    if (relativeIndex > total / 2) relativeIndex -= total;
    if (relativeIndex < -total / 2) relativeIndex += total;

    let translateX = 0;
    let scale = 1;
    let zIndex = 40;
    let opacity = 1;
    let rotateY = 0;
    let filter = "none";

    if (relativeIndex === 0) {
      translateX = 0;
      scale = 1;
      zIndex = 50;
      opacity = 1;
      rotateY = 0;
      filter = "none";
    } else if (relativeIndex === 1) {
      translateX = 82;
      scale = 0.88;
      zIndex = 35;
      opacity = 0.85;
      rotateY = -6;
      filter = "brightness(0.85)";
    } else if (relativeIndex === -1) {
      translateX = -82;
      scale = 0.88;
      zIndex = 35;
      opacity = 0.85;
      rotateY = 6;
      filter = "brightness(0.85)";
    } else if (relativeIndex === 2) {
      translateX = 150;
      scale = 0.75;
      zIndex = 20;
      opacity = 0;
      rotateY = -12;
      filter = "brightness(0.5)";
    } else if (relativeIndex === -2) {
      translateX = -150;
      scale = 0.75;
      zIndex = 20;
      opacity = 0;
      rotateY = 12;
      filter = "brightness(0.5)";
    } else {
      translateX = 0;
      scale = 0.6;
      zIndex = 10;
      opacity = 0;
      rotateY = 0;
      filter = "none";
    }

    return {
      transform: `translate3d(calc(-50% + ${translateX}px), -50%, 0) scale(${scale}) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      filter,
      transition: "all 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
    };
  };

  const handleReelTouchStart = (e: React.TouchEvent) => {
    reelTouchStartXRef.current = e.touches[0].clientX;
  };

  const handleReelTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - reelTouchStartXRef.current;
    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        setActiveReelIdx((prev) => (prev + 1) % reels.length);
      } else {
        setActiveReelIdx((prev) => (prev - 1 + reels.length) % reels.length);
      }
    }
  };

  const handleReelCardClick = (index: number) => {
    if (index !== activeReelIdx) {
      setActiveReelIdx(index);
    } else {
      setActiveAudioReelIdx((prev) => (prev === index ? null : index));
    }
  };

  const handleReelVideoEnded = (index: number) => {
    if (index === activeReelIdx) {
      setActiveReelIdx((prev) => (prev + 1) % reels.length);
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

  // Colored Studio Member Card (Screenshots 7 & 8)
  const renderStudioMemberCard = (person: any, idx: number) => {
    const bgColor = MEMBER_CARD_BACKDROPS[idx % MEMBER_CARD_BACKDROPS.length];
    return (
      <div
        key={`${person.name}-${idx}`}
        onClick={() => setSelectedMemberModal({ person, bgColor })}
        style={{ padding: "10px" }}
        className="group bg-white rounded-2xl border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
      >
        <div>
          <div
            style={{
              backgroundColor: bgColor,
              clipPath:
                "polygon(0 0, 100% 0, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
            }}
            className="relative w-full aspect-[4/4.4] rounded-xl overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 25%, rgba(255,255,255,0.45) 0%, transparent 70%)",
              }}
            />

            <img
              src={person.img}
              alt={person.name}
              className="w-full h-full object-cover object-top saturate-[1.08] contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div style={{ padding: "10px 4px 4px" }}>
            <h4 className="font-heading font-bold text-[13.5px] text-[#111111] tracking-tight leading-snug">
              {person.name}
            </h4>
            <p
              style={{ marginTop: "2px" }}
              className="font-sans text-[11px] font-medium text-black/65 leading-snug"
            >
              {person.role}
            </p>
            {person.dept && (
              <p
                style={{ marginTop: "2px" }}
                className="font-sans text-[10px] text-black/45 line-clamp-1"
              >
                {person.dept}
              </p>
            )}
          </div>
        </div>

        <div
          style={{ paddingTop: "6px", paddingRight: "4px" }}
          className="flex items-center justify-end"
        >
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black/[0.04] group-hover:bg-[#111111] text-[#111111] group-hover:text-white text-xs transition-colors">
            →
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      id="shutterscape-mobile-oilstain"
      className="w-full min-h-screen bg-[#ECEBE6] text-[#111111] font-sans select-none overflow-x-clip"
    >
      {/* Scoped Stylesheet */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nothing+You+Could+Do&family=Reenie+Beanie&display=swap');

        #shutterscape-mobile-oilstain .font-script {
          font-family: 'Dancing Script', cursive !important;
        }

        #shutterscape-mobile-oilstain .sound-wave {
          display: flex;
          align-items: center;
          gap: 2.5px;
          height: 12px;
        }
        #shutterscape-mobile-oilstain .sound-wave span {
          display: block;
          width: 2px;
          background: #EF4444;
          border-radius: 2px;
          animation: wave 1s ease-in-out infinite;
        }
        #shutterscape-mobile-oilstain .sound-wave span:nth-child(1) { animation-delay: 0.1s; height: 40%; }
        #shutterscape-mobile-oilstain .sound-wave span:nth-child(2) { animation-delay: 0.25s; height: 100%; }
        #shutterscape-mobile-oilstain .sound-wave span:nth-child(3) { animation-delay: 0.4s; height: 60%; }
        @keyframes wave { 50% { height: 20%; } }

        @media (max-width: 1023px) {
          header[aria-label="Global Viewfinder Navigation"] {
            display: none !important;
          }
        }

        #shutterscape-mobile-oilstain {
          background-color: #ECEBE6;
          color: #111111;
          -webkit-overflow-scrolling: touch;
        }
        #shutterscape-mobile-oilstain .osl-top-capsule {
          padding: 6px 14px !important;
        }
        #shutterscape-mobile-oilstain .osl-pad-sm { padding: 12px 16px !important; }
        #shutterscape-mobile-oilstain .osl-pad-md { padding: 20px 18px !important; }
        #shutterscape-mobile-oilstain .osl-pad-lg { padding: 30px 20px !important; }
        #shutterscape-mobile-oilstain .osl-btn-pill { padding: 7px 12px !important; }
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
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        #shutterscape-mobile-oilstain .osl-bento-cell {
          padding: 20px 8px !important;
          border-top: 1px solid rgba(17, 17, 17, 0.15);
          border-bottom: 1px solid rgba(17, 17, 17, 0.15);
          border-right: 1px solid rgba(17, 17, 17, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          background: #ECEBE6;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        #shutterscape-mobile-oilstain .osl-bento-cell.active-lab,
        #shutterscape-mobile-oilstain .osl-bento-cell:active {
          background: #111111;
          color: #ECEBE6;
        }
        #shutterscape-mobile-oilstain .osl-chapter-pill {
          padding: 13px 14px !important;
          font-family: var(--font-space-mono), monospace;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
          border-right: 1px solid rgba(17, 17, 17, 0.12);
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
        #shutterscape-mobile-oilstain .handmade-fountain-pen {
          font-family: 'Nothing You Could Do', cursive !important;
          font-weight: 400;
          color: #1D1C1A;
        }
        #shutterscape-mobile-oilstain .handmade-signature-pen {
          font-family: 'Reenie Beanie', cursive !important;
          font-weight: 400;
          color: #141311;
        }
        @keyframes oslLetterReveal {
          0% {
            opacity: 0;
            transform: translate3d(0, 32px, 0) scale(0.86);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        #shutterscape-mobile-oilstain .osl-letter-char {
          display: inline-block;
          opacity: 0;
          transform: translate3d(0, 32px, 0) scale(0.86);
          animation: oslLetterReveal 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
        @keyframes oslFadeDown {
          0% { opacity: 0; transform: translate3d(0, -10px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        #shutterscape-mobile-oilstain .osl-hero-badge {
          opacity: 0;
          animation: oslFadeDown 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards;
        }
        @keyframes oslRuleExpand {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        #shutterscape-mobile-oilstain .osl-hero-rule {
          transform: scaleX(0);
          animation: oslRuleExpand 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.02s forwards;
          transform-origin: center;
        }
        @keyframes oslSubtitleReveal {
          0% { opacity: 0; transform: translate3d(0, 12px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        #shutterscape-mobile-oilstain .osl-hero-subtitle {
          opacity: 0;
          animation: oslSubtitleReveal 0.75s cubic-bezier(0.16, 1, 0.3, 1) 1.15s forwards;
        }
        @keyframes oslTaglineReveal {
          0% { opacity: 0; transform: translate3d(0, 14px, 0); }
          100% { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        #shutterscape-mobile-oilstain .osl-hero-tagline {
          opacity: 0;
          animation: oslTaglineReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.35s forwards;
        }
      `,
        }}
      />

      {/* ============================================================
          UP NAVBAR: COMPACT CENTERED GLASS CAPSULE
          ============================================================ */}
      <div
        style={{
          backgroundColor: isScrolledTop
            ? "rgba(12, 12, 16, 0.36)"
            : "rgba(12, 12, 16, 0.2)",
          backdropFilter: "blur(12px) saturate(140%)",
          WebkitBackdropFilter: "blur(12px) saturate(140%)",
          borderColor: isScrolledTop
            ? "rgba(255, 255, 255, 0.22)"
            : "rgba(255, 255, 255, 0.15)",
          transform: "translate3d(-50%, 0, 0)",
        }}
        className="osl-top-capsule fixed top-3 left-1/2 z-[9980] w-max max-w-[94vw] rounded-full border shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-colors duration-300 flex items-center justify-center gap-2 sm:gap-2.5 pointer-events-auto select-none"
      >
        <button
          type="button"
          onClick={() => {
            lockProgrammaticScroll(950);
            setActiveNavTab("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center cursor-pointer shrink-0"
        >
          <div
            style={{ width: "90px", height: "24px" }}
            className="relative shrink-0"
          >
            <Image
              src="/images/shutterscape-brand-white.png"
              alt="ShutterScape Logo"
              fill
              sizes="90px"
              priority
              unoptimized
              className="object-contain object-left"
            />
          </div>
        </button>

        <span className="h-3.5 w-[1px] bg-white/20 shrink-0" />

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setRegisterEventName("");
              setRegisterSubmitted(false);
              setIsRegisterModalOpen(true);
            }}
            style={{ padding: "4.5px 10px" }}
            className="rounded-full bg-[#D4A843] hover:bg-[#E5B955] text-[#050505] font-mono text-[8px] font-bold tracking-[0.14em] uppercase cursor-pointer shrink-0 shadow-2xs"
          >
            JOIN &apos;26
          </button>

          <a
            href="https://gcu.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: "76px", height: "23px" }}
            className="relative opacity-95 hover:opacity-100 transition-opacity shrink-0 flex items-center"
            title="Girijananda Chowdhury University"
          >
            <img
              src="/images/gcu-logo-white-text.png"
              alt="GCU"
              className="w-full h-full object-contain object-center"
            />
          </a>
        </div>
      </div>

      {/* ============================================================
          DOWN NAVBAR: SMALL, GLASSY TRANSPARENT & BUTTER-SMOOTH
          ============================================================ */}
      <nav
        aria-label="Mobile Floating Navigation"
        style={{
          width: "310px",
          height: "50px",
          transform: "translate3d(-50%, 0, 0)",
        }}
        className="fixed bottom-3 left-1/2 z-[9985] max-w-[90vw] select-none pointer-events-auto"
      >
        <svg width="0" height="0" className="absolute pointer-events-none">
          <defs>
            <clipPath id="compact-glass-notch-clip">
              <path
                ref={clipPathElementRef}
                d={buildCompactNotchPath(51)}
              />
            </clipPath>
          </defs>
        </svg>

        <div
          style={{
            clipPath: "url(#compact-glass-notch-clip)",
            WebkitClipPath: "url(#compact-glass-notch-clip)",
            backgroundColor: "rgba(18, 18, 24, 0.36)",
            backdropFilter: "blur(10px) saturate(140%)",
            WebkitBackdropFilter: "blur(10px) saturate(140%)",
            transform: "translate3d(0, 0, 0)",
          }}
          className="absolute inset-0 w-full h-full shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
        />

        <svg
          viewBox="0 0 310 50"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        >
          <path
            ref={borderPathElementRef}
            d={buildCompactNotchPath(51)}
            fill="rgba(255, 255, 255, 0.04)"
            stroke="rgba(255, 255, 255, 0.24)"
            strokeWidth="1"
          />
        </svg>

        <div
          ref={activeBubbleRef}
          style={{
            left: `${(51 / 310) * 100}%`,
            top: "-13px",
            width: "34px",
            height: "34px",
            backgroundColor: "rgba(22, 22, 30, 0.48)",
            backdropFilter: "blur(10px) saturate(140%)",
            WebkitBackdropFilter: "blur(10px) saturate(140%)",
            border: "1px solid rgba(255, 255, 255, 0.28)",
            transform: "translate3d(-50%, 0, 0)",
          }}
          className="absolute rounded-full shadow-[0_6px_14px_rgba(0,0,0,0.3)] flex items-center justify-center pointer-events-none z-20"
        >
          {renderFloatingNavIcon(activeNavTab, true)}
        </div>

        <div
          style={{ paddingLeft: "25px", paddingRight: "25px" }}
          className="absolute inset-0 grid grid-cols-5 items-center z-10"
        >
          {FLOATING_NAV_ITEMS.map((item) => {
            const isActive = item.id === activeNavTab;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleFloatingNavClick(item)}
                className="relative h-full w-full flex flex-col items-center justify-center cursor-pointer bg-transparent border-0 outline-none"
              >
                <span
                  style={{
                    transform: isActive
                      ? "translate3d(0, -10px, 0) scale(0.4)"
                      : "translate3d(0, -1px, 0) scale(1)",
                    opacity: isActive ? 0 : 0.82,
                    transition: "transform 0.24s ease, opacity 0.24s ease",
                  }}
                  className="flex items-center justify-center"
                >
                  {renderFloatingNavIcon(item.id, false)}
                </span>

                <span
                  style={{
                    marginTop: isActive ? "13px" : "3px",
                    transition: "margin-top 0.24s ease",
                  }}
                  className={`font-sans text-[9.5px] tracking-[0.02em] leading-none ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-white/75 font-normal"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ============================================================
          1. OPENING SPLASH HERO
          ============================================================ */}
      <section
        id="mobile-hero-top"
        ref={heroSectionRef}
        className="sticky top-0 z-10 w-full h-[100svh] min-h-[580px] bg-[#070709] text-white flex flex-col justify-between overflow-hidden"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={MOBILE_HERO_MEDIA.posterSrc}
            alt="Girijananda Chowdhury University Campus"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.58] contrast-[1.08]"
          />

          <video
            ref={heroVideoRef}
            src={MOBILE_HERO_MEDIA.videoSrc}
            poster={MOBILE_HERO_MEDIA.posterSrc}
            autoPlay
            loop
            muted={isHeroMuted}
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.58] contrast-[1.08]"
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,5,7,0.75) 0%, rgba(5,5,7,0.35) 45%, rgba(5,5,7,0.92) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 w-full pt-14 pointer-events-none" />

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

          <h1 className="font-serif text-[clamp(1.85rem,9.2vw,3.4rem)] leading-[0.92] tracking-[0.04em] uppercase text-white font-normal w-full text-center">
            {"SHUTTERSCAPE".split("").map((char, i) => (
              <span
                key={i}
                className={
                  isHeroAnimReady ? "osl-letter-char" : "opacity-0 inline-block"
                }
                style={
                  isHeroAnimReady
                    ? {
                        animationDelay: `${0.16 + i * 0.075}s`,
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

        <div
          style={{ paddingBottom: "68px" }}
          className="relative z-10 w-full flex flex-col bg-black/65"
        >
          <div className="osl-pad-sm flex items-center justify-between font-mono text-[8.5px] tracking-[0.2em] text-white/55 uppercase border-t border-white/10">
            <span className="pl-12">f/1.4 · 1/1000s · ISO 400</span>
            <span>GCU · ASSAM</span>
          </div>

          <div className="relative w-full">
            <button
              type="button"
              onClick={toggleHeroAudio}
              className="absolute bottom-2 left-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#D4A843]/60 bg-[#161513] text-[#D4A843] shadow-md cursor-pointer active:scale-95 transition-transform"
              title={isHeroMuted ? "Unmute video sound" : "Mute video sound"}
              aria-label={
                isHeroMuted ? "Unmute video sound" : "Mute video sound"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                {isHeroMuted ? (
                  <>
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </>
                ) : (
                  <>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </>
                )}
              </svg>
            </button>

            <button
              type="button"
              onClick={handleEnterArchiveTransition}
              style={{ padding: "13px 18px 13px 56px" }}
              className="w-full flex items-center justify-between bg-[#D4A843] text-[#050505] font-mono text-[9.5px] font-bold tracking-[0.18em] uppercase cursor-pointer"
            >
              <span>ENTER THE DARKROOM ARCHIVE</span>
              <span className="text-sm leading-none">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. PAGE 2: COMPACT SINGLE-SCREEN ARCHIVE STAGE
          ============================================================ */}
      <section
        id="mobile-light-spec-section"
        ref={archiveSectionRef}
        style={{ minHeight: "100svh", paddingBottom: "74px" }}
        className="relative z-20 w-full bg-[#ECEBE6] text-[#111111] shadow-[0_-20px_50px_rgba(0,0,0,0.45)] flex flex-col justify-between overflow-hidden"
      >
        <div
          style={{ padding: "54px 20px 12px" }}
          className="relative z-10 flex items-center justify-between border-b border-black/10 shrink-0"
        >
          <div className="relative h-10 w-[125px] sm:h-12 sm:w-[150px] shrink-0">
            <Image
              src="/images/shutterscape-logo.png"
              alt="ShutterScape Logo"
              fill
              sizes="150px"
              priority
              unoptimized
              className="object-contain object-left"
            />
          </div>
          <span className="font-heading font-light text-4xl sm:text-5xl tracking-[-0.05em] leading-none text-[#111111] select-none">
            26
          </span>
        </div>

        <div
          ref={ribbonDropWrapRef}
          onTouchStart={() => {
            isRibbonPausedRef.current = true;
          }}
          onTouchEnd={() => {
            isRibbonPausedRef.current = false;
          }}
          onMouseEnter={() => {
            isRibbonPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isRibbonPausedRef.current = false;
          }}
          style={{
            marginTop: "12px",
            marginBottom: "6px",
            height: "190px",
            perspective: "720px",
            perspectiveOrigin: "50% 50%",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          className="relative z-20 w-full flex items-center justify-center overflow-visible shrink-0"
        >
          {gallery.map((item, cardIdx) => {
            if (!curvedSliceRefs.current[cardIdx]) {
              curvedSliceRefs.current[cardIdx] = [];
            }
            if (!curvedSliceInnerRefs.current[cardIdx]) {
              curvedSliceInnerRefs.current[cardIdx] = [];
            }

            return (
              <div
                key={item._id || item.id || cardIdx}
                ref={(el) => {
                  curvedCardOuterRefs.current[cardIdx] = el;
                }}
                onClick={() => {
                  setGalleryFilterCat("ALL");
                  setExpandedGalleryId(item._id || item.id || String(cardIdx));
                  setIsGalleryPageOpen(true);
                }}
                className="absolute top-1/2 left-1/2 cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  display: cardIdx < 3 ? "block" : "none",
                }}
              >
                {SLICE_INDICES.map((s) => (
                  <div
                    key={s}
                    ref={(el) => {
                      curvedSliceRefs.current[cardIdx][s] = el;
                    }}
                    className="absolute top-0 overflow-hidden will-change-transform"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div
                      ref={(el) => {
                        curvedSliceInnerRefs.current[cardIdx][s] = el;
                      }}
                      className="relative overflow-hidden rounded-[6px] bg-[#0B0B0E] border border-black/20"
                      style={{
                        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.3) 100%), url(${item.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div
                        style={{ padding: "10px 12px" }}
                        className="absolute top-0 inset-x-0 flex items-center justify-between pointer-events-none"
                      >
                        <span
                          style={{ padding: "2.5px 7px" }}
                          className="rounded bg-black/80 border border-white/20 font-mono text-[7.5px] uppercase tracking-[0.18em] text-[#D4A843] font-semibold"
                        >
                          {item.category || "ARCHIVE"}
                        </span>
                        <span className="font-mono text-[7.5px] tracking-[0.18em] text-white/85 uppercase font-medium">
                          {item.filmStock || "KODAK TRI-X 400"}
                        </span>
                      </div>

                      <div
                        style={{ padding: "11px 12px" }}
                        className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 pointer-events-none"
                      >
                        <div className="max-w-[73%]">
                          <h3 className="font-serif text-lg sm:text-xl text-white font-light leading-[0.98] tracking-tight truncate">
                            {item.title}
                          </h3>
                          <p
                            style={{ marginTop: "3px" }}
                            className="font-body text-[9.5px] text-white/85 line-clamp-1"
                          >
                            {item.description}
                          </p>
                        </div>

                        <span
                          style={{ padding: "3.5px 9px" }}
                          className="shrink-0 rounded-full bg-[#D4A843] text-[#050505] font-mono text-[7px] font-bold uppercase tracking-[0.16em]"
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

        <div
          ref={lowerContentRiseRef}
          style={{ willChange: "transform, opacity" }}
          className="relative z-10 flex-1 flex flex-col justify-evenly items-center w-full"
        >
          <div
            style={{
              paddingTop: "4px",
              paddingBottom: "10px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
            className="w-full text-center border-b border-black/10 shrink-0"
          >
            <h2 className="font-heading font-black text-xl sm:text-2xl tracking-[-0.03em] uppercase leading-[0.96] text-[#111111]">
              LIGHT IS MEMORY.
              <br />
              MEMORY IS LIGHT.
            </h2>
            <p
              style={{ marginTop: "5px" }}
              className="font-mono text-[8.5px] tracking-[0.22em] uppercase text-black/45"
            >
              [ GIRIJANANDA CHOWDHURY UNIVERSITY ]
            </p>
          </div>

          <div
            style={{
              paddingTop: "10px",
              paddingBottom: "6px",
              paddingLeft: "22px",
              paddingRight: "22px",
            }}
            className="relative w-full flex flex-col items-center justify-center shrink-0"
          >
            <div
              style={{
                transform: "rotate(-5deg)",
                maxWidth: "355px",
              }}
              className="w-full flex flex-col select-none"
            >
              <div className="handmade-fountain-pen text-[18px] sm:text-[20px] leading-[1.42] tracking-[0.01em] text-left">
                <p style={{ marginLeft: "4px" }}>
                  Every photograph holds a little piece of time,
                </p>
                <p style={{ marginLeft: "16px", marginTop: "2px" }}>
                  every frame keeps a story alive.
                </p>
              </div>

              <div
                style={{ marginTop: "12px" }}
                className="handmade-fountain-pen text-[18px] sm:text-[20px] leading-[1.42] tracking-[0.01em] text-left"
              >
                <p style={{ marginLeft: "22px" }}>
                  Through light, laughter, and the moments
                </p>
                <p style={{ marginLeft: "6px", marginTop: "2px" }}>
                  in between, we learn to see the world a little differently.
                </p>
              </div>

              <div
                style={{ marginTop: "14px", paddingRight: "6px" }}
                className="w-full flex flex-col items-end text-right"
              >
                <span className="handmade-fountain-pen text-[16px] sm:text-[17.5px] text-[#1D1C1A]/85 leading-none">
                  With love, light, and endless stories,
                </span>

                <div
                  style={{ marginTop: "6px" }}
                  className="flex flex-col items-end"
                >
                  <span className="handmade-signature-pen text-[32px] sm:text-[36px] leading-[0.88] tracking-[0.02em] text-[#111111]">
                    The Shutterscape Family
                  </span>
                  <svg
                    width="160"
                    height="12"
                    viewBox="0 0 220 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginTop: "2px" }}
                    className="text-[#1D1C1A]/75"
                  >
                    <path
                      d="M4 14C58 6 138 4 214 9C182 11 140 13 112 16"
                      stroke="currentColor"
                      strokeWidth="1.35"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. LUXURY EDITORIAL SPOTLIGHT CARD + "ACTIVITIES +" BAR
             (Upgraded with Leica/Magnum Museum Poster Card & Editorial Serif!)
          ============================================================ */}
      <section
        id="mobile-dark-showcase"
        className="relative z-20 w-full bg-[#0D0D10] text-white"
      >
        <div style={{ padding: "36px 20px 24px" }}>
          {/* Editorial Section Header */}
          <div
            style={{ marginBottom: "22px" }}
            className="flex items-end justify-between border-b border-white/10 pb-4"
          >
            <div>
              <span className="font-serif italic text-sm text-[#D4A843] tracking-wide block">
                Current Exhibition &amp; Live Dispatch
              </span>
              <h2
                style={{ marginTop: "2px" }}
                className="font-serif text-3xl text-white font-light tracking-tight leading-none"
              >
                The Living Chronology.
              </h2>
            </div>

            {/* Minimal Circular Prev/Next Switchers */}
            {hotEventsList.length > 1 && (
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-[9.5px] text-white/45 mr-1">
                  0{(hotEventIdx % hotEventsList.length) + 1} / 0
                  {hotEventsList.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setHotEventIdx(
                      (prev) =>
                        (prev - 1 + hotEventsList.length) % hotEventsList.length
                    )
                  }
                  className="w-8 h-8 rounded-full border border-white/20 hover:border-white text-white flex items-center justify-center text-xs cursor-pointer transition-colors"
                  aria-label="Previous spotlight event"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setHotEventIdx((prev) => (prev + 1) % hotEventsList.length)
                  }
                  className="w-8 h-8 rounded-full border border-white/20 hover:border-white text-white flex items-center justify-center text-xs cursor-pointer transition-colors"
                  aria-label="Next spotlight event"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Museum-Grade Full-Bleed Portrait Poster Card (4:5 Aspect) */}
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 shadow-[0_28px_70px_rgba(0,0,0,0.85)] bg-[#070709] flex flex-col justify-between">
            <img
              src={currentHotEvent.img}
              alt={currentHotEvent.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-105"
              loading="lazy"
              decoding="async"
            />

            {/* Deep Editorial Gradient Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(7,7,9,0.55) 0%, rgba(7,7,9,0.12) 38%, rgba(7,7,9,0.88) 76%, rgba(7,7,9,0.98) 100%)",
              }}
            />

            {/* Top Floating Glass Telemetry Bar */}
            <div
              style={{ padding: "16px" }}
              className="relative z-10 flex items-center justify-between"
            >
              <span
                style={{ padding: "5px 12px" }}
                className="rounded-full bg-black/55 backdrop-blur-md border border-white/20 font-mono text-[8.5px] tracking-[0.2em] uppercase text-white flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                {currentHotEvent.category}
              </span>

              <span
                style={{ padding: "5px 12px" }}
                className="rounded-full bg-white/10 backdrop-blur-md border border-white/15 font-mono text-[8.5px] tracking-[0.18em] uppercase text-[#D4A843] font-semibold"
              >
                {currentHotEvent.date}
              </span>
            </div>

            {/* Bottom Editorial Typography & Ivory Action Pill inside Poster */}
            <div
              style={{ padding: "22px 20px" }}
              className="relative z-10 space-y-4"
            >
              <div>
                <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase text-[#D4A843]">
                  <span>{currentHotEvent.location}</span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/70">
                    {currentHotEvent.filmStock || "35MM ARCHIVE"}
                  </span>
                </div>

                <h3
                  style={{ marginTop: "6px" }}
                  className="font-serif italic text-3xl sm:text-4xl text-white font-light leading-[1.05] tracking-tight"
                >
                  {currentHotEvent.title}
                </h3>

                <p
                  style={{ marginTop: "10px" }}
                  className="font-body text-xs text-white/75 leading-relaxed line-clamp-3"
                >
                  {currentHotEvent.description}
                </p>
              </div>

              <div
                style={{ paddingTop: "8px" }}
                className="border-t border-white/15 flex items-center justify-between gap-3"
              >
                <button
                  type="button"
                  onClick={() => {
                    setRegisterEventName(currentHotEvent.title);
                    setRegisterSubmitted(false);
                    setIsRegisterModalOpen(true);
                  }}
                  style={{ padding: "11px 20px" }}
                  className="flex-1 rounded-full bg-[#FAF9F5] hover:bg-[#D4A843] text-[#0A0A0D] font-sans text-xs font-semibold tracking-wide flex items-center justify-between cursor-pointer transition-colors shadow-lg"
                >
                  <span>Reserve Your Spot</span>
                  <span className="font-mono text-xs">↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hairline Bar: "ACTIVITIES +" */}
        <div style={{ padding: "0 20px 28px" }}>
          <button
            type="button"
            onClick={() => {
              setActivityFilterCat("ALL");
              setActiveActivitySlideIdx(0);
              setIsActivitiesPageOpen(true);
            }}
            className="osl-bar-btn border border-white/25 bg-white/[0.04] hover:bg-white hover:text-black text-white"
          >
            <span>ACTIVITIES ({activities.length} CHRONOLOGY WORKS)</span>
            <span className="text-lg leading-none font-light">+</span>
          </button>
        </div>
      </section>

      {/* ============================================================
          4. SEAMLESS ROTATING HALF-WHEEL COLORED FAN + CREATIVE OPTICAL LAB
             + "GALLERY +" BUTTON (Blends 100% with the #ECEBE6 Page!)
          ============================================================ */}
      <section
        id="mobile-light-bento-section"
        className="relative z-20 w-full bg-[#ECEBE6] text-[#111111]"
      >
        <div style={{ paddingTop: "32px" }}>
          <div
            style={{ paddingLeft: "20px", paddingRight: "20px" }}
            className="flex items-end justify-between"
          >
            <div>
              <span className="font-serif italic text-sm text-black/60 block">
                Curated Contact Sheet
              </span>
              <h2 className="font-heading font-black text-2xl uppercase tracking-[-0.03em] text-[#111111]">
                VISUAL ARCHIVE
              </h2>
            </div>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/45">
              [ {gallery.length} COLOR PLATES ]
            </span>
          </div>

          {/* Seamless Rotating Half-Wheel Fan (Blends directly with #ECEBE6!) */}
          <HalfWheelGalleryFan
            items={gallery}
            onSelectCard={(idx) => {
              setGalleryFilterCat("ALL");
              const chosen = gallery[idx];
              setExpandedGalleryId(
                chosen?._id || chosen?.id || String(idx)
              );
              setIsGalleryPageOpen(true);
            }}
          />
        </div>

        {/* 3-Column Interactive Optical Lab Deck */}
        <div className="grid grid-cols-3 w-full border-l border-black/15">
          <button
            type="button"
            onClick={() =>
              setActiveOpticalLab((prev) =>
                prev === "LOUPE" ? null : "LOUPE"
              )
            }
            className={`osl-bento-cell ${
              activeOpticalLab === "LOUPE" ? "active-lab" : ""
            }`}
          >
            <span className="font-mono text-[8px] opacity-55">01 // LAB</span>
            <span className="font-mono text-[9.5px] font-bold tracking-[0.14em] uppercase">
              35MM LOUPE
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveOpticalLab((prev) =>
                prev === "EMULSION" ? null : "EMULSION"
              )
            }
            className={`osl-bento-cell ${
              activeOpticalLab === "EMULSION" ? "active-lab" : ""
            }`}
          >
            <span className="font-mono text-[8px] opacity-55">02 // FILM</span>
            <span className="font-mono text-[9.5px] font-bold tracking-[0.14em] uppercase">
              EMULSION
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveOpticalLab((prev) =>
                prev === "STROBE" ? null : "STROBE"
              )
            }
            className={`osl-bento-cell ${
              activeOpticalLab === "STROBE" ? "active-lab" : ""
            }`}
          >
            <span className="font-mono text-[8px] opacity-55">03 // SPEC</span>
            <span className="font-mono text-[9.5px] font-bold tracking-[0.14em] uppercase">
              OPTICS RIG
            </span>
          </button>
        </div>

        {activeOpticalLab && (
          <div
            style={{ padding: "18px 20px" }}
            className="w-full bg-[#141417] text-white border-b border-black/15 space-y-4 animate-fade-in"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#D4A843] font-bold">
                ● INTERACTIVE OPTICAL LAB // {activeOpticalLab}
              </span>
              <button
                type="button"
                onClick={() => setActiveOpticalLab(null)}
                className="font-mono text-[9px] uppercase tracking-widest text-white/60"
              >
                CLOSE ✕
              </button>
            </div>

            {activeOpticalLab === "LOUPE" && (
              <div className="space-y-3">
                <p className="font-body text-xs text-white/80">
                  Tap a focal length below to preview how GCU photographers
                  frame subjects across prime lenses:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[24, 35, 50, 85].map((mm) => (
                    <button
                      key={mm}
                      type="button"
                      onClick={() => setSelectedFocalMm(mm)}
                      style={{ padding: "8px" }}
                      className={`rounded-lg font-mono text-[10px] font-bold uppercase cursor-pointer ${
                        selectedFocalMm === mm
                          ? "bg-[#D4A843] text-black"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {mm}MM
                    </button>
                  ))}
                </div>
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/15">
                  <img
                    src={gallery[0]?.src || FALLBACK_GALLERY[0].src}
                    alt="Focal Preview"
                    style={{
                      transform: `scale(${
                        selectedFocalMm === 24
                          ? 1
                          : selectedFocalMm === 35
                          ? 1.15
                          : selectedFocalMm === 50
                          ? 1.32
                          : 1.55
                      })`,
                    }}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/75 font-mono text-[9px] text-[#D4A843]">
                    {selectedFocalMm}MM PRIME ·{" "}
                    {selectedFocalMm === 85
                      ? "PORTRAIT COMPRESSION"
                      : selectedFocalMm === 50
                      ? "HUMAN EYE PERSPECTIVE"
                      : selectedFocalMm === 35
                      ? "STREET REPORTAGE"
                      : "ARCHITECTURAL WIDE"}
                  </div>
                </div>
              </div>
            )}

            {activeOpticalLab === "EMULSION" && (
              <div className="space-y-3">
                <p className="font-body text-xs text-white/80">
                  Switch between our club&apos;s 3 signature analog film
                  emulsions:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(["PORTRA", "CINESTILL", "VELVIA"] as const).map((stock) => (
                    <button
                      key={stock}
                      type="button"
                      onClick={() => setSelectedEmulsion(stock)}
                      style={{ padding: "8px" }}
                      className={`rounded-lg font-mono text-[9.5px] font-bold uppercase cursor-pointer ${
                        selectedEmulsion === stock
                          ? "bg-[#D92B2B] text-white"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {stock}
                    </button>
                  ))}
                </div>
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/15">
                  <img
                    src={gallery[2]?.src || FALLBACK_GALLERY[2].src}
                    alt="Emulsion Grade"
                    style={{
                      filter:
                        selectedEmulsion === "PORTRA"
                          ? "sepia(0.18) saturate(1.25) contrast(1.05)"
                          : selectedEmulsion === "CINESTILL"
                          ? "hue-rotate(-14deg) saturate(1.4) contrast(1.15)"
                          : "saturate(1.65) contrast(1.12)",
                    }}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/75 font-mono text-[9px] text-white">
                    {selectedEmulsion === "PORTRA"
                      ? "KODAK PORTRA 400 // WARM SKIN TONES"
                      : selectedEmulsion === "CINESTILL"
                      ? "CINESTILL 800T // TUNGSTEN HALATION"
                      : "FUJIFILM VELVIA 50 // VIVID CHROME"}
                  </div>
                </div>
              </div>
            )}

            {activeOpticalLab === "STROBE" && (
              <div className="space-y-2.5 font-mono text-[10px] text-white/80">
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-white/45">OPTICAL FORMAT</span>
                  <span className="text-[#D4A843] font-bold">
                    35MM FULL-FRAME &amp; 120 MEDIUM
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-white/45">STUDIO LIGHTING</span>
                  <span className="text-white font-bold">
                    GODEX AD600 PRO XENON STROBES
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-white/45">DARKROOM LOCATION</span>
                  <span className="text-[#8CE99A] font-bold">
                    GCU MEDIA LAB · AZARA
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Hairline Button: "GALLERY +" */}
        <div className="osl-pad-md">
          <button
            type="button"
            onClick={() => {
              setGalleryFilterCat("ALL");
              setExpandedGalleryId(null);
              setIsGalleryPageOpen(true);
            }}
            className="osl-bar-btn border border-black/25 bg-transparent hover:bg-[#111111] text-[#111111] hover:text-white"
          >
            <span>GALLERY // EXPLORE ALL {gallery.length} FRAMES</span>
            <span className="text-base leading-none">+</span>
          </button>
        </div>
      </section>

      {/* ============================================================
          5. "ABOUT" BANNER + 6-CHAPTER BAR + RESTORED FULL-BLEED MATRIX
             + COLORED STUDIO MEMBER CARDS
          ============================================================ */}
      <section
        id="mobile-light-about-section"
        className="relative z-20 w-full bg-[#FAF9F5] text-[#111111] border-t border-black/15"
      >
        <div className="relative w-full aspect-[16/9] bg-[#111111] flex items-center justify-center overflow-hidden">
          <img
            src="/images/gcu-campus-sketch.jpg"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=75";
            }}
            alt="About ShutterScape"
            className="absolute inset-0 w-full h-full object-cover opacity-65"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/40" />
          <div className="relative z-10 text-center px-4">
            <span className="font-mono text-[8.5px] tracking-[0.28em] uppercase text-[#D4A843] font-bold block mb-1">
              GIRIJANANDA CHOWDHURY UNIVERSITY
            </span>
            <h2 className="font-heading font-black text-3xl tracking-[0.06em] uppercase text-white">
              ABOUT US
            </h2>
          </div>
        </div>

        {/* 6-Chapter Horizontal Scrollable Taskbar */}
        <div className="w-full overflow-x-auto no-scrollbar bg-[#ECEBE6] border-y border-black/15 flex items-center">
          {ABOUT_CHAPTER_TABS.map((tab) => {
            const isActive = activeAboutTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAboutTab(tab.id)}
                className={`osl-chapter-pill shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#111111] text-white"
                    : "bg-[#ECEBE6] text-[#111111]/70"
                }`}
              >
                <span
                  className={
                    isActive ? "text-[#D4A843] font-bold" : "opacity-45"
                  }
                >
                  {tab.code}
                </span>
                <span>{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* CHAPTER 01: ORIGINS (Frameless, Borderless Text + Full-Bleed Matrix + Colored Photo) */}
        {activeAboutTab === "ORIGINS" && (
          <div className="osl-pad-lg space-y-4">
            <div>
              <h3 className="font-heading font-black text-3xl uppercase tracking-[-0.03em] text-[#111111]">
                STORYTELLERS
              </h3>
              <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-black/45 block mt-1">
                CHAPTER 01 // ORIGINS
              </span>
            </div>

            <StopMotionFlipbook matrixStack={matrixStack} />
          </div>
        )}

        {/* CHAPTER 02: THE TEACHERS */}
        {activeAboutTab === "THE TEACHERS" && (
          <div className="osl-pad-lg space-y-5">
            <div>
              <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-[#0F766E] font-bold block">
                CHAPTER 02 // THE TEACHERS
              </span>
              <h3 className="font-heading font-black text-2xl uppercase tracking-[-0.03em] text-[#111111] mt-1">
                THE TEACHERS WHO GUIDE US
              </h3>
              <p className="font-body text-xs text-black/65 mt-1 leading-relaxed">
                Our faculty coordinators who mentor our visual archive,
                symposia, and campus-wide exhibitions at GCU.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {mentorsList.map((person, idx) =>
                renderStudioMemberCard(person, idx)
              )}
            </div>
          </div>
        )}

        {/* CHAPTER 03: BEHIND THE LENS */}
        {activeAboutTab === "BEHIND THE LENS" && (
          <div className="osl-pad-lg space-y-5">
            <div>
              <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-[#D92B2B] font-bold block">
                CHAPTER 03 // LEADERSHIP
              </span>
              <h3 className="font-heading font-black text-2xl uppercase tracking-[-0.03em] text-[#111111] mt-1">
                BEHIND THE LENS
              </h3>
              <p className="font-body text-xs text-black/65 mt-1 leading-relaxed">
                Student executive directors leading expeditions, darkroom
                critiques, and curation across Assam.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {leadsList.map((person, idx) =>
                renderStudioMemberCard(person, idx + 2)
              )}
            </div>
          </div>
        )}

        {/* CHAPTER 04: CORE MEMBERS */}
        {activeAboutTab === "CORE MEMBERS" && (
          <div className="osl-pad-lg space-y-5">
            <div>
              <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-[#1864AB] font-bold block">
                CHAPTER 04 // THE FOUNDATION
              </span>
              <h3 className="font-heading font-black text-2xl uppercase tracking-[-0.03em] text-[#111111] mt-1">
                CORE MEMBERS
              </h3>
              <p className="font-body text-xs text-black/65 mt-1 leading-relaxed">
                The creative backbone driving street reportage, strobe
                portraiture, landscape expeditions, and motion reels.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {coreList.map((person, idx) =>
                renderStudioMemberCard(person, idx + 1)
              )}
            </div>
          </div>
        )}

        {/* CHAPTER 05: WHERE IT ALL STARTED */}
        {activeAboutTab === "WHERE IT ALL STARTED" && (
          <div className="osl-pad-lg space-y-5">
            <div>
              <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-[#B45309] font-bold block">
                CHAPTER 05 // GENESIS
              </span>
              <h3 className="font-heading font-black text-2xl uppercase tracking-[-0.03em] text-[#111111] mt-1">
                WHERE IT ALL STARTED
              </h3>
              <p className="font-body text-xs text-black/65 mt-1 leading-relaxed">
                Founded in 2023 to unite Girijananda Chowdhury University&apos;s
                visual storytellers under one banner.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {foundersList.map((person, idx) =>
                renderStudioMemberCard(person, idx + 4)
              )}
            </div>
          </div>
        )}

        {/* CHAPTER 06: CARRYING IT FORWARD */}
        {activeAboutTab === "CARRYING IT FORWARD" && (
          <div className="osl-pad-lg space-y-5">
            <div>
              <span className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-[#6B21A8] font-bold block">
                CHAPTER 06 // LEGACY
              </span>
              <h3 className="font-heading font-black text-2xl uppercase tracking-[-0.03em] text-[#111111] mt-1">
                CARRYING IT FORWARD
              </h3>
              <p className="font-body text-xs text-black/65 mt-1 leading-relaxed">
                Alumni torchbearers whose early exhibitions and mentorship built
                the creative culture of ShutterScape.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {legacyList.map((person, idx) =>
                renderStudioMemberCard(person, idx + 3)
              )}
            </div>
          </div>
        )}
      </section>

      {/* ============================================================
          6. FRAMES IN MOTION — 3D CENTERED VIDEO REEL CAROUSEL
             (Exact Match to Second Screenshot & FramesOfMoments.tsx)
          ============================================================ */}
      <section
        id="mobile-chronology-matrix"
        className="relative z-20 w-full bg-[#070709] text-white border-t border-white/10 overflow-hidden"
      >
        {/* Subtle Ambient Radial Red Glow */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse 65% 45% at 50% 25%, rgba(239, 68, 68, 0.22) 0%, transparent 75%)",
          }}
        />

        {/* HEADER: Red Script Title & Subtitle & SEE MORE link */}
        <div
          style={{ padding: "36px 20px 14px" }}
          className="relative z-10 flex flex-col items-center justify-center text-center gap-2 w-full max-w-md mx-auto"
        >
          <h2 className="font-script text-5xl sm:text-6xl font-bold tracking-normal leading-[0.9]">
            <span className="text-white drop-shadow-sm">Frames in </span>
            <span className="text-[#EF4444] drop-shadow-[0_0_35px_rgba(239,68,68,0.45)]">
              Motion
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-[13px] text-gray-400 font-medium tracking-wide">
            Moments in motion — from the club and its members.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setGalleryFilterCat("ALL");
                setExpandedGalleryId(null);
                setIsGalleryPageOpen(true);
              }}
              className="group inline-flex items-center justify-center gap-2 font-mono text-[9.5px] font-bold uppercase tracking-[0.22em] text-white/70 hover:text-white cursor-pointer transition-colors"
            >
              <span>SEE MORE</span>
              <span className="text-[#EF4444] group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>

        {/* 3D CENTERED CAROUSEL OF VIDEO CARDS (Exact Match to Second Screenshot!) */}
        <div
          className="relative w-full h-[54vh] min-h-[400px] max-h-[520px] flex items-center justify-center overflow-hidden my-2"
          onTouchStart={handleReelTouchStart}
          onTouchEnd={handleReelTouchEnd}
        >
          {reels.map((reel, index) => {
            const isActive = index === activeReelIdx;
            const isActiveAudio = activeAudioReelIdx === index;
            const isAdjacent =
              Math.abs(index - activeReelIdx) === 1 ||
              (index === 0 && activeReelIdx === reels.length - 1) ||
              (index === reels.length - 1 && activeReelIdx === 0);
            const isVisibleCard = isActive || isAdjacent;

            return (
              <div
                key={reel._id || reel.id || index}
                onClick={() => handleReelCardClick(index)}
                className="absolute top-1/2 left-1/2 w-[74vw] max-w-[280px] aspect-[9/16] max-h-[52vh] rounded-[24px] overflow-hidden group bg-[#0A0A0D] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.8)] cursor-pointer select-none"
                style={getReelCardStyle(index)}
              >
                {/* Silky Smooth: Only render video on visible cards (active + adjacent) */}
                {isVisibleCard ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                      if (el) {
                        el.defaultMuted = true;
                        el.muted = activeAudioReelIdx !== index;
                      }
                    }}
                    src={reel.videoSrc}
                    autoPlay={isActive}
                    loop={!isActive}
                    muted={activeAudioReelIdx !== index}
                    playsInline
                    preload={isActive ? "auto" : "metadata"}
                    onLoadedData={(e) => {
                      const video = e.currentTarget;
                      video.defaultMuted = true;
                      video.muted = activeAudioReelIdx !== index;
                      if (isActive) video.play().catch(() => {});
                    }}
                    onTimeUpdate={(e) => {
                      const video = e.currentTarget;
                      if (video.duration && !isNaN(video.duration)) {
                        const pct = (video.currentTime / video.duration) * 100;
                        setReelProgressMap((prev) => ({
                          ...prev,
                          [reel.id || String(index)]: pct,
                        }));
                        if (isActive && video.currentTime >= video.duration - 0.08) {
                          handleReelVideoEnded(index);
                        }
                      }
                    }}
                    onEnded={() => handleReelVideoEnded(index)}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#0A0A0D]" />
                )}

                {/* Dark Gradients for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30 opacity-85 pointer-events-none" />

                {/* Active Card Subtle Glowing Border */}
                <div
                  className={`absolute inset-0 border-2 rounded-[24px] pointer-events-none transition-all duration-500 ${
                    isActive ? "border-white/35" : "border-transparent"
                  }`}
                />

                {/* Top Audio Indicator on Active Card */}
                {isActive && (
                  <div className="absolute top-4 right-4 z-10 pointer-events-none">
                    {isActiveAudio ? (
                      <div className="bg-black/65 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg">
                        <div className="sound-wave">
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-80">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Author Badge & Name (Always Visible on Cards) */}
                <div
                  style={{ padding: "14px 16px" }}
                  className="absolute bottom-0 inset-x-0 flex items-center gap-2.5 pointer-events-none"
                >
                  <div className="w-7 h-7 rounded-full bg-white text-[#050505] font-sans font-bold text-[9px] flex items-center justify-center shadow-md shrink-0">
                    {getReelInitials(reel.photographer)}
                  </div>
                  <span className="font-sans font-semibold text-xs text-white drop-shadow-md truncate">
                    {reel.photographer}
                  </span>
                </div>

                {/* PROGRESSIVE TIMELINE BAR FOR EACH VIDEO */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20 z-20 pointer-events-none overflow-hidden">
                  <div
                    className="h-full bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.85)]"
                    style={{
                      width: `${reelProgressMap[reel.id || String(index)] || 0}%`,
                      transition: "width 0.12s linear",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER HINT */}
        <div className="text-center pb-5 pt-1">
          <p className="font-sans text-[10.5px] text-white/45 font-medium tracking-wide">
            Tap a reel to watch it with sound · Swipe to navigate
          </p>
        </div>

        {/* REGISTER BUTTON */}
        <div className="w-full">
          <button
            type="button"
            onClick={() => {
              setRegisterEventName("");
              setRegisterSubmitted(false);
              setIsRegisterModalOpen(true);
            }}
            className="osl-bar-btn bg-[#D92B2B] text-white border-y border-white/15"
          >
            <span>REGISTER YOUR INTEREST // JOIN SHUTTERSCAPE</span>
            <span className="text-lg leading-none">+</span>
          </button>
        </div>
      </section>

      {/* ============================================================
          7. COMPACT CORPORATE-GRADE MINIMALIST FOOTER (ZERO OVERFLOW)
          ============================================================ */}
      <footer
        id="mobile-global-footer"
        style={{
          padding: "18px 14px 82px 14px",
          backgroundColor: "#FAF9F5",
          color: "#0A0A0C",
        }}
        className="relative z-20 w-full border-t border-black/10 select-none overflow-hidden"
      >
        {/* Responsive SVG Watermark: Guarantees all 12 letters of SHUTTERSCAPE fit 100% inside the screen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 bottom-12 flex items-center justify-center overflow-hidden select-none"
        >
          <svg
            viewBox="0 0 620 64"
            className="w-full h-auto overflow-visible"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="50%"
              y="52"
              textAnchor="middle"
              fill="rgba(10, 10, 12, 0.045)"
              style={{
                fontFamily: "var(--font-sora), system-ui, sans-serif",
                fontWeight: 900,
                fontSize: "62px",
                letterSpacing: "0.02em",
              }}
            >
              SHUTTERSCAPE
            </text>
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto flex flex-col gap-2.5">
          {/* ROW 1: Dual Brand Crest (Left) + Compact Social Pills (Right — Zero Right Overflow!) */}
          <div
            style={{ paddingBottom: "10px" }}
            className="w-full flex items-center justify-between gap-1.5 border-b border-black/[0.08]"
          >
            <div className="flex items-center gap-2 min-w-0 shrink">
              <div
                style={{ width: "64px", height: "18px" }}
                className="relative shrink-0"
              >
                <Image
                  src="/images/shutterscape-logo-cropped.png"
                  alt="ShutterScape"
                  fill
                  sizes="64px"
                  unoptimized
                  className="object-contain object-left"
                />
              </div>

              <span className="h-3 w-[1px] bg-black/15 shrink-0" />

              <a
                href="https://gcu.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                title="Girijananda Chowdhury University"
                style={{ width: "70px", height: "18px" }}
                className="relative opacity-90 hover:opacity-100 transition-opacity shrink-0"
              >
                <Image
                  src="/images/gcu-logo-black-text.png"
                  alt="GCU"
                  fill
                  sizes="70px"
                  unoptimized
                  className="object-contain object-left"
                />
              </a>
            </div>

            {/* Compact Corporate Social Pills */}
            <div className="flex items-center gap-1 shrink-0">
              <a
                href="https://www.instagram.com/shutterscape_gcu"
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "4px 8px" }}
                className="rounded-full bg-black/[0.05] hover:bg-[#111111] text-[#111111] hover:text-white font-sans text-[9.5px] font-semibold tracking-tight flex items-center gap-0.5 transition-colors whitespace-nowrap"
              >
                <span>Instagram</span>
                <span className="text-[8.5px] opacity-60">↗</span>
              </a>
              <a
                href="https://chat.whatsapp.com/Hs71BicR1Xj3PmOyPJ5wdc?s=sw&p=a&mlu=4&ilr=4"
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "4px 8px" }}
                className="rounded-full bg-[#111111] text-white font-sans text-[9.5px] font-semibold tracking-tight flex items-center gap-0.5 transition-opacity hover:opacity-85 whitespace-nowrap"
              >
                <span>WhatsApp</span>
                <span className="text-[8.5px] text-[#D4A843]">↗</span>
              </a>
            </div>
          </div>

          {/* ROW 2: Sleek Single-Line Contact & Campus Map Strip */}
          <div
            style={{ paddingBottom: "10px" }}
            className="w-full flex items-center justify-between gap-2 border-b border-black/[0.08] font-sans text-[10px] text-black/75"
          >
            <a
              href="mailto:shutterscape@gcuniversity.ac.in"
              className="flex items-center gap-1.5 hover:text-black transition-colors min-w-0 truncate"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black/45 shrink-0"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="truncate font-medium">
                shutterscape@gcuniversity.ac.in
              </span>
            </a>

            <a
              href="https://maps.app.goo.gl/NhdHs1u76Bjxo2J87"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-black/65 hover:text-black font-medium shrink-0 whitespace-nowrap transition-colors"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#D92B2B] shrink-0"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Azara, Guwahati</span>
              <span className="text-[8.5px] opacity-50">↗</span>
            </a>
          </div>

          {/* ROW 3: Compact Legal & Attribution Bar (Clears the Floating Navbar Bubble!) */}
          <div className="w-full flex items-center justify-between gap-2 pt-0.5 font-sans text-[9.5px] text-black/50">
            <span className="font-mono text-[8px] tracking-[0.1em] uppercase whitespace-nowrap">
              © 2026 SHUTTERSCAPE GCU
            </span>

            <div className="flex items-center gap-1 text-[9.5px] text-black/65 whitespace-nowrap">
              <span>
                Crafted by{" "}
                <strong className="font-semibold text-[#111111]">
                  Krishnayan
                </strong>
              </span>
              <span className="text-black/25">·</span>
              <a
                href="https://codingclub.gcuniversity.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#111111] hover:underline"
              >
                Codénix
              </a>
            </div>
          </div>
        </div>
      </footer>


      {/* ============================================================
          PAGE OVERLAY 1: EXECUTIVE EDITORIAL ACTIVITIES PAGE
          (Fixes Screenshot 2: Refined Serif + Geometric Typography, Clean
          Header, Zero Text Collisions, and Full Editorial Story Panel!)
          ============================================================ */}
      {isActivitiesPageOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#F7F6F1] text-[#111111] flex flex-col justify-between overflow-y-auto animate-fade-in">
          {/* Sticky Editorial Header + Clean Category Taskbar */}
          <div className="sticky top-0 z-30 bg-[#F7F6F1]/95 backdrop-blur-md border-b border-black/10">
            <div
              style={{ padding: "14px 20px" }}
              className="flex items-center justify-between"
            >
              <button
                type="button"
                onClick={() => setIsActivitiesPageOpen(false)}
                style={{ padding: "7px 14px" }}
                className="rounded-full bg-[#111111] text-white font-sans text-xs font-semibold tracking-wide flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>←</span>
                <span>Back</span>
              </button>

              <div className="text-center">
                <span className="font-serif italic text-base text-[#111111] block leading-none">
                  Field Works &amp; Chronology
                </span>
              </div>

              <span
                style={{ padding: "4px 10px" }}
                className="rounded-full bg-black/[0.06] text-[#111111] font-mono text-[9px] font-bold uppercase tracking-wider"
              >
                {filteredActivityItems.length} Works
              </span>
            </div>

            {/* Refined Segmented Category Taskbar */}
            <div
              style={{ padding: "10px 20px" }}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-black/8 bg-[#ECEBE6]/80"
            >
              {[
                { key: "ALL", label: "All Works" },
                { key: "PHOTOWALK", label: "Photowalks" },
                { key: "WORKSHOP", label: "Workshops" },
                { key: "EXHIBITION", label: "Exhibitions" },
                { key: "COMPETITION", label: "Competitions" },
                { key: "2026", label: "Works '26" },
                { key: "2025", label: "Works '25" },
              ].map((cat) => {
                const isSelected = activityFilterCat === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => {
                      setActivityFilterCat(cat.key);
                      setActiveActivitySlideIdx(0);
                    }}
                    style={{ padding: "6px 14px" }}
                    className={`rounded-full font-sans text-xs font-semibold shrink-0 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#111111] text-white shadow-xs"
                        : "bg-white text-black/65 border border-black/10"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{ padding: "24px 0 20px" }} className="flex-1 space-y-5">
            {/* Editorial Heading */}
            <div style={{ padding: "0 20px" }}>
              <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#D92B2B] font-bold block">
                ARCHIVE DIRECTORY // 2025–2026
              </span>
              <h2
                style={{ marginTop: "4px" }}
                className="font-serif text-3xl text-[#111111] font-light leading-[1.08] tracking-tight"
              >
                Continue Exploring{" "}
                <span className="italic font-normal">ShutterScape.</span>
              </h2>
            </div>

            {/* Horizontal Peek Card Carousel (Self-Contained Cards — ZERO Text Overlap!) */}
            <div
              ref={activitiesPeekScrollRef}
              onScroll={(e) => {
                const container = e.currentTarget;
                const cardWidth = container.clientWidth * 0.8;
                const idx = Math.round(container.scrollLeft / cardWidth);
                if (
                  idx !== activeActivitySlideIdx &&
                  idx >= 0 &&
                  idx < filteredActivityItems.length
                ) {
                  setActiveActivitySlideIdx(idx);
                }
              }}
              style={{ paddingLeft: "20px", paddingRight: "20px" }}
              className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar"
            >
              {filteredActivityItems.map((ev, idx) => {
                const isSelectedCard = idx === activeActivitySlideIdx;
                return (
                  <div
                    key={ev._id || ev.id || idx}
                    onClick={() => scrollActivitiesPeekTo(idx)}
                    className={`shrink-0 w-[78vw] max-w-[325px] snap-start flex flex-col transition-opacity duration-300 cursor-pointer ${
                      isSelectedCard ? "opacity-100" : "opacity-75"
                    }`}
                  >
                    {/* Framed Poster Card */}
                    <div className="relative w-full aspect-[4/4.2] rounded-2xl overflow-hidden bg-[#111111] shadow-[0_14px_34px_rgba(0,0,0,0.14)] border border-black/10">
                      <img
                        src={ev.img}
                        alt={ev.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25" />

                      {/* Top Glass Badges */}
                      <div
                        style={{ padding: "12px" }}
                        className="absolute top-0 inset-x-0 flex items-center justify-between"
                      >
                        <span
                          style={{ padding: "4px 10px" }}
                          className="rounded-full bg-black/65 backdrop-blur-md text-[#D4A843] font-mono text-[8.5px] font-bold uppercase tracking-[0.16em]"
                        >
                          {ev.category} · &apos;{String(ev.year).slice(-2)}
                        </span>
                        {ev.isUpcoming && (
                          <span
                            style={{ padding: "4px 10px" }}
                            className="rounded-full bg-[#10B981] text-[#050505] font-mono text-[8.5px] font-bold uppercase tracking-[0.14em]"
                          >
                            ● Live RSVP
                          </span>
                        )}
                      </div>

                      {/* Centered Editorial Action Pill inside Image */}
                      <div className="absolute bottom-5 inset-x-0 flex justify-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRegisterEventName(ev.title);
                            setRegisterSubmitted(false);
                            setIsRegisterModalOpen(true);
                          }}
                          style={{ padding: "9px 20px" }}
                          className="rounded-full bg-[#D92B2B] hover:bg-[#B91C1C] text-white font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] shadow-lg cursor-pointer"
                        >
                          [ {ev.isUpcoming ? "JOIN / RSVP" : "EXPLORE"} ]
                        </button>
                      </div>
                    </div>

                    {/* Clean 1-Line Caption Under Card (Never collides with adjacent card!) */}
                    <div
                      style={{ paddingTop: "10px", paddingRight: "8px" }}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="font-heading font-bold text-xs uppercase tracking-tight text-[#111111] truncate">
                        {ev.shortTitle || ev.title}
                      </span>
                      <span className="font-mono text-[9px] text-black/50 uppercase shrink-0">
                        {ev.date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ← PREV | Progress Line | NEXT → Bar */}
            <div
              style={{ padding: "6px 20px" }}
              className="flex items-center justify-between gap-4"
            >
              <button
                type="button"
                onClick={() =>
                  scrollActivitiesPeekTo(activeActivitySlideIdx - 1)
                }
                className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111] flex items-center gap-1.5 cursor-pointer"
              >
                <span>←</span>
                <span>PREV</span>
              </button>

              <div className="flex-1 h-[2px] bg-black/12 relative overflow-hidden rounded-full">
                <div
                  style={{
                    width: `${
                      ((activeActivitySlideIdx + 1) /
                        Math.max(1, filteredActivityItems.length)) *
                      100
                    }%`,
                  }}
                  className="h-full bg-[#111111] transition-all duration-300"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  scrollActivitiesPeekTo(activeActivitySlideIdx + 1)
                }
                className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111] flex items-center gap-1.5 cursor-pointer"
              >
                <span>NEXT</span>
                <span>→</span>
              </button>
            </div>

            {/* Dedicated Full-Width Active Event Story Panel (Zero Clipping or Overlap!) */}
            {activeActivityDetail && (
              <div
                style={{ margin: "0 20px", padding: "20px" }}
                className="rounded-2xl bg-white border border-black/10 shadow-[0_8px_28px_rgba(0,0,0,0.05)] space-y-3"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#D92B2B] font-bold">
                    0{activeActivitySlideIdx + 1} //{" "}
                    {activeActivityDetail.category} ·{" "}
                    {activeActivityDetail.date}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-black/45">
                    {activeActivityDetail.filmStock ||
                      activeActivityDetail.exif}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[#111111] font-normal leading-snug">
                  {activeActivityDetail.title}
                </h3>

                <p className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-black/55">
                  📍 {activeActivityDetail.location}
                </p>

                <p className="font-body text-xs text-black/75 leading-relaxed pt-1">
                  {activeActivityDetail.description}
                </p>
              </div>
            )}
          </div>

          {/* Refined Dark Editorial Footer Block */}
          <div
            style={{ padding: "24px 20px" }}
            className="bg-[#111113] text-white space-y-2.5"
          >
            <span className="font-serif italic text-lg text-[#D4A843] block">
              ShutterScape GCU
            </span>
            <p className="font-body text-xs text-white/70 leading-relaxed">
              With every photowalk, Xenon strobe clinic, and annual print
              exhibition at Girijananda Chowdhury University, we document
              stories that outlive the moment.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================
          PAGE OVERLAY 2: DEDICATED FULL-SCREEN GALLERY PAGE (Video 5)
          ============================================================ */}
      {isGalleryPageOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#0B0B0E] text-white overflow-y-auto animate-fade-in">
          <div className="sticky top-0 z-40 bg-[#0B0B0E]/95 backdrop-blur-md border-b border-white/10">
            <div
              style={{ padding: "14px 18px" }}
              className="flex items-center justify-between"
            >
              <button
                type="button"
                onClick={() => setIsGalleryPageOpen(false)}
                style={{ padding: "7px 14px" }}
                className="rounded-full bg-white text-[#0B0B0E] font-mono text-[10px] font-bold uppercase tracking-[0.18em] flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>←</span>
                <span>BACK</span>
              </button>

              <span className="font-serif italic text-lg tracking-wide text-white">
                ShutterScape{" "}
                <span className="font-mono not-italic text-[10px] text-[#D4A843] uppercase tracking-widest">
                  Archive
                </span>
              </span>

              <span className="font-mono text-[9.5px] tracking-[0.18em] text-white/60 uppercase">
                {filteredGalleryItems.length} PLATES
              </span>
            </div>

            <div
              style={{ padding: "8px 18px" }}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-white/10 bg-black/50"
            >
              {[
                "ALL",
                "DOCUMENTARY",
                "PORTRAITURE",
                "LANDSCAPE",
                "ARCHITECTURE",
                "STREET",
                "EXPERIMENTAL",
              ].map((cat) => {
                const isSelected = galleryFilterCat === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setGalleryFilterCat(cat)}
                    style={{ padding: "6px 12px" }}
                    className={`rounded-full font-mono text-[9px] font-bold uppercase tracking-[0.16em] shrink-0 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#D4A843] text-[#050505]"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {cat === "ALL" ? "ALL PLATES" : cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            style={{ padding: "16px 14px 48px" }}
            className="space-y-4 max-w-xl mx-auto"
          >
            {filteredGalleryItems.map((item, idx) => {
              const cardKey = item._id || item.id || String(idx);
              const isExpanded = expandedGalleryId === cardKey;

              return (
                <div
                  key={cardKey}
                  className="relative w-full rounded-2xl overflow-hidden bg-[#141418] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.75)]"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover saturate-[1.12]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/35" />

                    <div
                      style={{ padding: "12px 14px" }}
                      className="absolute top-0 inset-x-0 flex items-center justify-between font-mono text-[8.5px] tracking-[0.2em] uppercase"
                    >
                      <span className="px-2.5 py-1 rounded bg-black/70 text-[#D4A843] font-bold">
                        {item.category}
                      </span>
                      <span className="text-white/75">{item.filmStock}</span>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
                      <h3 className="font-serif text-2xl sm:text-3xl text-white font-light tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                        {item.title}
                      </h3>
                      <p
                        style={{ marginTop: "4px" }}
                        className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-white/85"
                      >
                        BY {item.photographer}
                      </p>
                    </div>

                    <div className="absolute bottom-3.5 inset-x-0 flex justify-center">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedGalleryId(isExpanded ? null : cardKey)
                        }
                        style={{ padding: "7px 16px" }}
                        className="rounded-md bg-white/95 hover:bg-[#D4A843] text-[#050505] font-mono text-[9px] font-bold uppercase tracking-[0.18em] shadow-lg cursor-pointer transition-colors"
                      >
                        {isExpanded ? "− HIDE DETAILS" : "+ VIEW IN LOUPE"}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div
                      style={{ padding: "16px 18px" }}
                      className="bg-[#18181F] border-t border-white/10 space-y-2.5 animate-fade-in"
                    >
                      <div className="flex items-center justify-between font-mono text-[9px] text-[#D4A843] uppercase tracking-[0.18em]">
                        <span>EXIF // {item.exif || "35MM · F/2.0"}</span>
                        <span>📍 {item.location || "GCU ARCHIVE"}</span>
                      </div>
                      <p className="font-body text-xs text-white/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL 3: STUDIO MEMBER BIO SHEET (With ← BACK Button)
          ============================================================ */}
      {selectedMemberModal && (
        <div
          onClick={() => setSelectedMemberModal(null)}
          style={{ padding: "20px" }}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ padding: "22px" }}
            className="w-full max-w-sm bg-white text-[#111111] rounded-3xl shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedMemberModal(null)}
                style={{ padding: "6px 12px" }}
                className="rounded-full bg-[#111111] text-white font-mono text-[9.5px] font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
              >
                <span>←</span>
                <span>BACK</span>
              </button>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/45 font-bold">
                SHUTTERSCAPE ROSTER
              </span>
            </div>

            <div
              style={{
                backgroundColor: selectedMemberModal.bgColor,
                clipPath:
                  "polygon(0 0, 100% 0, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
              }}
              className="relative w-full aspect-[4/4.2] rounded-2xl overflow-hidden"
            >
              <img
                src={selectedMemberModal.person.img}
                alt={selectedMemberModal.person.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-[#D92B2B] font-bold block">
                {selectedMemberModal.person.role}
              </span>
              <h3 className="font-heading font-black text-2xl text-[#111111]">
                {selectedMemberModal.person.name}
              </h3>
              {selectedMemberModal.person.dept && (
                <p className="font-mono text-[10px] text-black/55">
                  {selectedMemberModal.person.dept}
                </p>
              )}
              <p className="font-body text-xs text-black/75 leading-relaxed pt-2">
                {selectedMemberModal.person.bio ||
                  `${selectedMemberModal.person.name} is a key member of ShutterScape at Girijananda Chowdhury University, contributing to exhibitions, photowalks, and archival documentation.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL 4: "REGISTER YOUR INTEREST" SWISS FORM MODAL (With ← BACK Button)
          ============================================================ */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#FAF9F5] text-[#111111] overflow-y-auto animate-fade-in flex flex-col justify-between">
          <div>
            <div className="osl-pad-md flex items-center justify-between border-b border-black/15 sticky top-0 bg-[#FAF9F5]/95 z-20">
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(false)}
                style={{ padding: "6px 12px" }}
                className="rounded-full bg-[#111111] text-white font-mono text-[9.5px] tracking-[0.18em] uppercase font-bold cursor-pointer flex items-center gap-1.5"
              >
                <span>←</span>
                <span>BACK</span>
              </button>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#111111] font-bold">
                JOIN SHUTTERSCAPE &apos;26
              </span>
            </div>

            <div className="osl-pad-lg space-y-6">
              <div>
                <h2 className="font-heading font-black text-3xl uppercase tracking-[-0.03em] leading-[0.95] text-[#111111]">
                  REGISTER
                  <br />
                  YOUR INTEREST
                  <br />
                  IN SHUTTERSCAPE:
                </h2>
                {registerEventName && (
                  <span
                    style={{ marginTop: "8px", padding: "4px 10px" }}
                    className="inline-block rounded bg-[#D4A843] text-[#050505] font-mono text-[9.5px] font-bold uppercase tracking-wider"
                  >
                    EVENT RSVP // {registerEventName}
                  </span>
                )}
              </div>

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
                    defaultValue={
                      registerEventName
                        ? `RSVP for ${registerEventName} — `
                        : ""
                    }
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
