// src/app/about/page.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroller from "@/components/cinematic/SmoothScroller";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// DATA PAYLOADS
// ==========================================
interface MemberRecord {
  name: string;
  role: string;
  dept?: string;
  bio?: string;
  img: string;
}

const MENTORS: MemberRecord[] = [
  {
    name: "Dr. Sangeeta Das",
    role: "Coordinator",
    dept: "Dept. of Mechanical Engineering",
    bio: "As Faculty Coordinator of ShutterScape, Dr. Sangeeta Das guides the club's annual exhibitions, inter-university visual symposia, and archival documentation initiatives across Girijananda Chowdhury University.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Dr. Barsha Chhetri",
    role: "Co-Coordinator",
    dept: "Assistant Professor & Head (i/c) Dept. of Education",
    bio: "Dr. Barsha Chhetri mentors student storytellers in visual literacy, cultural documentation, and curatorial ethics, bridging academic inquiry with creative expression.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
];

const LEADS: MemberRecord[] = [
  {
    name: "Uttama Purkayastha",
    role: "PRESIDENT",
    dept: "Executive Leadership · ShutterScape GCU",
    bio: "Leads the creative direction, campus-wide exhibitions, and visual archive curation for ShutterScape, fostering a welcoming community for both analog and digital photographers.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Ikhyt De Neog",
    role: "VICE-PRESIDENT",
    dept: "Operations & Field Expeditions",
    bio: "Coordinates outdoor photowalks, technical lighting workshops, and inter-collegiate photography challenges across Assam and the Northeast.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Richita Sarma",
    role: "SECRETARY",
    dept: "Editorial & Archive Administration",
    bio: "Oversees member onboarding, exhibition catalogs, and the preservation of student photographic plates within the permanent GCU archive.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
  },
];

const CORE_MEMBERS: MemberRecord[] = [
  {
    name: "Sohaib Hussain",
    role: "Core Committee",
    dept: "Documentary & Street Division",
    bio: "Specializes in high-shutter action documentary and candid street narratives across Guwahati.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Mahadananda Dutta",
    role: "Core Committee",
    dept: "Optics & Lighting Lead",
    bio: "Focuses on studio strobe choreography, Chiaroscuro portraiture, and manual lens experimentation.",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Manash Pratim Sarma",
    role: "Core Committee",
    dept: "Landscape & Expedition Lead",
    bio: "Documents alpine ridges, riverfront twilight, and ecological heritage throughout Upper and Lower Assam.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Mubina Ahmed",
    role: "Core Committee",
    dept: "Curation & Print Design",
    bio: "Manages exhibition sequencing, matte framing standards, and visual storytelling critiques.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Pratyush B. Choudhury",
    role: "Core Committee",
    dept: "Cinematography & Motion Reels",
    bio: "Directs vertical motion reels, color grading workflows, and behind-the-scenes event films.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Hiya Das",
    role: "Core Committee",
    dept: "Architectural & Spatial Study",
    bio: "Explores brutalist geometry, symmetry, and natural shadow play across campus structures.",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
  },
];

const FOUNDERS: MemberRecord[] = [
  {
    name: "Dheemaan Deka",
    role: "2023 // Co-Founder",
    dept: "Founding Visionary",
    bio: "Co-founded ShutterScape in 2023 to unite Girijananda Chowdhury University's visual artists under a single creative collective.",
    img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Subhrajyoti Goswami",
    role: "2023 // Co-Founder",
    dept: "Founding Architect",
    bio: "Established the club's signature photowalk culture, darkroom critique sessions, and annual campus print exhibitions.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
  },
];

const LEGACY: MemberRecord[] = [
  {
    name: "Gargi Medhi",
    role: "Legacy Torchbearer",
    dept: "Alumni Mentorship Council",
    bio: "Pioneered early portraiture symposia and continues to mentor incoming student photographers.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dheemaan Deka",
    role: "Legacy Torchbearer",
    dept: "Founding Chapter",
    bio: "Set the foundational creative benchmark for ShutterScape's visual archive.",
    img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Imran Farhat",
    role: "Legacy Torchbearer",
    dept: "Nocturnal & Street Archive",
    bio: "Known for low-light urban documentation and training junior members in manual exposure.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Subhrajyoti Goswami",
    role: "Legacy Torchbearer",
    dept: "Founding Chapter",
    bio: "Built the bridge between technical optics education and expressive visual art at GCU.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
  },
];

// Atlassian-inspired vibrant backdrop themes that shift color on hover
const CARD_THEMES = [
  {
    baseBg: "#F5B700", // Warm Gold
    hoverBg: "#00C7E6", // Vivid Cyan
    stripeColor: "rgba(17, 24, 39, 0.22)",
  },
  {
    baseBg: "#00C7E6", // Vivid Cyan
    hoverBg: "#F5B700", // Warm Gold
    stripeColor: "rgba(17, 24, 39, 0.22)",
  },
  {
    baseBg: "#4C9AFF", // Periwinkle Blue
    hoverBg: "#10B981", // Emerald Mint
    stripeColor: "rgba(255, 255, 255, 0.28)",
  },
  {
    baseBg: "#FF6B6B", // Coral Rose
    hoverBg: "#8B5CF6", // Electric Violet
    stripeColor: "rgba(17, 24, 39, 0.2)",
  },
  {
    baseBg: "#10B981", // Emerald Mint
    hoverBg: "#F59E0B", // Amber Gold
    stripeColor: "rgba(17, 24, 39, 0.2)",
  },
  {
    baseBg: "#8B5CF6", // Royal Violet
    hoverBg: "#00C7E6", // Vivid Cyan
    stripeColor: "rgba(255, 255, 255, 0.25)",
  },
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
  const [mentors, setMentors] = useState<MemberRecord[]>(MENTORS);
  const [leads, setLeads] = useState<MemberRecord[]>(LEADS);
  const [coreMembers, setCoreMembers] = useState<MemberRecord[]>(CORE_MEMBERS);
  const [founders, setFounders] = useState<MemberRecord[]>(FOUNDERS);
  const [legacy, setLegacy] = useState<MemberRecord[]>(LEGACY);

  // Selected member for the Atlassian-style split bio modal
  const [selectedMember, setSelectedMember] = useState<{
    member: MemberRecord;
    themeIndex: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/committee")
      .then((r) => r.json())
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const sanitizeList = (items: any[], fallbackList: MemberRecord[]) => {
            return items.map((it: any) => {
              const fallback = fallbackList.find(
                (f) => f.name.toLowerCase() === it.name?.trim().toLowerCase()
              );
              const isInvalidImg = !it.img || it.img.startsWith("blob:");
              return {
                ...it,
                img: isInvalidImg
                  ? fallback?.img ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                  : it.img,
                bio: it.bio || fallback?.bio || "",
              };
            });
          };

          const m = sanitizeList(res.data.filter((it: any) => it.tier === "MENTOR"), MENTORS);
          const l = sanitizeList(res.data.filter((it: any) => it.tier === "LEAD"), LEADS);
          const c = sanitizeList(res.data.filter((it: any) => it.tier === "CORE"), CORE_MEMBERS);
          const f = sanitizeList(res.data.filter((it: any) => it.tier === "FOUNDER"), FOUNDERS);
          const leg = sanitizeList(res.data.filter((it: any) => it.tier === "LEGACY"), LEGACY);
          if (m.length > 0) setMentors(m);
          if (l.length > 0) setLeads(l);
          if (c.length > 0) setCoreMembers(c);
          if (f.length > 0) setFounders(f);
          if (leg.length > 0) setLegacy(leg);
        }
      })
      .catch(() => {});
  }, []);

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

  // Close bio modal on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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

  // GSAP MATCHMEDIA FORKING
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    // DESKTOP LANE: (min-width: 1024px)
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

      tl.eventCallback("onUpdate", () => {
        const prog = tl.progress();
        if (prog < 0.16) {
          setActiveCategory("origins");
        } else if (prog < 0.32) {
          setActiveCategory("mentors");
        } else if (prog < 0.5) {
          setActiveCategory("leads");
        } else if (prog < 0.7) {
          setActiveCategory("core");
        } else if (prog < 0.86) {
          setActiveCategory("founders");
        } else {
          setActiveCategory("legacy");
        }
      });

      tl.to(".campus-bg-image", { scale: 1.18, duration: 18, ease: "none" }, 0);
      tl.to(".hero-scroll-guide", { opacity: 0, y: 15, duration: 0.8, ease: "power2.out" }, 0);

      // SEQUENCE 1: HERO DIVE
      tl.addLabel("heroStart", 0);
      tl.to(".hero-word-shutter", { scale: 24, y: "-32vh", opacity: 0, duration: 2.4, ease: "power2.inOut" }, "heroStart");
      tl.to(".hero-word-scape", { scale: 24, y: "32vh", opacity: 0, duration: 2.4, ease: "power2.inOut" }, "heroStart");
      tl.fromTo(".hero-hidden-text", { opacity: 0, scale: 0.8, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: "power2.out" }, "heroStart+=0.8");
      tl.to(".hero-hidden-text", { opacity: 0, scale: 1.15, y: -45, duration: 1.2, ease: "power2.in" }, "heroStart+=3.4");

      // SEQUENCE 2: MENTORS
      tl.addLabel("mentorsStart", "heroStart+=4.2");
      tl.fromTo(
        ".ch-2-mentors",
        { display: "none", opacity: 0, scale: 0.85, x: -40, y: 50, rotateY: 6, filter: "blur(22px)" },
        { display: "flex", opacity: 1, scale: 1, x: 0, y: 0, rotateY: 0, filter: "blur(0px)", duration: 2, ease: "power3.out" },
        "mentorsStart"
      );
      tl.to(".ch-2-mentors", { opacity: 0, scale: 1.15, x: 30, y: -40, rotateY: -4, filter: "blur(14px)", duration: 1.5, ease: "power2.in" }, "mentorsStart+=3");
      tl.set(".ch-2-mentors", { display: "none" });

      // SEQUENCE 3: LEADS
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

      // SEQUENCE 5: FOUNDERS
      tl.addLabel("foundersStart", "coreStart+=4.2");
      tl.fromTo(".ch-5-founders", { display: "none", opacity: 0, scale: 0.9, y: 30 }, { display: "flex", opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power2.out" }, "foundersStart+=0.3");
      tl.to(".ch-5-founders", { opacity: 0, scale: 1.08, duration: 1.3, ease: "power2.in" }, "foundersStart+=3.2");
      tl.set(".ch-5-founders", { display: "none" });

      // SEQUENCE 6: LEGACY
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

    // MOBILE LANE: (max-width: 1023px)
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

      tl.eventCallback("onUpdate", () => {
        const prog = tl.progress();
        if (prog < 0.16) {
          setActiveCategory("origins");
        } else if (prog < 0.32) {
          setActiveCategory("mentors");
        } else if (prog < 0.5) {
          setActiveCategory("leads");
        } else if (prog < 0.7) {
          setActiveCategory("core");
        } else if (prog < 0.86) {
          setActiveCategory("founders");
        } else {
          setActiveCategory("legacy");
        }
      });

      tl.to(".hero-scroll-guide", { opacity: 0, duration: 0.4 }, 0);

      tl.addLabel("heroStart", 0);
      tl.to(".hero-word-shutter", { scale: 4.5, y: "-18vh", opacity: 0, duration: 1.6, ease: "power1.inOut" }, "heroStart");
      tl.to(".hero-word-scape", { scale: 4.5, y: "18vh", opacity: 0, duration: 1.6, ease: "power1.inOut" }, "heroStart");
      tl.fromTo(".hero-hidden-text", { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power2.out" }, "heroStart+=0.6");
      tl.to(".hero-hidden-text", { opacity: 0, y: -30, duration: 0.8, ease: "power2.in" }, "heroStart+=2.2");

      tl.addLabel("mentorsStart", "heroStart+=2.8");
      tl.fromTo(".ch-2-mentors", { display: "none", opacity: 0, y: 30 }, { display: "flex", opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, "mentorsStart");
      tl.to(".ch-2-mentors", { opacity: 0, y: -30, duration: 0.8, ease: "power2.in" }, "mentorsStart+=2.0");
      tl.set(".ch-2-mentors", { display: "none" });

      tl.addLabel("leadsStart", "mentorsStart+=2.6");
      tl.fromTo(".ch-3-leads", { display: "none", opacity: 0, y: 30 }, { display: "flex", opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, "leadsStart");
      tl.to(".ch-3-leads", { opacity: 0, y: -30, duration: 0.8, ease: "power2.in" }, "leadsStart+=2.0");
      tl.set(".ch-3-leads", { display: "none" });

      tl.addLabel("coreStart", "leadsStart+=2.6");
      tl.fromTo(".ch-4-core", { display: "none", opacity: 0, y: 30 }, { display: "flex", opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, "coreStart");
      tl.to(".ch-4-core", { opacity: 0, y: -30, duration: 0.8, ease: "power2.in" }, "coreStart+=2.0");
      tl.set(".ch-4-core", { display: "none" });

      tl.addLabel("foundersStart", "coreStart+=2.6");
      tl.fromTo(".ch-5-founders", { display: "none", opacity: 0, y: 30 }, { display: "flex", opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, "foundersStart");
      tl.to(".ch-5-founders", { opacity: 0, y: -30, duration: 0.8, ease: "power2.in" }, "foundersStart+=2.0");
      tl.set(".ch-5-founders", { display: "none" });

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

  // =========================================================================
  // REUSABLE POP-OUT OVERLAPPING CARD (Matches Atlassian Video Reference)
  // =========================================================================
  const PopOutCard = ({
    member,
    themeIndex,
    size = "normal",
  }: {
    member: MemberRecord;
    themeIndex: number;
    size?: "normal" | "compact";
  }) => {
    const theme = CARD_THEMES[themeIndex % CARD_THEMES.length];

    return (
      <div
        onClick={() => setSelectedMember({ member, themeIndex })}
        style={
          {
            "--card-bg": theme.baseBg,
            "--card-hover-bg": theme.hoverBg,
            "--stripe-color": theme.stripeColor,
          } as React.CSSProperties
        }
        className="popout-member-card group relative flex flex-col items-center cursor-pointer pointer-events-auto select-none w-full"
      >
        {/* Stage Area: Top 28% is open air so the portrait pops out above the colored block */}
        <div
          className={`relative w-full ${
            size === "compact"
              ? "aspect-[4/4.6] max-h-[125px] sm:max-h-[195px] md:max-h-[230px]"
              : "aspect-[3/3.8] max-h-[175px] sm:max-h-[255px] md:max-h-[320px]"
          } flex items-end justify-center overflow-visible`}
        >
          {/* LOWER COLORED GEOMETRIC BACKDROP BLOCK (72% height, expands & shifts color on hover) */}
          <div className="popout-backdrop absolute inset-x-0 bottom-0 h-[70%] group-hover:h-[76%] rounded-xl overflow-hidden transition-all duration-500 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
            {/* Diagonal Geometric Stripe Accent (Top-Left & Bottom-Right corners like Atlassian) */}
            <div
              className="popout-stripes absolute -top-6 -left-6 w-24 h-24 sm:w-32 sm:h-32 opacity-75 group-hover:opacity-100 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, var(--stripe-color) 0px, var(--stripe-color) 5px, transparent 5px, transparent 11px)",
              }}
            />
            <div
              className="popout-stripes absolute -bottom-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 opacity-50 group-hover:opacity-90 group-hover:-rotate-12 transition-all duration-500 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, var(--stripe-color) 0px, var(--stripe-color) 5px, transparent 5px, transparent 11px)",
              }}
            />

            {/* Subtle inner sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/15 pointer-events-none" />
          </div>

          {/* POP-OUT PORTRAIT (Rises 28% above the colored backdrop card!) */}
          <div className="relative z-10 w-[82%] h-[98%] rounded-t-[42%] rounded-b-lg overflow-hidden shadow-[0_14px_34px_rgba(0,0,0,0.55)] border-b-0 transition-transform duration-500 ease-out group-hover:-translate-y-2.5 group-hover:scale-[1.04]">
            <Image
              src={member.img}
              alt={member.name}
              fill
              sizes="360px"
              className="object-cover object-top grayscale contrast-115 group-hover:grayscale-0 group-hover:contrast-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>

        {/* Name, Role & Dept Below the Pop-Out Card */}
        <div
          style={{ marginTop: size === "compact" ? "10px" : "14px" }}
          className="text-center flex flex-col items-center"
        >
          <h3
            className={`font-heading font-bold ${
              size === "compact"
                ? "text-[11px] sm:text-sm md:text-base"
                : "text-xs sm:text-lg md:text-xl"
            } text-white group-hover:text-[#D4A843] transition-colors tracking-tight relative inline-block`}
          >
            {member.name}
            <span className="block h-[2px] w-0 group-hover:w-full bg-[#D4A843] transition-all duration-300 mx-auto mt-0.5" />
          </h3>

          <p
            style={{ marginTop: "3px" }}
            className={`font-mono ${
              size === "compact"
                ? "text-[7.5px] sm:text-[9px]"
                : "text-[8.5px] sm:text-[10px]"
            } tracking-[0.2em] text-[#D4A843] uppercase font-bold`}
          >
            {member.role}
          </p>

          {member.dept && size !== "compact" && (
            <p
              style={{ marginTop: "3px" }}
              className="font-body text-[10px] sm:text-xs text-white/60 max-w-[230px] line-clamp-2"
            >
              {member.dept}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <SmoothScroller>
      <main className="relative w-full max-w-[100vw] bg-[#050505] text-[#FAFAFA] selection:bg-[#D4A843] selection:text-black overflow-x-clip">
        {/* Scoped CSS for Pop-Out Hover Color Morph & Split Bio Modal */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .popout-member-card .popout-backdrop {
            background-color: var(--card-bg);
            transition: background-color 0.45s cubic-bezier(0.22, 1, 0.36, 1), height 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s ease;
          }
          .popout-member-card:hover .popout-backdrop {
            background-color: var(--card-hover-bg);
          }
        `,
          }}
        />

        {/* Cinematic Grain Overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.04] mix-blend-screen"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />

        {/* ============================================================
            BACK TO OUR STORY BUTTON
            ============================================================ */}
        <Link
          href="/#scene-about-showcase"
          className="group fixed top-28 md:top-6 left-4 md:left-8 z-[9990] pointer-events-auto inline-flex items-center gap-2 py-2 px-1 font-mono text-[9.5px] sm:text-[11px] uppercase tracking-[0.22em] font-bold text-[#D4A843] hover:text-white transition-colors duration-300 bg-transparent border-0 shadow-none"
          title="Back to Discover Our Story"
          aria-label="Back to Discover Our Story"
        >
          <span className="text-sm font-light transition-transform duration-300 group-hover:-translate-x-1.5 text-[#D4A843]">
            ←
          </span>
          <span className="hidden sm:inline whitespace-nowrap transition-colors duration-300">
            BACK TO OUR STORY
          </span>
          <span className="sm:hidden whitespace-nowrap transition-colors duration-300">
            BACK
          </span>
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
                    isActive
                      ? "text-[#D4A843] font-bold"
                      : "text-white/30 group-hover:text-white/60"
                  }`}
                >
                  {cat.code}
                </span>

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

        {/* Mobile Minimal Chapter Indicator */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9970] xl:hidden flex items-center gap-2 select-none pointer-events-none">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4A843] animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/80 font-bold">
            {CATEGORIES.find((c) => c.id === activeCategory)?.title ||
              "ORIGINS"}
          </span>
        </div>

        {/* =========================================================
            MASTER CONTINUOUS TUNNEL CONTAINER
            ========================================================= */}
        <div
          ref={containerRef}
          className="relative w-full h-screen overflow-hidden"
        >
          <div className="master-bg absolute inset-0 z-0 bg-[#050505] pointer-events-none" />

          {/* CAMPUS BACKGROUND */}
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

          {/* ANIMATED MOUSE SCROLL GUIDE */}
          <div className="hero-scroll-guide absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none select-none will-change-transform">
            <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-full border border-white/35 flex justify-center pt-1.5 shadow-lg bg-black/40 backdrop-blur-xs">
              <div className="w-1 h-2 sm:h-2.5 bg-[#D4A843] rounded-full animate-bounce" />
            </div>
            <span className="font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.3em] uppercase text-white/50 font-medium">
              SCROLL TO DIVE
            </span>
          </div>

          {/* ---------------------------------------------------------
              CHAPTER 1: THE HERO DIVE
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

            <div className="hero-hidden-text absolute flex flex-col items-center text-center max-w-3xl px-4 sm:px-6 opacity-0 will-change-transform z-10">
              <span className="font-mono text-[9px] sm:text-[11px] md:text-[13px] tracking-[0.45em] text-[#D4A843] uppercase font-bold mb-3 md:mb-4">
                CHAPTER 01 // ORIGINS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-white mb-3 sm:mb-5 leading-tight">
                More than just <br />
                <span className="text-[#D4A843] font-normal not-italic">
                  a camera club.
                </span>
              </h2>
              <div className="w-10 sm:w-14 h-[2px] bg-[#D4A843] mb-4 sm:mb-6" />
              <p className="font-body text-xs sm:text-base md:text-lg font-light leading-relaxed text-[#FAFAFA]/90 mb-2 sm:mb-3 max-w-2xl">
                Shutterscape is the photography club of Girijananda Chowdhury
                University, created for students who love to observe, capture
                and tell stories through photographs.
              </p>
              <p className="font-body text-[11px] sm:text-sm md:text-base font-light leading-relaxed text-[#FAFAFA]/70 max-w-2xl">
                Whether you are a professional photographer or someone who
                simply loves clicking pictures on your phone —{" "}
                <span className="text-[#D4A843] font-medium">
                  there’s a place for you here.
                </span>
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------------
              CHAPTER 2: MENTORS (Pop-Out Overlapping Cards)
              --------------------------------------------------------- */}
          <div className="ch-2-mentors absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 opacity-0 pointer-events-none will-change-transform">
            <div className="text-center mb-5 sm:mb-8 md:mb-10">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#D4A843] uppercase mb-1 sm:mb-2 block font-semibold">
                CHAPTER 02 // MENTORS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl uppercase tracking-widest text-white/30 leading-none">
                The Teachers Who{" "}
                <span className="text-white font-normal">Guide Us</span>
              </h2>
            </div>

            <div className="flex flex-row justify-center items-start gap-6 sm:gap-12 md:gap-20 w-full max-w-4xl mx-auto pointer-events-auto">
              {mentors.map((mentor, idx) => (
                <div
                  key={idx}
                  className="w-[46%] sm:w-[42%] max-w-[260px] md:max-w-[290px]"
                >
                  <PopOutCard member={mentor} themeIndex={idx} />
                </div>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------
              CHAPTER 3: LEADS (Pop-Out Overlapping Cards)
              --------------------------------------------------------- */}
          <div className="ch-3-leads absolute inset-0 z-30 flex flex-col items-center justify-center px-3 sm:px-6 opacity-0 pointer-events-none will-change-transform">
            <div className="text-center mb-5 sm:mb-8 md:mb-10">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#D4A843] uppercase mb-1 sm:mb-2 block font-semibold">
                CHAPTER 03 // LEADERSHIP
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl uppercase tracking-widest text-white leading-none">
                Behind The Lens
              </h2>
            </div>

            <div className="flex flex-row justify-center items-start gap-3 sm:gap-8 md:gap-12 w-full max-w-5xl mx-auto pointer-events-auto">
              {leads.map((lead, idx) => (
                <div
                  key={idx}
                  className="w-[31%] max-w-[155px] sm:max-w-[220px] md:max-w-[265px]"
                >
                  <PopOutCard member={lead} themeIndex={idx + 1} />
                </div>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------
              CHAPTER 4: CORE MEMBERS (Pop-Out Overlapping Cards)
              --------------------------------------------------------- */}
          <div className="ch-4-core absolute inset-0 z-40 flex flex-col items-center justify-center px-3 sm:px-8 opacity-0 pointer-events-none text-white will-change-transform">
            <div className="max-w-5xl mx-auto flex flex-col items-center w-full">
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#D4A843] uppercase mb-1 sm:mb-1.5 block font-bold">
                  CHAPTER 04 // THE FOUNDATION
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl font-light uppercase tracking-tight text-white">
                  Core <span className="font-bold">Members.</span>
                </h2>
              </div>

              <div className="w-full max-w-4xl flex flex-col gap-4 sm:gap-6 md:gap-8 pointer-events-auto">
                {/* Row 1 */}
                <div className="core-row-1 grid grid-cols-3 gap-3 sm:gap-6 md:gap-10 will-change-transform">
                  {coreMembers.slice(0, 3).map((member, idx) => (
                    <PopOutCard
                      key={idx}
                      member={member}
                      themeIndex={idx}
                      size="compact"
                    />
                  ))}
                </div>

                {/* Row 2 */}
                <div className="core-row-2 grid grid-cols-3 gap-3 sm:gap-6 md:gap-10 will-change-transform">
                  {coreMembers.slice(3, 6).map((member, idx) => (
                    <PopOutCard
                      key={idx}
                      member={member}
                      themeIndex={idx + 3}
                      size="compact"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------
              CHAPTER 5: FOUNDERS (Pop-Out Overlapping Cards)
              --------------------------------------------------------- */}
          <div className="ch-5-founders absolute inset-0 z-50 flex flex-col items-center justify-center px-4 sm:px-6 opacity-0 pointer-events-none will-change-transform">
            <div className="max-w-[950px] w-full mx-auto text-center">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.4em] text-[#D4A843] uppercase mb-1 sm:mb-2 block font-semibold">
                CHAPTER 05 // GENESIS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl uppercase tracking-widest text-white mb-5 sm:mb-8 md:mb-10">
                Where It All Started
              </h2>

              <div className="flex flex-row justify-center items-start gap-6 sm:gap-12 md:gap-20 w-full pointer-events-auto">
                {founders.map((founder, idx) => (
                  <div
                    key={idx}
                    className="w-[46%] sm:w-[42%] max-w-[260px] md:max-w-[290px]"
                  >
                    <PopOutCard
                      member={{
                        ...founder,
                        role: founder.role || "2023 // Co-Founder",
                      }}
                      themeIndex={idx + 2}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------
              CHAPTER 6: LEGACY (Pop-Out Overlapping Cards)
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

            <div
              ref={trackRef}
              className="flex items-center mt-14 sm:mt-16 pl-6 sm:pl-[12vw] md:pl-[20vw] gap-6 sm:gap-10 md:gap-16 w-fit will-change-transform pointer-events-auto"
            >
              {legacy.map((person, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[165px] sm:w-[235px] md:w-[290px]"
                >
                  <PopOutCard
                    member={{
                      ...person,
                      role: person.role || "Legacy Torchbearer",
                    }}
                    themeIndex={idx}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            INTERACTIVE SPLIT-VIEW MEMBER BIO MODAL (Matches 00:02 in Video)
            ========================================================= */}
        {selectedMember && (
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setSelectedMember(null)}
            style={{ padding: "20px" }}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center pointer-events-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ padding: "36px 32px" }}
              className="relative w-full max-w-3xl bg-white text-[#172B4D] rounded-2xl shadow-[0_35px_90px_rgba(0,0,0,0.75)] flex flex-col md:flex-row items-center md:items-start gap-8"
            >
              {/* Top-Right Close Button */}
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                aria-label="Close Member Bio"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-[#172B4D] text-[#172B4D] hover:text-white flex items-center justify-center text-base font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>

              {/* Left Column: Pop-Out Portrait + Name & Title */}
              <div className="w-56 sm:w-64 shrink-0 flex flex-col items-center text-center">
                <div className="relative w-full aspect-[3/3.6] flex items-end justify-center overflow-visible">
                  <div
                    style={{
                      backgroundColor:
                        CARD_THEMES[
                          selectedMember.themeIndex % CARD_THEMES.length
                        ].baseBg,
                    }}
                    className="absolute inset-x-0 bottom-0 h-[72%] rounded-xl overflow-hidden shadow-md"
                  >
                    <div
                      className="absolute -top-6 -left-6 w-28 h-28 opacity-80 pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg, rgba(17,24,39,0.22) 0px, rgba(17,24,39,0.22) 5px, transparent 5px, transparent 11px)",
                      }}
                    />
                  </div>

                  <div className="relative z-10 w-[82%] h-[98%] rounded-t-[42%] rounded-b-lg overflow-hidden shadow-xl">
                    <Image
                      src={selectedMember.member.img}
                      alt={selectedMember.member.name}
                      fill
                      sizes="300px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                <h3
                  style={{ marginTop: "16px" }}
                  className="font-heading font-bold text-lg text-[#172B4D]"
                >
                  {selectedMember.member.name}
                </h3>
                <span
                  style={{ marginTop: "4px" }}
                  className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#0052CC] font-bold"
                >
                  {selectedMember.member.role || "Core Committee"}
                </span>
              </div>

              {/* Right Column: Narrative Bio & Department Details */}
              <div className="flex-1 flex flex-col justify-center text-left">
                <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-slate-400 font-bold">
                  SHUTTERSCAPE LEADERSHIP & ARCHIVE
                </span>
                <h4
                  style={{ marginTop: "6px" }}
                  className="font-serif text-2xl sm:text-3xl text-[#172B4D] font-normal"
                >
                  {selectedMember.member.name}
                </h4>
                {selectedMember.member.dept && (
                  <p
                    style={{ marginTop: "4px" }}
                    className="font-mono text-xs text-[#0052CC] font-semibold"
                  >
                    {selectedMember.member.dept}
                  </p>
                )}

                <div
                  style={{ marginTop: "16px", marginBottom: "16px" }}
                  className="w-12 h-[2px] bg-[#F5B700]"
                />

                <p className="font-body text-sm text-slate-600 leading-relaxed">
                  {selectedMember.member.bio ||
                    `${selectedMember.member.name} is an integral member of ShutterScape at Girijananda Chowdhury University, contributing to visual storytelling, campus exhibitions, and archival documentation.`}
                </p>

                <p
                  style={{ marginTop: "12px" }}
                  className="font-body text-xs text-slate-500 leading-relaxed"
                >
                  Working alongside student photographers and faculty mentors,
                  they help curate 35mm contact sheets, mentor field
                  photowalks, and preserve the creative culture of GCU.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </SmoothScroller>
  );
}
