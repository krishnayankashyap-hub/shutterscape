// src/components/cinematic/ApertureHero.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Set this to true if you place a front-facing camera PNG at /public/images/real-camera.png
const USE_REAL_CAMERA_IMAGE = false;
const REAL_CAMERA_SRC = "/images/real-camera.png";

// 6 Disciplined Vertical 35mm Contact-Sheet Film Frames (Pre-seeded with real GCU Admin uploads for instant zero-lag render)
const FILM_REEL_FRAMES = [
  {
    id: "01A",
    title: "SILENT PEAKS",
    src: "/api/media/6ade51a83071c6a522ea6397",
    exif: "GCU Library",
  },
  {
    id: "02B",
    title: "Rainy hour",
    src: "/api/media/6ade54effadbce637226b636",
    exif: "GCU",
  },
  {
    id: "03C",
    title: "CANYON DRIFT",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80",
    exif: "GCU Greenery",
  },
  {
    id: "04D",
    title: "MIST & LIGHT",
    src: "/api/media/6ade56029d67f6006e3db91a",
    exif: "FLAG",
  },
  {
    id: "05E",
    title: "SOLITUDE",
    src: "/api/media/6ade565e741b0c577b2f4207",
    exif: "From Up",
  },
  {
    id: "06F",
    title: "ALPINE CREST",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85",
    exif: "70MM · F/4.0 · DAWN",
  },
];

// Disciplined Left-Rail Aperture Ladder
const APERTURE_LADDER = [
  { stop: "f/1.4", mode: "MAX APERTURE" },
  { stop: "f/2.0", mode: "PRIME ISOLATION" },
  { stop: "f/2.8", mode: "EDITORIAL DEPTH" },
  { stop: "f/4.0", mode: "STUDIO STANDARD" },
  { stop: "f/5.6", mode: "OPTICAL SWEET SPOT" },
  { stop: "f/8.0", mode: "ARCHITECTURAL" },
  { stop: "f/11", mode: "HYPERFOCAL" },
  { stop: "f/16.0", mode: "STOPPED DOWN" },
];

// Luminance Waveform Bars for the Left Corporate Telemetry Module
const WAVEFORM_BARS = [
  16, 24, 38, 52, 46, 34, 48, 68, 84, 96, 88, 72, 58, 44, 62, 78, 66, 48, 32,
  22, 14, 26, 36, 20,
];

export default function ApertureHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const clipMaskRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const opticalFlareRef = useRef<HTMLDivElement>(null);
  const cameraBackTextLayerRef = useRef<HTMLDivElement>(null);
  const cameraBodyLayerRef = useRef<HTMLDivElement>(null);
  const shutterOverlayLayerRef = useRef<HTMLDivElement>(null);
  const outerBarrelRef = useRef<SVGGElement>(null);
  const innerRingRef = useRef<SVGGElement>(null);
  const shutterButtonRef = useRef<SVGGElement>(null);
  const tallyLightRef = useRef<SVGCircleElement>(null);
  const glassGlareRef = useRef<SVGCircleElement>(null);
  const bladePolygonRefs = useRef<(SVGGElement | null)[]>([]);
  const schematicRef = useRef<SVGSVGElement>(null);
  const scene1HudRef = useRef<HTMLDivElement>(null);
  const estBadgeRef = useRef<HTMLDivElement>(null);
  const titleCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Xenon Camera Flash Strobe Refs
  const xenonFlashUnitRef = useRef<SVGGElement>(null);
  const flashBurstOverlayRef = useRef<HTMLDivElement>(null);

  // Disciplined Left Telemetry Rail & Right 6-Frame Vertical Film Reel Refs
  const leftDisciplineRailRef = useRef<HTMLDivElement>(null);
  const rightFilmReelRailRef = useRef<HTMLDivElement>(null);
  const rightFilmTrackRef = useRef<HTMLDivElement>(null);

  // Single Disciplined Scroll Line Refs (One structured golden line from top to bottom)
  const singleAxisPathRef = useRef<SVGPathElement>(null);
  const singleAxisNodeRef = useRef<HTMLDivElement>(null);

  const [fStop, setFStop] = useState("f/16.0");
  const [shutterSpeed, setShutterSpeed] = useState("1/250s");
  const [activeStopIdx, setActiveStopIdx] = useState(7);
  const [isMobile, setIsMobile] = useState(false);
  const [filmFrames, setFilmFrames] = useState(FILM_REEL_FRAMES);

  useEffect(() => {
    fetch("/api/hero-reel")
      .then((r) => r.json())
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setFilmFrames(
            res.data.map((d: any, idx: number) => {
              const defaultFrame = FILM_REEL_FRAMES[idx] || FILM_REEL_FRAMES[0];
              return {
                id: d.frameCode || String(idx + 1).padStart(2, "0"),
                title: d.title || defaultFrame.title,
                src:
                  d.src && !d.src.startsWith("blob:")
                    ? d.src
                    : defaultFrame.src,
                exif: d.exif || defaultFrame.exif,
              };
            })
          );
        }
      })
      .catch(() => {});
  }, []);

  // Compute exact responsive lens portal radius so the circular photo inside the lens
  // matches the SVG inner lens rim on mobile, laptop, and desktop displays
  const getLensPortalRadius = useCallback(() => {
    const svgEl = cameraBodyLayerRef.current?.querySelector("svg");
    if (svgEl) {
      const rect = svgEl.getBoundingClientRect();
      if (rect.width > 0) {
        return Math.round(rect.width * 0.128);
      }
    }
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const svgWidth =
      vw < 1024
        ? Math.min(vw * 0.9, vh * 0.68, 520)
        : Math.min(vw * 0.64, vh * 0.7, 740);
    return Math.round(svgWidth * 0.128);
  }, []);

  // Detect mobile/tablet viewport and dynamically update lens portal on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (clipMaskRef.current && window.scrollY < 60) {
        gsap.set(clipMaskRef.current, {
          clipPath: `circle(${getLensPortalRadius()}px at 50% 50%)`,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getLensPortalRadius]);

  // Subtle, disciplined optical glass reflection & single-line backdrop parallax on mouse move (RAF-throttled)
  useEffect(() => {
    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;

    const updateParallax = () => {
      rafId = null;
      if (glassGlareRef.current) {
        gsap.to(glassGlareRef.current, {
          x: targetX * 12,
          y: targetY * 12,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (cameraBackTextLayerRef.current) {
        gsap.to(cameraBackTextLayerRef.current, {
          x: targetX * -8,
          y: targetY * -5,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const sharedTrack = document.getElementById("exhibition-scroll-track");
      const sharedViewport = document.getElementById(
        "exhibition-pinned-viewport"
      );

      const validBlades = bladePolygonRefs.current.filter(Boolean);
      const validTitleChars = titleCharsRef.current.filter(Boolean);

      const initialRadius = getLensPortalRadius();

      // Hero photo starts strictly inside the circular lens barrel at exact center 50% 50%
      gsap.set(clipMaskRef.current, {
        clipPath: `circle(${initialRadius}px at 50% 50%)`,
      });
      gsap.set(heroImageRef.current, {
        scale: 1.48,
        filter:
          "blur(5px) brightness(0.52) contrast(1.05)",
      });
      gsap.set(validTitleChars, {
        opacity: 0,
        y: 70,
        rotateX: -70,
        scale: 0.88,
        filter: "blur(10px)",
      });
      gsap.set(estBadgeRef.current, { opacity: 0, y: 24 });
      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 20,
        letterSpacing: "0.52em",
        filter: "blur(10px)",
      });
      gsap.set(taglineRef.current, { opacity: 0, y: 20 });
      gsap.set(flashBurstOverlayRef.current, { opacity: 0, scale: 0.7 });

      // =========================================================================
      // SHARED MASTER PIN (Locks the 100vh stage continuously across Scene 1 + Scene 2)
      // Scene 1 = 240vh (2.4 * innerHeight), Scene 2 = 1100vh (11.0 * innerHeight)
      // Total continuous pinned duration = 1340vh (13.4 * innerHeight)
      // =========================================================================
      if (sharedTrack && sharedViewport) {
        ScrollTrigger.create({
          trigger: sharedTrack,
          pin: sharedViewport,
          start: "top top",
          end: () => `+=${window.innerHeight * 13.4}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }

      // ========== SCENE 1 MASTER TIMELINE (First 240vh of the shared track) ==========
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sharedTrack || container,
          pin: sharedTrack ? false : true,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.4}`,
          scrub: 0.8,
          anticipatePin: sharedTrack ? 0 : 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const currentF = Math.max(1.4, 16 - p * 24).toFixed(1);
            setFStop(`f/${currentF}`);
            setShutterSpeed(
              p > 0.4 ? "1/1000s" : p > 0.2 ? "1/500s" : "1/250s"
            );

            // Update active f-stop on the disciplined Left Rail
            const idx = Math.min(
              7,
              Math.max(0, Math.round((1 - Math.min(1, p * 2.2)) * 7))
            );
            setActiveStopIdx(idx);
          },
        },
      });

      // --- PHASE 1 (0% → 28%): SHUTTER BUTTON PRESSES, XENON FLASH FIRES & SHUTTER BLADES OPEN ---
      tl.to(
        shutterButtonRef.current,
        {
          y: 5,
          duration: 0.06,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        tallyLightRef.current,
        {
          attr: { r: 8 },
          opacity: 1,
          duration: 0.08,
          ease: "power2.out",
        },
        0
      );

      // REAL XENON CAMERA FLASH BURST!
      tl.to(
        xenonFlashUnitRef.current,
        {
          filter:
            "brightness(3.2) drop-shadow(0 0 30px rgba(255,250,220,0.95))",
          duration: 0.06,
          ease: "power4.out",
        },
        0.02
      );
      tl.to(
        xenonFlashUnitRef.current,
        {
          filter: "brightness(1) drop-shadow(0 0 0px rgba(255,250,220,0))",
          duration: 0.14,
          ease: "power2.in",
        },
        0.08
      );

      tl.to(
        flashBurstOverlayRef.current,
        {
          opacity: 0.82,
          scale: 1.35,
          duration: 0.06,
          ease: "power4.out",
        },
        0.02
      );
      tl.to(
        flashBurstOverlayRef.current,
        {
          opacity: 0,
          scale: 1.85,
          duration: 0.18,
          ease: "power2.out",
        },
        0.08
      );

      tl.to(
        scrollHintRef.current,
        {
          opacity: 0,
          y: 16,
          duration: 0.14,
          ease: "power2.out",
        },
        0
      );

      // 6-Frame Right Film Reel glides straight upward
      if (rightFilmTrackRef.current) {
        tl.to(
          rightFilmTrackRef.current,
          {
            y: -210,
            duration: 0.36,
            ease: "none",
          },
          0
        );
      }

      // Mechanical lens rings rotate smoothly in place
      tl.to(
        outerBarrelRef.current,
        {
          rotation: -32,
          svgOrigin: "300 300",
          duration: 0.32,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        innerRingRef.current,
        {
          rotation: 36,
          svgOrigin: "300 300",
          duration: 0.32,
          ease: "power2.inOut",
        },
        0
      );

      // ONLY the 8 Mechanical Shutter Blades pivot open around their brass pins
      tl.to(
        validBlades,
        {
          rotation: -55,
          scale: 0.72,
          opacity: 0,
          svgOrigin: "272 118",
          stagger: 0.008,
          duration: 0.28,
          ease: "power2.inOut",
        },
        0.02
      );

      // Fade out the thin inner reticle once shutter blades are open
      tl.to(
        shutterOverlayLayerRef.current,
        {
          opacity: 0,
          duration: 0.12,
          ease: "power2.out",
        },
        0.22
      );

      // --- PHASE 2 (18% → 56%): WE GO INSIDE THE OPEN LENS (PORTAL EXPANDS TO FULL SCREEN) ---
      tl.fromTo(
        clipMaskRef.current,
        {
          clipPath: () => `circle(${getLensPortalRadius()}px at 50% 50%)`,
        },
        {
          clipPath: "circle(145vmax at 50% 50%)",
          duration: 0.38,
          ease: "power2.inOut",
        },
        0.18
      );

      // As the portal expands from the lens, the hero photograph pulls focus & settles at scale 1.05
      // Dimmed background with subtle blur for clear, comfortable foreground text readability
      tl.to(
        heroImageRef.current,
        {
          scale: 1.05,
          filter:
            "blur(3.2px) brightness(0.48) contrast(1.06)",
          duration: 0.52,
          ease: "power2.out",
        },
        0.05
      );

      // Golden optical flare sweeps across the glass as we enter the lens
      tl.fromTo(
        opticalFlareRef.current,
        { opacity: 0.85, scale: 0.4 },
        { opacity: 0.24, scale: 1.65, duration: 0.5, ease: "power2.out" },
        0.1
      );

      // Fade out stationary camera, single-line back typography & side rails cleanly behind the expanding photo
      const fadeTargets = [
        cameraBackTextLayerRef.current,
        cameraBodyLayerRef.current,
        schematicRef.current,
        leftDisciplineRailRef.current,
        rightFilmReelRailRef.current,
      ].filter(Boolean);

      tl.to(
        fadeTargets,
        {
          opacity: 0,
          duration: 0.22,
          ease: "power2.inOut",
        },
        0.24
      );

      // --- PHASE 3 (30% → 70%): "SHUTTERSCAPE" LETTER-BY-LETTER REVEAL ---
      tl.to(
        estBadgeRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.22,
          ease: "power2.out",
        },
        0.3
      );

      tl.to(
        validTitleChars,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.024,
          duration: 0.36,
          ease: "power3.out",
        },
        0.33
      );

      // --- PHASE 4 (52% → 78%): SUBTITLE & TAGLINE FOCUS PULL ---
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.34em",
          filter: "blur(0px)",
          duration: 0.26,
          ease: "power2.out",
        },
        0.52
      );

      tl.to(
        taglineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.24,
          ease: "power2.out",
        },
        0.58
      );

      // --- PHASE 5 (85% → 100%): FREEZE THE BACKGROUND & CLEAR FOREGROUND TEXT FOR SCENE 2 ---
      // STEP 1: We do NOT zoom, blur, or darken heroImageRef here! The background remains 100% frozen
      // in its exact position and appearance while Scene 1's foreground typography & HUD clear for Scene 2.
      tl.to(
        [
          estBadgeRef.current,
          subtitleRef.current,
          taglineRef.current,
          scene1HudRef.current,
          ...validTitleChars,
        ].filter(Boolean),
        {
          opacity: 0,
          y: -30,
          filter: "blur(6px)",
          duration: 0.15,
          ease: "power2.inOut",
        },
        0.85
      );

      // =========================================================================
      // ONE SINGLE DISCIPLINED GOLDEN GUIDE LINE ACROSS THE WEBSITE
      // =========================================================================
      if (singleAxisPathRef.current) {
        const lineLen = singleAxisPathRef.current.getTotalLength
          ? singleAxisPathRef.current.getTotalLength()
          : 1200;

        gsap.set(singleAxisPathRef.current, {
          strokeDasharray: lineLen,
          strokeDashoffset: lineLen,
        });

        gsap.to(singleAxisPathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onUpdate: (self) => {
              if (singleAxisNodeRef.current) {
                const yVh = self.progress * 84 + 8;
                singleAxisNodeRef.current.style.top = `${yVh}vh`;
              }
            },
          },
        });
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const titleChars = "SHUTTERSCAPE".split("");

  // 120 Knurled metallic focus-ring grip ridges around the lens barrel
  const knurlRidges = Array.from({ length: 120 }, (_, i) => {
    const angle = i * 3;
    return (
      <line
        key={i}
        x1="300"
        y1="10"
        x2="300"
        y2="24"
        stroke={i % 2 === 0 ? "#2E2E2E" : "#090909"}
        strokeWidth="2.2"
        transform={`rotate(${angle} 300 300)`}
      />
    );
  });

  // Precision lens barrel degree & focal scale markings
  const scaleTicks = Array.from({ length: 60 }, (_, i) => {
    const angle = i * 6;
    const isMajor = i % 5 === 0;
    return (
      <line
        key={i}
        x1="300"
        y1={isMajor ? "44" : "50"}
        x2="300"
        y2="57"
        stroke={isMajor ? "#D4A843" : "#8A8A8A"}
        strokeWidth={isMajor ? "1.6" : "0.8"}
        strokeOpacity={isMajor ? "0.85" : "0.4"}
        transform={`rotate(${angle} 300 300)`}
      />
    );
  });

  return (
    <>
      {/* =====================================================================
          ONE SINGLE DISCIPLINED GOLDEN SCROLL LINE (Fixed Architectural Axis)
          MOVED OUTSIDE overflow: hidden so it covers the ENTIRE website!
          ===================================================================== */}
      <div
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          right: isMobile ? "6px" : "14px",
          width: "20px",
          pointerEvents: "none",
          zIndex: 9999, // Super High z-index to overlay all scenes
          display: "flex",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 24 1000"
          preserveAspectRatio="none"
          style={{ width: "20px", height: "100vh", overflow: "visible" }}
        >
          <line
            x1="12"
            y1="80"
            x2="12"
            y2="920"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
          <path
            ref={singleAxisPathRef}
            d="M 12,80 L 12,920"
            fill="none"
            stroke="#D4A843"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <div
          ref={singleAxisNodeRef}
          style={{
            position: "absolute",
            top: "8vh",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: "#FFE099",
            boxShadow: "0 0 10px #D4A843, 0 0 20px rgba(212,168,67,0.8)",
          }}
        />
      </div>

      <div
        ref={wrapperRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        {/* =====================================================================
            SCENE 1: HERO SECTION ("THE APERTURE")
            ===================================================================== */}
        <section
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            backgroundColor: "#050505",
            overflow: "hidden",
            userSelect: "none",
          }}
        >
          {/* ============================================================
              BACKGROUND LAYER: STUDIO RIM BACKLIGHT & ARCHITECTURAL GRID
              ============================================================ */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 48%, rgba(212,168,67,0.16) 0%, rgba(22,20,18,0.65) 38%, #050505 76%)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Disciplined Architectural Studio Grid Lines */}
          <svg
            ref={schematicRef}
            viewBox="0 0 1920 1080"
            preserveAspectRatio="xMidYMid slice"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
              pointerEvents: "none",
              opacity: 0.45,
            }}
          >
            <line
              x1="265"
              y1="540"
              x2="1655"
              y2="540"
              stroke="#D4A843"
              strokeWidth="0.6"
              strokeDasharray="6 10"
              strokeOpacity="0.3"
            />
            <line
              x1="960"
              y1="70"
              x2="960"
              y2="1010"
              stroke="#D4A843"
              strokeWidth="0.6"
              strokeDasharray="6 10"
              strokeOpacity="0.3"
            />

            <line
              x1="265"
              y1="70"
              x2="265"
              y2="1010"
              stroke="#D4A843"
              strokeWidth="0.7"
              strokeOpacity="0.24"
            />
            <line
              x1="1655"
              y1="70"
              x2="1655"
              y2="1010"
              stroke="#D4A843"
              strokeWidth="0.7"
              strokeOpacity="0.24"
            />

            <polyline
              points="1140,260 1280,175 1440,175"
              fill="none"
              stroke="#D4A843"
              strokeWidth="0.9"
              strokeOpacity="0.55"
            />
            <circle cx="1440" cy="175" r="3" fill="#D4A843" />

            <polyline
              points="690,710 580,825 440,825"
              fill="none"
              stroke="#D4A843"
              strokeWidth="0.9"
              strokeOpacity="0.55"
            />
            <circle cx="440" cy="825" r="3" fill="#D4A843" />

            <polyline
              points="1180,710 1310,825 1470,825"
              fill="none"
              stroke="#D4A843"
              strokeWidth="0.9"
              strokeOpacity="0.55"
            />
            <circle cx="1470" cy="825" r="3" fill="#D4A843" />

            <circle
              cx="960"
              cy="540"
              r="395"
              fill="none"
              stroke="#D4A843"
              strokeWidth="0.8"
              strokeDasharray="4 12"
              strokeOpacity="0.38"
            />
            <circle
              cx="960"
              cy="540"
              r="465"
              fill="none"
              stroke="#8A8A8A"
              strokeWidth="0.5"
              strokeOpacity="0.22"
            />
          </svg>

          {/* ============================================================
              LAYER 0.5 (z-index: 12): 1 SINGLE CENTERED ARCHITECTURAL LINE BEHIND CAMERA
              ============================================================ */}
          <div
            ref={cameraBackTextLayerRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              willChange: "transform, opacity",
              padding: isMobile ? "0 16px" : "0 240px",
            }}
          >
            <div
              className="font-display"
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: isMobile
                  ? "clamp(1.35rem, 6.2vw, 2.4rem)"
                  : "clamp(2.2rem, 4.3vw, 4.5rem)",
                fontWeight: 300,
                letterSpacing: isMobile ? "0.22em" : "0.26em",
                paddingLeft: isMobile ? "0.22em" : "0.26em",
                color: "rgba(255, 255, 255, 0.035)",
                WebkitTextStroke: "1px rgba(212, 168, 67, 0.22)",
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}
            >
              BEYOND THE LENS
            </div>

            <div
              className="font-mono"
              style={{
                position: "absolute",
                top: isMobile ? "22%" : "13.8%",
                right: isMobile ? "16%" : "25%",
                textAlign: "right",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "7px" : "8.5px",
                  letterSpacing: "0.24em",
                  color: "#D4A843",
                }}
              >
                02 // VIEWFINDER
              </div>
              <div
                style={{
                  fontSize: isMobile ? "8px" : "10px",
                  letterSpacing: "0.18em",
                  color: "rgba(232,232,232,0.75)",
                  marginTop: "2px",
                }}
              >
                0.78X OPTICAL PRISM
              </div>
            </div>

            <div
              className="font-mono"
              style={{
                position: "absolute",
                bottom: isMobile ? "22%" : "17.5%",
                left: isMobile ? "16%" : "23%",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "7px" : "8.5px",
                  letterSpacing: "0.24em",
                  color: "#D4A843",
                }}
              >
                03 // CHASSIS
              </div>
              <div
                style={{
                  fontSize: isMobile ? "8px" : "10px",
                  letterSpacing: "0.18em",
                  color: "rgba(232,232,232,0.75)",
                  marginTop: "2px",
                }}
              >
                MAGNESIUM & VULCANITE
              </div>
            </div>

            <div
              className="font-mono"
              style={{
                position: "absolute",
                bottom: isMobile ? "22%" : "17.5%",
                right: isMobile ? "16%" : "23.5%",
                textAlign: "right",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "7px" : "8.5px",
                  letterSpacing: "0.24em",
                  color: "#D4A843",
                }}
              >
                04 // DIAPHRAGM
              </div>
              <div
                style={{
                  fontSize: isMobile ? "8px" : "10px",
                  letterSpacing: "0.18em",
                  color: "rgba(232,232,232,0.75)",
                  marginTop: "2px",
                }}
              >
                8-BLADE CARBON STEEL IRIS
              </div>
            </div>
          </div>

          {/* ============================================================
              LEFT DISCIPLINED TELEMETRY RAIL (z-index: 15)
              ============================================================ */}
          <div
            ref={leftDisciplineRailRef}
            style={{
              position: "absolute",
              top: isMobile ? "108px" : "135px",
              bottom: isMobile ? "64px" : "78px",
              left: isMobile ? "8px" : "clamp(24px, 2.8vw, 48px)",
              width: isMobile ? "68px" : "196px",
              zIndex: 15,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              pointerEvents: "none",
            }}
          >
            <div
              className="font-mono"
              style={{
                borderLeft: isMobile ? "1px solid #D4A843" : "1.5px solid #D4A843",
                paddingLeft: isMobile ? "6px" : "14px",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "6.5px" : "9px",
                  letterSpacing: isMobile ? "0.18em" : "0.26em",
                  color: "#D4A843",
                  marginBottom: isMobile ? "2px" : "4px",
                }}
              >
                OPTICAL BENCH // 01
              </div>
              <div
                style={{
                  fontSize: isMobile ? "8px" : "11px",
                  letterSpacing: "0.18em",
                  color: "#FAFAFA",
                }}
              >
                85MM F/1.4 ASPH
              </div>
              <div
                style={{
                  fontSize: isMobile ? "6px" : "8.5px",
                  letterSpacing: "0.18em",
                  color: "#8A8A8A",
                  marginTop: isMobile ? "1px" : "3px",
                }}
              >
                {isMobile ? "26.14°N 91.73°E" : "26.1445° N · 91.7362° E"}
              </div>
            </div>

            <div
              className="font-mono"
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "5px" : "12px",
                paddingLeft: isMobile ? "10px" : "18px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "0px",
                  top: "4px",
                  bottom: "4px",
                  width: "1px",
                  backgroundColor: "rgba(212, 168, 67, 0.28)",
                }}
              />
              {APERTURE_LADDER.map((item, idx) => {
                const isCurrent = idx === activeStopIdx;
                return (
                  <div
                    key={item.stop}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: isMobile
                          ? (isCurrent ? "-12px" : "-10px")
                          : (isCurrent ? "-21.5px" : "-18px"),
                        width: isMobile ? (isCurrent ? "4px" : "3px") : (isCurrent ? "7px" : "6px"),
                        height: isMobile
                          ? (isCurrent ? "4px" : "1px")
                          : (isCurrent ? "7px" : "1px"),
                        borderRadius: isCurrent ? "50%" : "0",
                        backgroundColor: isCurrent
                          ? "#FFE099"
                          : "rgba(212, 168, 67, 0.4)",
                        boxShadow: isCurrent ? "0 0 10px #D4A843" : "none",
                      }}
                    />
                    <span
                      style={{
                        fontSize: isMobile ? "7px" : "10px",
                        letterSpacing: isMobile ? "0.1em" : "0.16em",
                        color: isCurrent ? "#FAFAFA" : "#8A8A8A",
                        fontWeight: isCurrent ? 700 : 400,
                      }}
                    >
                      {item.stop}
                    </span>
                    {!isMobile && (
                      <span
                        style={{
                          fontSize: "7.5px",
                          letterSpacing: "0.16em",
                          color: isCurrent
                            ? "#D4A843"
                            : "rgba(138,138,138,0.45)",
                        }}
                      >
                        {item.mode}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              className="font-mono"
              style={{
                backgroundColor: "rgba(12, 12, 14, 0.78)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderLeft: isMobile ? "1px solid #D4A843" : "1.5px solid #D4A843",
                borderRadius: isMobile ? "4px" : "6px",
                padding: isMobile ? "4px 6px" : "9px 12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: isMobile ? "6px" : "8px",
                  letterSpacing: "0.2em",
                  color: "#D4A843",
                  marginBottom: isMobile ? "2px" : "6px",
                }}
              >
                <span>{isMobile ? "LUM" : "LUMINANCE"}</span>
                <span>14.2 EV</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: isMobile ? "1.5px" : "2.5px",
                  height: isMobile ? "14px" : "24px",
                }}
              >
                {WAVEFORM_BARS.slice(0, isMobile ? 12 : 24).map((h, i) => (
                  <span
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      backgroundColor:
                        i > (isMobile ? 3 : 6) && i < (isMobile ? 9 : 16)
                          ? "rgba(212, 168, 67, 0.8)"
                          : "rgba(138, 138, 138, 0.32)",
                      borderRadius: "1px",
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              className="font-mono"
              style={{
                borderLeft: isMobile ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.2)",
                paddingLeft: isMobile ? "6px" : "14px",
                fontSize: isMobile ? "6px" : "8.5px",
                letterSpacing: isMobile ? "0.14em" : "0.22em",
                lineHeight: isMobile ? 1.4 : 1.85,
                color: "#8A8A8A",
              }}
            >
              <div style={{ color: "#E8E8E8" }}>CAPTURING</div>
              <div>PEOPLE · PLACES</div>
              <div>PERSPECTIVES</div>
            </div>
          </div>

          {/* ============================================================
              RIGHT DISCIPLINED 6-FRAME VERTICAL 35MM FILM REEL (z-index: 15)
              ============================================================ */}
          <div
            ref={rightFilmReelRailRef}
            style={{
              position: "absolute",
              top: isMobile ? "108px" : "135px",
              bottom: isMobile ? "64px" : "74px",
              right: isMobile ? "8px" : "clamp(38px, 3.6vw, 66px)",
              width: isMobile ? "68px" : "clamp(172px, 15vw, 218px)",
              zIndex: 15,
              overflow: "hidden",
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              borderTop: "1px solid rgba(212, 168, 67, 0.4)",
              borderBottom: "1px solid rgba(212, 168, 67, 0.4)",
              backgroundColor: "rgba(8, 8, 10, 0.75)",
            }}
          >
            <div
              className="font-mono"
              style={{
                padding: isMobile ? "4px 6px" : "7px 10px",
                backgroundColor: "rgba(10, 10, 12, 0.95)",
                borderBottom: "1px solid rgba(212, 168, 67, 0.24)",
                display: "flex",
                justifyContent: "space-between",
                fontSize: isMobile ? "6px" : "8px",
                letterSpacing: isMobile ? "0.14em" : "0.22em",
                color: "#D4A843",
                zIndex: 3,
              }}
            >
              <span>{isMobile ? "REEL 01–06" : "REEL // 01A–06F"}</span>
              <span>{isMobile ? "6F" : "6 FRAMES"}</span>
            </div>

            <div
              ref={rightFilmTrackRef}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "5px" : "10px",
                padding: isMobile ? "5px 3px" : "10px",
                borderLeft: "1px solid rgba(212, 168, 67, 0.22)",
                borderRight: "1px solid rgba(212, 168, 67, 0.22)",
                willChange: "transform",
              }}
            >
              {filmFrames.map((frame, fIdx) => (
                <div
                  key={frame.id}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    padding: isMobile ? "3px 4px" : "6px 8px",
                    backgroundColor: "rgba(16, 16, 18, 0.94)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: isMobile ? "3px" : "6px",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: isMobile ? "2px" : "5px",
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: isMobile ? "6px" : "8px",
                        letterSpacing: isMobile ? "0.12em" : "0.2em",
                        color: "#D4A843",
                      }}
                    >
                      ▸ {frame.id}
                    </span>
                    <div style={{ display: "flex", gap: "2px" }}>
                      {Array.from({ length: isMobile ? 2 : 4 }).map((_, idx) => (
                        <span
                          key={idx}
                          style={{
                            width: isMobile ? "4px" : "6px",
                            height: isMobile ? "3px" : "4px",
                            borderRadius: "1px",
                            backgroundColor: "#050505",
                            border: "0.5px solid rgba(212,168,67,0.45)",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: isMobile ? "32px" : "88px",
                      borderRadius: isMobile ? "2px" : "4px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={frame.src}
                      alt={frame.title}
                      fill
                      priority={fIdx < 3}
                      unoptimized={frame.src.startsWith("/api/media/")}
                      sizes={isMobile ? "70px" : "210px"}
                      style={{
                        objectFit: "cover",
                        filter: "contrast(1.08) brightness(0.92)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 60%)",
                      }}
                    />
                    <span
                      className="font-display"
                      style={{
                        position: "absolute",
                        bottom: isMobile ? "2px" : "5px",
                        left: isMobile ? "3px" : "7px",
                        fontSize: isMobile ? "6.5px" : "11.5px",
                        letterSpacing: isMobile ? "0.08em" : "0.12em",
                        color: "#FAFAFA",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "92%",
                      }}
                    >
                      {frame.title}
                    </span>
                  </div>

                  <div
                    className="font-mono"
                    style={{
                      marginTop: isMobile ? "2px" : "5px",
                      fontSize: isMobile ? "5.5px" : "7.5px",
                      letterSpacing: isMobile ? "0.08em" : "0.14em",
                      color: "#8A8A8A",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {frame.exif}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: isMobile ? "20px" : "36px",
                background:
                  "linear-gradient(to top, rgba(8,8,10,0.95) 0%, transparent 100%)",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
          </div>

          {/* ============================================================
              LAYER 1 (z-index: 18): STATIONARY PHOTOREALISTIC CAMERA BODY, XENON FLASH & LENS BARREL
              ============================================================ */}
          <div
            ref={cameraBodyLayerRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            {USE_REAL_CAMERA_IMAGE ? (
              <div
                style={{
                  position: "relative",
                  width: isMobile ? "min(54vw, 26vh, 210px)" : "min(64vw, 70vh, 740px)",
                  height: isMobile ? "min(38vw, 18vh, 145px)" : "min(44vw, 48vh, 510px)",
                }}
              >
                <Image
                  src={REAL_CAMERA_SRC}
                  alt="ShutterScape Camera"
                  fill
                  priority
                  sizes="740px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            ) : (
              <svg
                viewBox="0 0 1100 760"
                style={{
                  width: isMobile ? "min(54vw, 26vh, 210px)" : "min(64vw, 70vh, 740px)",
                  height: "auto",
                  overflow: "visible",
                  filter: "drop-shadow(0 40px 90px rgba(0,0,0,0.96))",
                }}
              >
                <defs>
                  <linearGradient
                    id="chromeTopDeck"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#141414" />
                    <stop offset="12%" stopColor="#3E3A35" />
                    <stop offset="28%" stopColor="#1F1F1F" />
                    <stop offset="50%" stopColor="#2F2D2A" />
                    <stop offset="72%" stopColor="#181818" />
                    <stop offset="88%" stopColor="#3D3832" />
                    <stop offset="100%" stopColor="#111111" />
                  </linearGradient>

                  <linearGradient
                    id="deckVerticalSheen"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="rgba(255,230,175,0.28)" />
                    <stop offset="20%" stopColor="rgba(255,255,255,0.04)" />
                    <stop offset="85%" stopColor="rgba(0,0,0,0.45)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.88)" />
                  </linearGradient>

                  <linearGradient
                    id="chassisShadow"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#1A1A1A" />
                    <stop offset="40%" stopColor="#0E0E0E" />
                    <stop offset="100%" stopColor="#050505" />
                  </linearGradient>

                  <pattern
                    id="vulcaniteLeather"
                    width="6"
                    height="6"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect width="6" height="6" fill="#0B0B0B" />
                    <circle cx="1.5" cy="1.5" r="0.9" fill="#1C1C1C" />
                    <circle cx="4.5" cy="4.5" r="0.9" fill="#1A1A1A" />
                    <circle cx="1.5" cy="4.5" r="0.6" fill="#050505" />
                    <circle cx="4.5" cy="1.5" r="0.6" fill="#060606" />
                    <circle cx="3" cy="3" r="0.5" fill="#141414" />
                  </pattern>

                  <linearGradient
                    id="ergoGripShade"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="rgba(0,0,0,0.92)" />
                    <stop offset="30%" stopColor="rgba(255,230,180,0.09)" />
                    <stop offset="55%" stopColor="rgba(0,0,0,0.22)" />
                    <stop offset="85%" stopColor="rgba(0,0,0,0.85)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.95)" />
                  </linearGradient>

                  <linearGradient
                    id="dialCylinder"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#0F0F0F" />
                    <stop offset="25%" stopColor="#48443E" />
                    <stop offset="50%" stopColor="#242424" />
                    <stop offset="78%" stopColor="#3E3A35" />
                    <stop offset="100%" stopColor="#0C0C0C" />
                  </linearGradient>

                  <linearGradient
                    id="metalHousing"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#322C24" />
                    <stop offset="35%" stopColor="#151515" />
                    <stop offset="70%" stopColor="#090909" />
                    <stop offset="100%" stopColor="#2D261E" />
                  </linearGradient>

                  <linearGradient
                    id="goldenRimHighlight"
                    x1="5%"
                    y1="5%"
                    x2="95%"
                    y2="95%"
                  >
                    <stop offset="0%" stopColor="#FFE39F" stopOpacity="0.9" />
                    <stop offset="22%" stopColor="#D4A843" stopOpacity="0.55" />
                    <stop offset="50%" stopColor="#222222" stopOpacity="0.2" />
                    <stop offset="78%" stopColor="#D4A843" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#FFD47E" stopOpacity="0.88" />
                  </linearGradient>

                  <radialGradient id="vfGlass" cx="30%" cy="30%" r="75%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.35)" />
                    <stop offset="35%" stopColor="rgba(56, 189, 248, 0.18)" />
                    <stop offset="70%" stopColor="rgba(212, 168, 67, 0.14)" />
                    <stop offset="100%" stopColor="rgba(5, 5, 5, 0.95)" />
                  </radialGradient>

                  <radialGradient id="xenonReflector" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="45%" stopColor="#FFF3D1" />
                    <stop offset="80%" stopColor="#9E9A90" />
                    <stop offset="100%" stopColor="#2A2A2A" />
                  </radialGradient>

                  <path
                    id="lensTopEngraving"
                    d="M 102,300 A 198,198 0 1,1 498,300"
                    fill="none"
                  />
                  <path
                    id="lensBottomEngraving"
                    d="M 498,300 A 198,198 0 1,1 102,300"
                    fill="none"
                  />
                </defs>

                <ellipse
                  cx="550"
                  cy="628"
                  rx="390"
                  ry="30"
                  fill="rgba(0,0,0,0.88)"
                />

                <g transform="translate(0, -22)">
                  <g ref={shutterButtonRef}>
                    <rect
                      x="255"
                      y="112"
                      width="42"
                      height="14"
                      rx="3"
                      fill="url(#dialCylinder)"
                      stroke="#D4A843"
                      strokeWidth="0.9"
                    />
                    <rect
                      x="244"
                      y="124"
                      width="64"
                      height="18"
                      rx="2.5"
                      fill="url(#dialCylinder)"
                      stroke="#2A2A2A"
                      strokeWidth="1"
                    />
                  </g>

                  <g>
                    <rect
                      x="336"
                      y="116"
                      width="68"
                      height="26"
                      rx="2.5"
                      fill="url(#dialCylinder)"
                      stroke="#333333"
                      strokeWidth="1"
                    />
                    {Array.from({ length: 16 }).map((_, i) => (
                      <line
                        key={i}
                        x1={340 + i * 4}
                        y1="117"
                        x2={340 + i * 4}
                        y2="141"
                        stroke="#0A0A0A"
                        strokeWidth="1.3"
                      />
                    ))}
                  </g>

                  <g>
                    <rect
                      x="708"
                      y="115"
                      width="74"
                      height="27"
                      rx="2.5"
                      fill="url(#dialCylinder)"
                      stroke="#333333"
                      strokeWidth="1"
                    />
                    {Array.from({ length: 17 }).map((_, i) => (
                      <line
                        key={i}
                        x1={712 + i * 4.1}
                        y1="116"
                        x2={712 + i * 4.1}
                        y2="141"
                        stroke="#0A0A0A"
                        strokeWidth="1.3"
                      />
                    ))}
                  </g>

                  <g>
                    <rect
                      x="802"
                      y="122"
                      width="50"
                      height="20"
                      rx="2"
                      fill="url(#dialCylinder)"
                      stroke="#2A2A2A"
                      strokeWidth="1"
                    />
                    {Array.from({ length: 11 }).map((_, i) => (
                      <line
                        key={i}
                        x1={806 + i * 4.2}
                        y1="123"
                        x2={806 + i * 4.2}
                        y2="141"
                        stroke="#0A0A0A"
                        strokeWidth="1.2"
                      />
                    ))}
                  </g>

                  <path
                    d="M 418 142 L 456 76 C 462 66, 472 62, 486 62 L 614 62 C 628 62, 638 66, 644 76 L 682 142 Z"
                    fill="url(#chromeTopDeck)"
                    stroke="#383838"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 418 142 L 456 76 C 462 66, 472 62, 486 62 L 614 62 C 628 62, 638 66, 644 76 L 682 142 Z"
                    fill="url(#deckVerticalSheen)"
                  />

                  {/* PRO XENON CAMERA FLASH / FRESNEL STROBE UNIT */}
                  <g ref={xenonFlashUnitRef}>
                    <path
                      d="M 505 62 L 505 50 L 595 50 L 595 62"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="2.2"
                    />
                    <rect
                      x="482"
                      y="10"
                      width="136"
                      height="44"
                      rx="7"
                      fill="url(#chromeTopDeck)"
                      stroke="#D4A843"
                      strokeWidth="1.2"
                      strokeOpacity="0.7"
                    />
                    <rect
                      x="492"
                      y="16"
                      width="116"
                      height="32"
                      rx="4"
                      fill="url(#xenonReflector)"
                      stroke="#444"
                      strokeWidth="1"
                    />
                    {Array.from({ length: 18 }).map((_, idx) => (
                      <line
                        key={idx}
                        x1={498 + idx * 6}
                        y1="17"
                        x2={498 + idx * 6}
                        y2="47"
                        stroke="rgba(20,20,20,0.28)"
                        strokeWidth="1"
                      />
                    ))}
                    <line
                      x1="494"
                      y1="32"
                      x2="606"
                      y2="32"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />
                  </g>

                  <text
                    x="550"
                    y="114"
                    textAnchor="middle"
                    fill="#E5E0D5"
                    fontSize="11.5"
                    fontFamily="serif"
                    letterSpacing="6.5px"
                    opacity="0.9"
                  >
                    SHUTTERSCAPE
                  </text>

                  <rect
                    x="148"
                    y="246"
                    width="20"
                    height="16"
                    rx="3"
                    fill="url(#dialCylinder)"
                    stroke="#3A3A3A"
                    strokeWidth="1"
                  />
                  <rect
                    x="932"
                    y="246"
                    width="20"
                    height="16"
                    rx="3"
                    fill="url(#dialCylinder)"
                    stroke="#3A3A3A"
                    strokeWidth="1"
                  />

                  <rect
                    x="166"
                    y="140"
                    width="768"
                    height="492"
                    rx="36"
                    fill="url(#chassisShadow)"
                    stroke="#2C2C2C"
                    strokeWidth="1.8"
                  />
                  <rect
                    x="168"
                    y="224"
                    width="764"
                    height="374"
                    fill="url(#vulcaniteLeather)"
                  />
                  <radialGradient id="mountBodyShadow" cx="50%" cy="55%" r="50%">
                    <stop offset="45%" stopColor="rgba(0,0,0,0.88)" />
                    <stop offset="72%" stopColor="rgba(0,0,0,0.28)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.68)" />
                  </radialGradient>
                  <rect
                    x="168"
                    y="224"
                    width="764"
                    height="374"
                    fill="url(#mountBodyShadow)"
                  />

                  <path
                    d="M 202 140 L 898 140 C 918 140, 934 156, 934 176 L 934 224 L 166 224 L 166 176 C 166 156, 182 140, 202 140 Z"
                    fill="url(#chromeTopDeck)"
                  />
                  <path
                    d="M 202 140 L 898 140 C 918 140, 934 156, 934 176 L 934 224 L 166 224 L 166 176 C 166 156, 182 140, 202 140 Z"
                    fill="url(#deckVerticalSheen)"
                  />
                  <path
                    d="M 195 141.5 L 905 141.5"
                    stroke="rgba(255,225,160,0.38)"
                    strokeWidth="1.4"
                  />
                  <line
                    x1="167"
                    y1="224"
                    x2="933"
                    y2="224"
                    stroke="#050505"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="167"
                    y1="225.5"
                    x2="933"
                    y2="225.5"
                    stroke="rgba(212,168,67,0.28)"
                    strokeWidth="0.9"
                  />

                  <path
                    d="M 166 205 C 166 185, 182 172, 205 172 L 290 172 C 310 172, 320 188, 320 212 L 320 584 C 320 606, 306 622, 286 622 L 204 622 C 180 622, 166 605, 166 584 Z"
                    fill="url(#vulcaniteLeather)"
                  />
                  <path
                    d="M 166 205 C 166 185, 182 172, 205 172 L 290 172 C 310 172, 320 188, 320 212 L 320 584 C 320 606, 306 622, 286 622 L 204 622 C 180 622, 166 605, 166 584 Z"
                    fill="url(#ergoGripShade)"
                    stroke="#222222"
                    strokeWidth="1.2"
                  />

                  <path
                    d="M 166 596 L 934 596 L 934 602 C 934 620, 918 632, 896 632 L 204 632 C 182 632, 166 620, 166 602 Z"
                    fill="url(#chromeTopDeck)"
                    stroke="#2A2A2A"
                    strokeWidth="1.2"
                  />

                  <circle
                    ref={tallyLightRef}
                    cx="358"
                    cy="184"
                    r="5.5"
                    fill="#E53935"
                    opacity="0.85"
                  />
                  <circle
                    cx="356"
                    cy="182"
                    r="2"
                    fill="rgba(255,255,255,0.6)"
                  />

                  <g>
                    <rect
                      x="764"
                      y="160"
                      width="122"
                      height="46"
                      rx="5"
                      fill="#050505"
                      stroke="#4A4236"
                      strokeWidth="2"
                    />
                    <rect
                      x="768"
                      y="164"
                      width="114"
                      height="38"
                      rx="3"
                      fill="url(#vfGlass)"
                    />
                    <rect
                      x="784"
                      y="171"
                      width="82"
                      height="24"
                      fill="none"
                      stroke="rgba(255,255,255,0.32)"
                      strokeWidth="0.9"
                    />
                    <rect
                      x="720"
                      y="170"
                      width="28"
                      height="26"
                      rx="3"
                      fill="#080808"
                      stroke="#333333"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="723"
                      y="173"
                      width="22"
                      height="20"
                      rx="2"
                      fill="url(#vfGlass)"
                    />
                  </g>

                  <circle
                    cx="788"
                    cy="495"
                    r="16"
                    fill="url(#dialCylinder)"
                    stroke="#3A3A3A"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx="788"
                    cy="495"
                    r="11"
                    fill="#181818"
                    stroke="#0A0A0A"
                    strokeWidth="1"
                  />
                  <circle
                    cx="854"
                    cy="285"
                    r="11"
                    fill="url(#dialCylinder)"
                    stroke="#333333"
                    strokeWidth="1.2"
                  />
                  <circle cx="854" cy="285" r="4" fill="#0A0A0A" />
                </g>

                {/* STATIONARY 85MM MASTER PRIME LENS BARREL */}
                <g transform="translate(250, 80)">
                  <circle
                    cx="300"
                    cy="300"
                    r="242"
                    fill="none"
                    stroke="#222222"
                    strokeWidth="12"
                  />
                  <circle
                    cx="300"
                    cy="300"
                    r="248"
                    fill="none"
                    stroke="url(#goldenRimHighlight)"
                    strokeWidth="2"
                  />

                  <g transform="translate(300, 300) scale(0.79) translate(-300, -300)">
                    <g ref={outerBarrelRef}>
                      <circle
                        cx="300"
                        cy="300"
                        r="288"
                        fill="none"
                        stroke="url(#metalHousing)"
                        strokeWidth="36"
                      />
                      {knurlRidges}
                      <circle
                        cx="300"
                        cy="300"
                        r="269"
                        fill="none"
                        stroke="url(#goldenRimHighlight)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="300"
                        cy="300"
                        r="250"
                        fill="none"
                        stroke="#111111"
                        strokeWidth="34"
                      />
                      {scaleTicks}

                      <circle
                        cx="300"
                        cy="34"
                        r="4.5"
                        fill="#E53935"
                        stroke="#5A1414"
                        strokeWidth="1"
                      />

                      <text
                        fill="#D4A843"
                        fontSize="10.5"
                        letterSpacing="4.5px"
                        fontFamily="monospace"
                        fontWeight="bold"
                        opacity="0.92"
                      >
                        <textPath
                          href="#lensTopEngraving"
                          startOffset="50%"
                          textAnchor="middle"
                        >
                          SHUTTERSCAPE MASTER PRIME · 85MM F/1.4 ASPH · Ø82MM
                        </textPath>
                      </text>

                      <text
                        fill="#9E9E9E"
                        fontSize="9.5"
                        letterSpacing="5px"
                        fontFamily="monospace"
                        opacity="0.78"
                      >
                        <textPath
                          href="#lensBottomEngraving"
                          startOffset="50%"
                          textAnchor="middle"
                        >
                          MADE IN GCU · 1.4   2   2.8   4   5.6   8   11   16
                        </textPath>
                      </text>
                    </g>

                    <g ref={innerRingRef}>
                      <circle
                        cx="300"
                        cy="300"
                        r="224"
                        fill="none"
                        stroke="url(#metalHousing)"
                        strokeWidth="18"
                      />
                      <circle
                        cx="300"
                        cy="300"
                        r="214"
                        fill="none"
                        stroke="url(#goldenRimHighlight)"
                        strokeWidth="1.6"
                      />
                      {Array.from({ length: 6 }).map((_, idx) => {
                        const a = idx * 60;
                        return (
                          <g key={idx} transform={`rotate(${a} 300 300)`}>
                            <circle
                              cx="300"
                              cy="224"
                              r="4"
                              fill="#2A2A2A"
                              stroke="#050505"
                              strokeWidth="1"
                            />
                            <line
                              x1="297.5"
                              y1="224"
                              x2="302.5"
                              y2="224"
                              stroke="#0A0A0A"
                              strokeWidth="1"
                            />
                          </g>
                        );
                      })}
                    </g>
                  </g>
                </g>
              </svg>
            )}
          </div>

          {/* ============================================================
              LAYER 2 (z-index: 20): THE PERSISTENT SHARED BACKGROUND PORTAL
              (Revealed through the aperture in Scene 1, FREEZES at Scene 1 end,
               and remains the exact same continuous background throughout Scene 2!)
              ============================================================ */}
          <div
            ref={clipMaskRef}
            id="shared-exhibition-bg-mask"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 20,
              overflow: "hidden",
              clipPath: "circle(105px at 50% 50%)",
              willChange: "clip-path",
            }}
          >
            <div
              ref={heroImageRef}
              id="shared-exhibition-bg-image"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                willChange: "transform, filter",
              }}
            >
              <Image
                src="/images/gcu-campus-anime.jpg"
                alt="Girijananda Chowdhury University Campus"
                fill
                priority
                sizes="100vw"
                className="object-cover w-full h-full"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 82%",
                  transform: "scale(1.06)",
                }}
              />

              <div
                ref={opticalFlareRef}
                id="shared-exhibition-optical-flare"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 50% 48%, rgba(212,168,67,0.42) 0%, rgba(212,168,67,0.1) 38%, transparent 70%)",
                  mixBlendMode: "screen",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at center, rgba(5,5,5,0.40) 0%, rgba(5,5,5,0.62) 65%, rgba(5,5,5,0.88) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* ============================================================
              LAYER 3 (z-index: 22): THE 8 MECHANICAL SHUTTER BLADES INSIDE THE LENS
              ============================================================ */}
          <div
            ref={shutterOverlayLayerRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <svg
              viewBox="0 0 1100 760"
              style={{
                width: isMobile ? "min(54vw, 26vh, 210px)" : "min(64vw, 70vh, 740px)",
                height: "auto",
                overflow: "visible",
              }}
            >
              <defs>
                <linearGradient
                  id="realShutterBlade"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="85%"
                >
                  <stop offset="0%" stopColor="#262626" />
                  <stop offset="25%" stopColor="#151515" />
                  <stop offset="75%" stopColor="#0B0B0B" />
                  <stop offset="100%" stopColor="#3B2E1E" />
                </linearGradient>

                <radialGradient id="opticalCoating" cx="38%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.18)" />
                  <stop offset="35%" stopColor="rgba(67, 168, 212, 0.09)" />
                  <stop offset="70%" stopColor="rgba(212, 168, 67, 0.12)" />
                  <stop offset="100%" stopColor="rgba(5, 5, 5, 0)" />
                </radialGradient>

                <clipPath id="innerLensClip">
                  <circle cx="300" cy="300" r="212" />
                </clipPath>
              </defs>

              <g transform="translate(250, 80)">
                <g transform="translate(300, 300) scale(0.79) translate(-300, -300)">
                  <g clipPath="url(#innerLensClip)">
                    {Array.from({ length: 8 }).map((_, i) => {
                      const angle = i * 45;
                      return (
                        <g key={i} transform={`rotate(${angle} 300 300)`}>
                          <g
                            ref={(el) => {
                              bladePolygonRefs.current[i] = el;
                            }}
                          >
                            <path
                              d="M 245 92 L 385 88 C 435 135, 455 215, 420 278 L 352 246 C 325 228, 285 224, 245 242 Z"
                              fill="url(#realShutterBlade)"
                              stroke="#2E2E2E"
                              strokeWidth="1.4"
                            />
                            <path
                              d="M 420 278 L 352 246 C 325 228, 285 224, 245 242"
                              fill="none"
                              stroke="#D4A843"
                              strokeWidth="1.3"
                              strokeOpacity="0.75"
                            />
                            <circle
                              cx="272"
                              cy="118"
                              r="4.5"
                              fill="#D4A843"
                              stroke="#050505"
                              strokeWidth="1.5"
                            />
                            <circle cx="272" cy="118" r="1.5" fill="#050505" />
                          </g>
                        </g>
                      );
                    })}
                  </g>

                  <circle
                    ref={glassGlareRef}
                    cx="300"
                    cy="300"
                    r="84"
                    fill="url(#opticalCoating)"
                  />
                  <circle
                    cx="300"
                    cy="300"
                    r="78"
                    fill="none"
                    stroke="#D4A843"
                    strokeWidth="2"
                    strokeOpacity="0.85"
                  />
                  <circle
                    cx="300"
                    cy="300"
                    r="86"
                    fill="none"
                    stroke="#D4A843"
                    strokeWidth="0.9"
                    strokeDasharray="5 5"
                    strokeOpacity="0.5"
                  />
                  <circle
                    cx="300"
                    cy="300"
                    r="16"
                    fill="none"
                    stroke="#D4A843"
                    strokeWidth="0.8"
                    strokeOpacity="0.65"
                  />
                  <line
                    x1="278"
                    y1="300"
                    x2="322"
                    y2="300"
                    stroke="#D4A843"
                    strokeWidth="0.9"
                    strokeOpacity="0.65"
                  />
                  <line
                    x1="300"
                    y1="278"
                    x2="300"
                    y2="322"
                    stroke="#D4A843"
                    strokeWidth="0.9"
                    strokeOpacity="0.65"
                  />
                </g>
              </g>
            </svg>
          </div>

          {/* ============================================================
              LAYER 3.5 (z-index: 24): XENON CAMERA FLASH BURST OVERLAY
              ============================================================ */}
          <div
            ref={flashBurstOverlayRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 24,
              pointerEvents: "none",
              opacity: 0,
              background:
                "radial-gradient(circle at 50% 24%, rgba(255,252,235,0.92) 0%, rgba(255,230,165,0.48) 28%, rgba(212,168,67,0.15) 58%, transparent 82%)",
              mixBlendMode: "screen",
              willChange: "transform, opacity",
            }}
          />

          {/* ============================================================
              LAYER 4 (z-index: 25): CAMERA VIEWFINDER HUD CORNERS & TELEMETRY
              ============================================================ */}
          <div
            ref={scene1HudRef}
            style={{
              position: "absolute",
              inset: isMobile
                ? "82px 10px 58px 10px"
                : "clamp(56px, 7.5vh, 68px) clamp(16px, 2.5vw, 32px) clamp(24px, 3vh, 32px) clamp(16px, 2.5vw, 32px)",
              zIndex: 25,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px" }}>
                <div
                  style={{
                    width: isMobile ? "14px" : "18px",
                    height: isMobile ? "14px" : "18px",
                    borderTop: "1.5px solid rgba(212, 168, 67, 0.75)",
                    borderLeft: "1.5px solid rgba(212, 168, 67, 0.75)",
                  }}
                />
                <div
                  className="font-mono"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "6px" : "8px",
                    fontSize: isMobile ? "8.5px" : "11px",
                    letterSpacing: "0.2em",
                    color: "#E8E8E8",
                  }}
                >
                  <span
                    style={{
                      width: isMobile ? "6px" : "7px",
                      height: isMobile ? "6px" : "7px",
                      borderRadius: "50%",
                      backgroundColor: "#E53935",
                      boxShadow: "0 0 10px #E53935",
                      display: "inline-block",
                    }}
                  />
                  <span>
                    {isMobile ? "XENOREC · RAW 14-BIT" : "XENOREC · RAW 14-BIT ·"}
                  </span>
                </div>
              </div>

              {!isMobile && (
                <div
                  className="font-mono"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.32em",
                    color: "#8A8A8A",
                    textTransform: "uppercase",
                  }}
                >
                  
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px" }}>
                <span
                  className="font-mono"
                  style={{
                    fontSize: isMobile ? "8.5px" : "11px",
                    letterSpacing: "0.18em",
                    color: "#D4A843",
                  }}
                >
                  @SHUTTERSCAPE_GCU
                </span>
                <div
                  style={{
                    width: isMobile ? "14px" : "18px",
                    height: isMobile ? "14px" : "18px",
                    borderTop: "1.5px solid rgba(212, 168, 67, 0.75)",
                    borderRight: "1.5px solid rgba(212, 168, 67, 0.75)",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "flex-end", gap: isMobile ? "8px" : "12px" }}
              >
                <div
                  style={{
                    width: isMobile ? "14px" : "18px",
                    height: isMobile ? "14px" : "18px",
                    borderBottom: "1.5px solid rgba(212, 168, 67, 0.75)",
                    borderLeft: "1.5px solid rgba(212, 168, 67, 0.75)",
                  }}
                />
                <div
                  className="font-mono"
                  style={{
                    display: "flex",
                    gap: isMobile ? "8px" : "18px",
                    fontSize: isMobile ? "8.5px" : "11px",
                    letterSpacing: "0.18em",
                    color: "#8A8A8A",
                  }}
                >
                  <span>
                    IRIS <strong style={{ color: "#D4A843" }}>{fStop}</strong>
                  </span>
                  <span>{shutterSpeed}</span>
                  <span>ISO 400</span>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "flex-end", gap: isMobile ? "8px" : "12px" }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: isMobile ? "8.5px" : "11px",
                    letterSpacing: "0.2em",
                    color: "#8A8A8A",
                  }}
                >
                  GCU · ASSAM
                </span>
                <div
                  style={{
                    width: isMobile ? "14px" : "18px",
                    height: isMobile ? "14px" : "18px",
                    borderBottom: "1.5px solid rgba(212, 168, 67, 0.75)",
                    borderRight: "1.5px solid rgba(212, 168, 67, 0.75)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ============================================================
              LAYER 5 (z-index: 30): CENTER EDITORIAL TYPOGRAPHY ("SHUTTERSCAPE")
              ============================================================ */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 16px",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <div
              ref={estBadgeRef}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  width: isMobile ? "18px" : "32px",
                  height: "1px",
                  backgroundColor: "#D4A843",
                  display: "inline-block",
                }}
              />
              <span
                className="font-mono"
                style={{
                  fontSize: isMobile ? "8.5px" : "11px",
                  letterSpacing: isMobile ? "0.18em" : "0.38em",
                  color: "#D4A843",
                  textTransform: "uppercase",
                  textShadow: "0 2px 14px rgba(0, 0, 0, 0.95)",
                }}
              >
                EST. 2023 · MORE THAN JUST A CAMERA CLUB
              </span>
              <span
                style={{
                  width: isMobile ? "18px" : "32px",
                  height: "1px",
                  backgroundColor: "#D4A843",
                  display: "inline-block",
                  boxShadow: "0 0 8px rgba(0, 0, 0, 0.9)",
                }}
              />
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: isMobile
                  ? "clamp(1.6rem, 7.5vw, 3.2rem)"
                  : "clamp(2.1rem, 8.2vw, 8.5rem)",
                fontWeight: 300,
                letterSpacing: "0.14em",
                color: "#FAFAFA",
                lineHeight: 1,
                perspective: "900px",
                textShadow: "0 14px 45px rgba(0, 0, 0, 0.98), 0 2px 14px rgba(0, 0, 0, 0.95)",
              }}
            >
              {titleChars.map((char, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    titleCharsRef.current[i] = el;
                  }}
                  style={{
                    display: "inline-block",
                    willChange: "transform, opacity, filter",
                  }}
                >
                  {char}
                </span>
              ))}
            </h1>

            <p
              ref={subtitleRef}
              className="font-heading"
              style={{
                marginTop: "20px",
                fontSize: "clamp(0.72rem, 1.4vw, 1.1rem)",
                fontWeight: 500,
                color: "#E8E8E8",
                textTransform: "uppercase",
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.95), 0 1px 8px rgba(0, 0, 0, 0.85)",
                willChange: "filter, opacity, letter-spacing",
              }}
            >
              GCU Photography Club
            </p>

            <p
              ref={taglineRef}
              className="font-display"
              style={{
                marginTop: "10px",
                fontSize: "clamp(0.95rem, 1.6vw, 1.35rem)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "#D4A843",
                letterSpacing: "0.06em",
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.95), 0 1px 8px rgba(0, 0, 0, 0.85)",
              }}
            >
              “Observe, capture, and tell stories through light.”
            </p>

            {/* Pulsing Scroll Indicator */}
            <div
              ref={scrollHintRef}
              style={{
                position: "absolute",
                bottom: isMobile ? "42px" : "28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: isMobile ? "8px" : "10px",
                  letterSpacing: isMobile ? "0.14em" : "0.28em",
                  color: "#D4A843",
                  textTransform: "uppercase",
                }}
              >
                ↓ Scroll to Open Shutter & Enter Lens
              </span>
              <svg
                width="22"
                height="34"
                viewBox="0 0 22 34"
                style={{ color: "#D4A843" }}
              >
                <rect
                  x="1.5"
                  y="1.5"
                  width="19"
                  height="31"
                  rx="9.5"
                  fill="rgba(212, 168, 67, 0.08)"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <circle cx="11" cy="10" r="2.5" fill="currentColor">
                  <animate
                    attributeName="cy"
                    values="9;21;9"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}