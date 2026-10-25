// src/app/about/page.tsx
"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import SmoothScroller from "@/components/cinematic/SmoothScroller";

// ==========================================
// DATA PAYLOADS & VIBRANT PALETTE
// ==========================================
export interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  dept?: string;
  tier: "MENTOR" | "LEAD" | "CORE" | "FOUNDER" | "LEGACY";
  img: string;
  bgColor: string;
  bio: string[];
}

const CARD_PALETTE = [
  "#00C781", // Vibrant Emerald (matches video card 1)
  "#FFAB00", // Golden Amber (matches video card 2)
  "#2684FF", // Royal Sky Blue (matches video card 3)
  "#8777D9", // Editorial Violet
  "#FF5630", // Warm Coral
  "#00B8D9", // Cyan Teal
];

const MENTORS: TeamMember[] = [
  {
    name: "Dr. Sangeeta Das",
    role: "Faculty Coordinator",
    dept: "Dept. of Mechanical Engineering",
    tier: "MENTOR",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    bgColor: "#00C781",
    bio: [
      "Dr. Sangeeta Das serves as the Faculty Coordinator of ShutterScape at Girijananda Chowdhury University, guiding the club's institutional vision, annual exhibitions, and interdisciplinary art-technology initiatives.",
      "With a deep appreciation for visual documentation and campus heritage, she has championed student-led field expeditions across Assam, ensuring members have access to darkroom clinics, studio lighting equipment, and gallery spaces.",
      "Under her mentorship, ShutterScape has grown into one of the university's most active cultural and creative collectives, bridging engineering precision with photographic storytelling.",
    ],
  },
  {
    name: "Dr. Barsha Chhetri",
    role: "Faculty Co-Coordinator",
    dept: "Assistant Professor & Head (i/c), Dept. of Education",
    tier: "MENTOR",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    bgColor: "#FFAB00",
    bio: [
      "Dr. Barsha Chhetri is the Faculty Co-Coordinator of ShutterScape and Assistant Professor & Head (i/c) in the Department of Education at Girijananda Chowdhury University.",
      "She specializes in visual pedagogy and cultural curation, helping students frame human-interest stories, indigenous crafts, and environmental narratives with empathy and ethical depth.",
      "She actively oversees the club's inter-university symposia, annual print salons, and community outreach workshops.",
    ],
  },
];

const LEADS: TeamMember[] = [
  {
    name: "Uttama Purkayastha",
    role: "President",
    dept: "Executive Leadership · 2025–26",
    tier: "LEAD",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    bgColor: "#00C781",
    bio: [
      "Uttama Purkayastha leads ShutterScape as Club President, directing creative curation, campus-wide exhibitions, and national collegiate photography challenges.",
      "Specializing in chiaroscuro portraiture and documentary storytelling, she has spearheaded the 'Frames Beyond Time' annual exhibition and established the permanent student visual archive at GCU.",
      "Outside the studio, she mentors incoming freshmen on manual optics, 35mm film workflows, and editorial composition.",
    ],
  },
  {
    name: "Ikhyt De Neog",
    role: "Vice-President",
    dept: "Operations & Field Expeditions",
    tier: "LEAD",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    bgColor: "#FFAB00",
    bio: [
      "Ikhyt De Neog serves as Vice-President of ShutterScape, overseeing outdoor photowalks, technical gear clinics, and production logistics across Guwahati and the Eastern Himalayas.",
      "An avid landscape and nocturnal street photographer, he leads the Brahmaputra Heritage Photowalk series and trains members in long-exposure astrophotography and high-speed strobe sync.",
      "He is passionate about building an inclusive creative environment where both smartphone creators and DSLR veterans thrive together.",
    ],
  },
  {
    name: "Richita Sarma",
    role: "Secretary",
    dept: "Editorial & Archival Curation",
    tier: "LEAD",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
    bgColor: "#2684FF",
    bio: [
      "Richita Sarma is the Secretary of ShutterScape, managing club communications, exhibition catalogs, and collaborations with external cultural organizations.",
      "Her photographic work focuses on architectural geometry, monsoon street life, and minimalist color theory, frequently featured in university publications.",
      "She coordinates the club's weekly critique circles and curates the 'Frames of Moments' motion reel showcase.",
    ],
  },
];

const CORE_MEMBERS: TeamMember[] = [
  {
    name: "Sohaib Hussain",
    role: "Core Committee",
    dept: "Documentary & High-Speed Optics",
    tier: "CORE",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    bgColor: "#8777D9",
    bio: [
      "Sohaib Hussain is a Core Committee member specializing in festival documentary and high-shutter-speed action photography.",
      "He leads on-ground coverage for major university cultural fests and conducts hands-on sessions on dynamic framing and color grading.",
    ],
  },
  {
    name: "Mahadananda Dutta",
    role: "Core Committee",
    dept: "Street & Monochrome Archive",
    tier: "CORE",
    img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600&auto=format&fit=crop",
    bgColor: "#00B8D9",
    bio: [
      "Mahadananda Dutta focuses on black-and-white street narratives and silver-halide film aesthetics across Guwahati's historic markets.",
      "He manages exhibition print mounting and assists in curating the club's physical darkroom contact sheets.",
    ],
  },
  {
    name: "Manash Pratim Sarma",
    role: "Core Committee",
    dept: "Landscape & Environmental Study",
    tier: "CORE",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    bgColor: "#00C781",
    bio: [
      "Manash Pratim Sarma documents Assam's tea estates, wetlands, and avian biodiversity using telephoto optics and natural dawn light.",
      "He organizes early-morning nature walks to Deepor Beel and mentors members in wildlife tracking and conservation photography.",
    ],
  },
  {
    name: "Mubina Ahmed",
    role: "Core Committee",
    dept: "Portraiture & Studio Lighting",
    tier: "CORE",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    bgColor: "#FF5630",
    bio: [
      "Mubina Ahmed specializes in studio xenon strobe portraiture, fine-art lighting setups, and editorial fashion direction.",
      "She runs the club's indoor portrait clinics, helping fellow students master catchlights, softboxes, and tonal falloff.",
    ],
  },
  {
    name: "Pratyush B. Choudhury",
    role: "Core Committee",
    dept: "Visual Media & Cinematography",
    tier: "CORE",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    bgColor: "#FFAB00",
    bio: [
      "Pratyush B. Choudhury bridges still photography and motion cinematography, producing vertical reels and aftermovies for ShutterScape events.",
      "He experiments with vintage prime lenses, anamorphic flares, and atmospheric sound design.",
    ],
  },
  {
    name: "Hiya Das",
    role: "Core Committee",
    dept: "Architectural & Spatial Form",
    tier: "CORE",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
    bgColor: "#2684FF",
    bio: [
      "Hiya Das explores brutalist campus architecture, geometric symmetry, and leading lines through wide-angle perspectives.",
      "She curates the architectural category of the Visual Archive and leads spatial composition walks on campus.",
    ],
  },
];

const FOUNDERS: TeamMember[] = [
  {
    name: "Dheemaan Deka",
    role: "Co-Founder (2023)",
    dept: "Founding Vision & Direction",
    tier: "FOUNDER",
    img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=800&auto=format&fit=crop",
    bgColor: "#00C781",
    bio: [
      "Dheemaan Deka co-founded ShutterScape in 2023 with the vision of establishing a permanent, student-run photographic society at Girijananda Chowdhury University.",
      "By bringing together a small group of passionate visual storytellers, he laid the foundation for the club's signature photowalks, annual exhibitions, and peer-mentorship culture.",
    ],
  },
  {
    name: "Subhrajyoti Goswami",
    role: "Co-Founder (2023)",
    dept: "Founding Technical Lead",
    tier: "FOUNDER",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    bgColor: "#2684FF",
    bio: [
      "Subhrajyoti Goswami co-founded ShutterScape in 2023, establishing the club's technical curriculum, manual photography workshops, and competitive circuit presence.",
      "His dedication to craft and visual experimentation continues to inspire every new cohort of GCU photographers.",
    ],
  },
];

const LEGACY: TeamMember[] = [
  {
    name: "Gargi Medhi",
    role: "Legacy Torchbearer",
    dept: "Alumni Advisory · 2023–25",
    tier: "LEGACY",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    bgColor: "#FFAB00",
    bio: [
      "Gargi Medhi played a pivotal role in expanding ShutterScape's exhibition footprint and mentoring the current executive leadership cohort.",
      "Her archival portraits and cultural essays remain a cornerstone of the club's permanent collection.",
    ],
  },
  {
    name: "Dheemaan Deka",
    role: "Legacy Torchbearer",
    dept: "Founding Alumnus",
    tier: "LEGACY",
    img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=600&auto=format&fit=crop",
    bgColor: "#00C781",
    bio: [
      "As a founding torchbearer, Dheemaan continues to advise the club on annual print salons and inter-collegiate collaborations.",
    ],
  },
  {
    name: "Imran Farhat",
    role: "Legacy Torchbearer",
    dept: "Nocturnal & Street Archive",
    tier: "LEGACY",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    bgColor: "#8777D9",
    bio: [
      "Imran Farhat pioneered the club's nocturnal street photography walks and Cinestill tungsten film studies across Guwahati.",
      "His iconic rain-reflection frames are permanently exhibited in the ShutterScape Visual Archive.",
    ],
  },
  {
    name: "Subhrajyoti Goswami",
    role: "Legacy Torchbearer",
    dept: "Founding Alumnus",
    tier: "LEGACY",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
    bgColor: "#2684FF",
    bio: [
      "Subhrajyoti remains an active mentor to the technical wing, guiding optical experiments and darkroom workshops.",
    ],
  },
];

const SECTIONS = [
  { id: "origins", label: "01 · Origins" },
  { id: "leadership", label: "02 · Leadership" },
  { id: "mentors", label: "03 · Mentors" },
  { id: "core", label: "04 · Core Team" },
  { id: "founders", label: "05 · Founders" },
  { id: "legacy", label: "06 · Legacy" },
];

export default function AboutPage() {
  const [mentors, setMentors] = useState<TeamMember[]>(MENTORS);
  const [leads, setLeads] = useState<TeamMember[]>(LEADS);
  const [coreMembers, setCoreMembers] = useState<TeamMember[]>(CORE_MEMBERS);
  const [founders, setFounders] = useState<TeamMember[]>(FOUNDERS);
  const [legacy, setLegacy] = useState<TeamMember[]>(LEGACY);

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeSection, setActiveSection] = useState<string>("origins");

  // Helper to enrich dynamic API records with vibrant color & multi-paragraph bio if missing
  const enrichMember = useCallback(
    (raw: any, idx: number, fallbackList: TeamMember[]): TeamMember => {
      const existing = fallbackList.find(
        (m) => m.name.toLowerCase() === (raw.name || "").toLowerCase()
      );
      return {
        _id: raw._id,
        name: raw.name || existing?.name || "Club Member",
        role:
          raw.role ||
          existing?.role ||
          (raw.tier === "CORE" ? "Core Committee" : raw.tier || "Member"),
        dept: raw.dept || existing?.dept || "Girijananda Chowdhury University",
        tier: raw.tier || existing?.tier || "CORE",
        img: raw.img || existing?.img || "",
        bgColor:
          raw.bgColor ||
          existing?.bgColor ||
          CARD_PALETTE[idx % CARD_PALETTE.length],
        bio:
          Array.isArray(raw.bio) && raw.bio.length > 0
            ? raw.bio
            : existing?.bio || [
                `${raw.name} is an integral member of ShutterScape at Girijananda Chowdhury University, serving as ${
                  raw.role || raw.tier
                }.`,
                "Passionate about visual storytelling, analog film aesthetics, and collaborative field documentation, they actively contribute to the club's exhibitions, workshops, and archival projects.",
                "Through ShutterScape, they work alongside fellow student photographers to capture the culture, architecture, and natural landscapes of Assam.",
              ],
      };
    },
    []
  );

  // Sync with live /api/committee CMS data
  useEffect(() => {
    fetch("/api/committee")
      .then((r) => r.json())
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const m = res.data
            .filter((it: any) => it.tier === "MENTOR")
            .map((it: any, i: number) => enrichMember(it, i, MENTORS));
          const l = res.data
            .filter((it: any) => it.tier === "LEAD")
            .map((it: any, i: number) => enrichMember(it, i, LEADS));
          const c = res.data
            .filter((it: any) => it.tier === "CORE")
            .map((it: any, i: number) => enrichMember(it, i + 3, CORE_MEMBERS));
          const f = res.data
            .filter((it: any) => it.tier === "FOUNDER")
            .map((it: any, i: number) => enrichMember(it, i, FOUNDERS));
          const leg = res.data
            .filter((it: any) => it.tier === "LEGACY")
            .map((it: any, i: number) => enrichMember(it, i + 1, LEGACY));

          if (m.length > 0) setMentors(m);
          if (l.length > 0) setLeads(l);
          if (c.length > 0) setCoreMembers(c);
          if (f.length > 0) setFounders(f);
          if (leg.length > 0) setLegacy(leg);
        }
      })
      .catch(() => {});
  }, [enrichMember]);

  // Flat list of all members for Next / Prev navigation inside the bio modal
  const allMembers = useMemo(
    () => [...leads, ...mentors, ...coreMembers, ...founders, ...legacy],
    [leads, mentors, coreMembers, founders, legacy]
  );

  // Lock background scroll when Bio Modal is open
  useEffect(() => {
    const lenis = (
      window as unknown as {
        __lenis?: { stop: () => void; start: () => void };
      }
    ).__lenis;

    if (selectedMember) {
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
  }, [selectedMember]);

  // Keyboard navigation for Bio Modal (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMember) return;
      if (e.key === "Escape") {
        setSelectedMember(null);
      } else if (e.key === "ArrowRight") {
        const idx = allMembers.findIndex(
          (m) =>
            m.name === selectedMember.name && m.tier === selectedMember.tier
        );
        if (idx !== -1) {
          setSelectedMember(allMembers[(idx + 1) % allMembers.length]);
        }
      } else if (e.key === "ArrowLeft") {
        const idx = allMembers.findIndex(
          (m) =>
            m.name === selectedMember.name && m.tier === selectedMember.tier
        );
        if (idx !== -1) {
          setSelectedMember(
            allMembers[(idx - 1 + allMembers.length) % allMembers.length]
          );
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMember, allMembers]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 130;
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: number, options?: { duration?: number }) => void };
      }
    ).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(y, { duration: 1.0 });
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Reusable Team Member Card matching the exact video reference
  const TeamCard = ({ member }: { member: TeamMember }) => (
    <div
      onClick={() => setSelectedMember(member)}
      className="team-card group cursor-pointer flex flex-col items-center text-center"
    >
      {/* Vibrant Color-Block Portrait Container */}
      <div
        className="team-portrait-box relative w-full overflow-hidden transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
        style={{ backgroundColor: member.bgColor }}
      >
        {/* Subtle inner radial highlight for studio depth */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 50% 25%, rgba(255,255,255,0.28) 0%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        <div className="relative z-10 w-full h-full">
          <Image
            src={member.img}
            alt={member.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 mix-blend-normal"
          />
        </div>
      </div>

      {/* Centered Name, Role & "Read bio ->" Link Below Card */}
      <div style={{ marginTop: "18px" }} className="flex flex-col items-center">
        <h3 className="text-[18px] sm:text-[19px] font-bold text-[#172B4D] group-hover:text-[#0052CC] group-hover:underline underline-offset-4 transition-colors">
          {member.name}
        </h3>
        <p
          style={{ marginTop: "4px" }}
          className="text-[13.5px] font-medium text-[#42526E]"
        >
          {member.role}
        </p>
        {member.dept && (
          <p
            style={{ marginTop: "2px" }}
            className="text-[12px] text-[#6B778C] max-w-[240px]"
          >
            {member.dept}
          </p>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedMember(member);
          }}
          style={{ marginTop: "10px" }}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0052CC] group-hover:text-[#0747A6] cursor-pointer bg-transparent border-0"
        >
          <span>Read bio</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <SmoothScroller>
      <main
        id="about-team-root"
        className="relative w-full min-h-screen bg-white text-[#172B4D] selection:bg-[#0052CC] selection:text-white overflow-x-clip"
      >
        {/* Scoped CSS to guarantee immunity against globals.css * { margin: 0; padding: 0 } */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          #about-team-root {
            background-color: #FFFFFF !important;
            color: #172B4D !important;
            padding-top: 135px !important;
            padding-bottom: 100px !important;
          }
          #about-team-root .about-container {
            max-width: 1180px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            padding-left: clamp(20px, 4vw, 48px) !important;
            padding-right: clamp(20px, 4vw, 48px) !important;
          }
          #about-team-root .team-section {
            padding-top: 64px !important;
            padding-bottom: 64px !important;
            border-bottom: 1px solid #EBECF0;
          }
          #about-team-root .team-portrait-box {
            aspect-ratio: 1 / 1.06;
            border-radius: 10px;
            box-shadow: 0 10px 28px rgba(9, 30, 66, 0.12);
          }
          #about-team-root .bio-modal-backdrop {
            padding: 20px !important;
            background-color: rgba(9, 30, 66, 0.58);
            backdrop-filter: blur(6px);
          }
          #about-team-root .bio-modal-card {
            background-color: #26292E !important;
            color: #FFFFFF !important;
            max-width: 880px !important;
            width: 100% !important;
            border-radius: 12px !important;
            padding: clamp(24px, 4vw, 48px) !important;
            box-shadow: 0 30px 90px rgba(0, 0, 0, 0.55) !important;
          }
          #about-team-root .nav-pill {
            padding: 7px 14px !important;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            transition: all 0.2s ease;
            cursor: pointer;
            white-space: nowrap;
          }
        `,
          }}
        />

        {/* Top Dark Scrim so the Global White Navbar ("shutter scape | HOME // GALLERY...") stays 100% legible */}
        <div
          className="pointer-events-none fixed top-0 inset-x-0 h-28 z-[9960]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,7,0.88) 0%, rgba(5,5,7,0.45) 60%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* ============================================================
            STICKY SUB-NAVIGATION BAR & BACK BUTTON
            ============================================================ */}
        <div className="fixed top-[88px] sm:top-[96px] left-1/2 -translate-x-1/2 z-[9970] w-max max-w-[94vw] overflow-x-auto no-scrollbar">
          <div
            style={{ padding: "6px 10px" }}
            className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/95 backdrop-blur-md border border-[#DFE1E6] shadow-[0_8px_24px_rgba(9,30,66,0.08)]"
          >
            <Link
              href="/#scene-about-showcase"
              style={{ padding: "7px 14px" }}
              className="font-mono text-[10.5px] tracking-[0.16em] uppercase font-bold text-[#172B4D] hover:text-[#0052CC] border-r border-[#DFE1E6] shrink-0"
            >
              ← OUR STORY
            </Link>
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`nav-pill font-mono ${
                    isActive
                      ? "bg-[#172B4D] text-white"
                      : "bg-transparent text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#F4F5F7]"
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="about-container">
          {/* ============================================================
              SECTION 01: ORIGINS HERO ("More than just a camera club")
              ============================================================ */}
          <div
            id="origins"
            style={{ paddingTop: "36px", paddingBottom: "64px" }}
            className="border-b border-[#EBECF0] flex flex-col items-center text-center"
          >
            <span
              style={{ padding: "5px 14px", marginBottom: "16px" }}
              className="inline-flex items-center gap-2 rounded-full bg-[#DEEBFF] text-[#0052CC] font-mono text-[11px] font-bold tracking-[0.2em] uppercase"
            >
              CHAPTER 01 // ORIGINS & MISSION
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-[64px] font-normal tracking-tight text-[#172B4D] leading-[1.06] max-w-3xl">
              More than just{" "}
              <span className="italic font-light text-[#0052CC]">
                a camera club.
              </span>
            </h1>

            <p
              style={{ marginTop: "22px" }}
              className="font-body text-base sm:text-lg text-[#42526E] max-w-2xl leading-relaxed"
            >
              ShutterScape is the official photography society of{" "}
              <strong className="font-semibold text-[#172B4D]">
                Girijananda Chowdhury University
              </strong>
              , created for students who love to observe, capture, and tell
              enduring stories through photographs.
            </p>

            <p
              style={{ marginTop: "12px" }}
              className="font-body text-sm sm:text-base text-[#5E6C84] max-w-xl leading-relaxed"
            >
              Whether you shoot on a flagship mirrorless rig, a 35mm film body,
              or your smartphone — there is a place for your perspective here.
              Click any team member below to read their full biography.
            </p>
          </div>

          {/* ============================================================
              SECTION 02: OUR LEADERSHIP TEAM (Matches Video 00:00 - 00:01)
              ============================================================ */}
          <div id="leadership" className="team-section">
            <div
              style={{ marginBottom: "48px" }}
              className="flex flex-col items-center text-center"
            >
              <h2 className="font-sans text-3xl sm:text-4xl md:text-[40px] font-bold text-[#172B4D] tracking-tight">
                Our leadership team
              </h2>
              <p
                style={{ marginTop: "12px" }}
                className="font-body text-sm sm:text-base text-[#5E6C84] max-w-xl"
              >
                With combined experience across documentary, studio optics, and
                archival curation, we&apos;ve got a dedicated executive team at
                the helm.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
              {leads.map((lead, idx) => (
                <TeamCard key={lead._id || idx} member={lead} />
              ))}
            </div>
          </div>

          {/* ============================================================
              SECTION 03: FACULTY MENTORS ("The Teachers Who Guide Us")
              ============================================================ */}
          <div id="mentors" className="team-section">
            <div
              style={{ marginBottom: "48px" }}
              className="flex flex-col items-center text-center"
            >
              <h2 className="font-sans text-3xl sm:text-4xl md:text-[40px] font-bold text-[#172B4D] tracking-tight">
                The teachers who guide us
              </h2>
              <p
                style={{ marginTop: "12px" }}
                className="font-body text-sm sm:text-base text-[#5E6C84] max-w-xl"
              >
                Faculty coordinators providing institutional mentorship,
                curatorial guidance, and academic support at GCU.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-2xl mx-auto">
              {mentors.map((mentor, idx) => (
                <TeamCard key={mentor._id || idx} member={mentor} />
              ))}
            </div>
          </div>

          {/* ============================================================
              SECTION 04: CORE COMMITTEE MEMBERS
              ============================================================ */}
          <div id="core" className="team-section">
            <div
              style={{ marginBottom: "48px" }}
              className="flex flex-col items-center text-center"
            >
              <h2 className="font-sans text-3xl sm:text-4xl md:text-[40px] font-bold text-[#172B4D] tracking-tight">
                Core committee members
              </h2>
              <p
                style={{ marginTop: "12px" }}
                className="font-body text-sm sm:text-base text-[#5E6C84] max-w-xl"
              >
                The creative backbone of ShutterScape leading field expeditions,
                darkroom clinics, and campus exhibitions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 max-w-5xl mx-auto">
              {coreMembers.map((member, idx) => (
                <TeamCard key={member._id || idx} member={member} />
              ))}
            </div>
          </div>

          {/* ============================================================
              SECTION 05: FOUNDERS ("Where It All Started")
              ============================================================ */}
          <div id="founders" className="team-section">
            <div
              style={{ marginBottom: "48px" }}
              className="flex flex-col items-center text-center"
            >
              <h2 className="font-sans text-3xl sm:text-4xl md:text-[40px] font-bold text-[#172B4D] tracking-tight">
                Where it all started
              </h2>
              <p
                style={{ marginTop: "12px" }}
                className="font-body text-sm sm:text-base text-[#5E6C84] max-w-xl"
              >
                The 2023 co-founders who ignited the lens culture and
                established ShutterScape at Girijananda Chowdhury University.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-2xl mx-auto">
              {founders.map((founder, idx) => (
                <TeamCard key={founder._id || idx} member={founder} />
              ))}
            </div>
          </div>

          {/* ============================================================
              SECTION 06: LEGACY TORCHBEARERS ("Carrying It Forward")
              ============================================================ */}
          <div
            id="legacy"
            style={{ paddingTop: "64px", paddingBottom: "24px" }}
          >
            <div
              style={{ marginBottom: "48px" }}
              className="flex flex-col items-center text-center"
            >
              <h2 className="font-sans text-3xl sm:text-4xl md:text-[40px] font-bold text-[#172B4D] tracking-tight">
                Carrying it forward
              </h2>
              <p
                style={{ marginTop: "12px" }}
                className="font-body text-sm sm:text-base text-[#5E6C84] max-w-xl"
              >
                Alumni torchbearers whose photographs, leadership, and vision
                continue to shape every new chapter of the archive.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {legacy.map((person, idx) => (
                <TeamCard key={person._id || idx} member={person} />
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================
            SPLIT-VIEW BIO MODAL (Matches Video Reference 00:02 Exactly)
            ============================================================ */}
        {selectedMember && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedMember.name} Biography`}
            onClick={() => setSelectedMember(null)}
            className="bio-modal-backdrop fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bio-modal-card relative"
            >
              {/* Top-Right Close Button (✕) */}
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                aria-label="Close biography modal"
                style={{ top: "20px", right: "22px", width: "36px", height: "36px" }}
                className="absolute rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center text-lg font-light transition-colors cursor-pointer border-0"
              >
                ✕
              </button>

              {/* Split 2-Column Layout: Left Colored Portrait + Right Multi-Paragraph Bio */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
                {/* LEFT COLUMN: Colored Portrait Card + Name & Role Underneath */}
                <div className="md:col-span-5 flex flex-col items-center text-center">
                  <div
                    className="relative w-full max-w-[260px] aspect-[1/1.08] rounded-[10px] overflow-hidden shadow-2xl"
                    style={{ backgroundColor: selectedMember.bgColor }}
                  >
                    <Image
                      src={selectedMember.img}
                      alt={selectedMember.name}
                      fill
                      unoptimized
                      sizes="300px"
                      className="object-cover object-top"
                    />
                  </div>

                  <h3
                    style={{ marginTop: "18px" }}
                    className="text-lg sm:text-xl font-bold text-white"
                  >
                    {selectedMember.name}
                  </h3>
                  <p
                    style={{ marginTop: "4px" }}
                    className="text-xs sm:text-sm font-medium text-white/70"
                  >
                    {selectedMember.role}
                  </p>
                  {selectedMember.dept && (
                    <p
                      style={{ marginTop: "2px" }}
                      className="text-xs text-white/50"
                    >
                      {selectedMember.dept}
                    </p>
                  )}
                </div>

                {/* RIGHT COLUMN: Multi-Paragraph Biography */}
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#D4A843] font-bold">
                      SHUTTERSCAPE // {selectedMember.tier} PROFILE
                    </span>

                    {selectedMember.bio.map((paragraph, i) => (
                      <p
                        key={i}
                        className="font-body text-[14px] sm:text-[15px] text-white/90 leading-[1.7] font-normal"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Previous / Next Team Member Controls */}
                  <div
                    style={{ marginTop: "28px", paddingTop: "18px" }}
                    className="border-t border-white/10 flex items-center justify-between font-mono text-[11px] tracking-[0.18em] uppercase text-white/60"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const idx = allMembers.findIndex(
                          (m) =>
                            m.name === selectedMember.name &&
                            m.tier === selectedMember.tier
                        );
                        if (idx !== -1) {
                          setSelectedMember(
                            allMembers[
                              (idx - 1 + allMembers.length) % allMembers.length
                            ]
                          );
                        }
                      }}
                      className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 py-1"
                    >
                      ← PREV MEMBER
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const idx = allMembers.findIndex(
                          (m) =>
                            m.name === selectedMember.name &&
                            m.tier === selectedMember.tier
                        );
                        if (idx !== -1) {
                          setSelectedMember(
                            allMembers[(idx + 1) % allMembers.length]
                          );
                        }
                      }}
                      className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 py-1"
                    >
                      NEXT MEMBER →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </SmoothScroller>
  );
}
