// src/components/cinematic/PullInScene.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 8 Master Exhibition Frames
const EXHIBITION_PAIRINGS = [
  {
    id: "01A",
    code: "EXHIBIT // 01A",
    title: "STREET & SHADOWS",
    subTitle: "Guwahati Dusk",
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=85",
    exif: "f/2.8 · 1/500s · 35mm · ISO 400",
    lane: "left-top",
    textPosition: "right-center",
    focusDistance: "35MM // 1.2M",
    headline: "Capturing raw light.",
    subhead: "Spontaneous moments frozen in urban twilight.",
  },
  {
    id: "02B",
    code: "EXHIBIT // 02B",
    title: "BEHIND THE LENS",
    subTitle: "Human Portrait",
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=85",
    exif: "f/1.4 · 1/1000s · 85mm · ISO 160",
    lane: "right-center",
    textPosition: "left-center",
    focusDistance: "85MM // 2.4M",
    headline: "Telling silent stories.",
    subhead: "The human gaze captured through vintage prime glass.",
  },
  {
    id: "03C",
    code: "EXHIBIT // 03C",
    title: "BRAHMAPUTRA MIST",
    subTitle: "Exhibition Landscape",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=85",
    exif: "f/4.0 · 1/250s · 24mm · ISO 100",
    lane: "left-bottom",
    textPosition: "right-top",
    focusDistance: "24MM // 3.8M",
    headline: "Chasing golden hours.",
    subhead: "Ethereal atmospheric depth along the river banks.",
  },
  {
    id: "04D",
    code: "EXHIBIT // 04D",
    title: "SILENT PEAKS",
    subTitle: "High Altitude",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=85",
    exif: "f/2.0 · 1/2000s · 50mm · ISO 200",
    lane: "right-top",
    textPosition: "left-bottom",
    focusDistance: "50MM // 5.0M",
    headline: "Framing distant horizons.",
    subhead: "Solitude and scale amidst mountain silence.",
  },
  {
    id: "05E",
    code: "EXHIBIT // 05E",
    title: "NEON DRIFT",
    subTitle: "Night Photography",
    src: "https://images.unsplash.com/photo-1554223090-7e482851df45?w=800&q=85",
    exif: "f/1.8 · 1/60s · 50mm · ISO 800",
    lane: "left-center",
    textPosition: "right-bottom",
    focusDistance: "50MM // 2.2M",
    headline: "Painted in shadows.",
    subhead: "Vibrant nocturnal contrast after midnight.",
  },
  {
    id: "06F",
    code: "EXHIBIT // 06F",
    title: "STUDIO SILHOUETTE",
    subTitle: "Chiaroscuro Study",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=85",
    exif: "f/5.6 · 1/200s · 105mm · ISO 100",
    lane: "right-bottom",
    textPosition: "left-top",
    focusDistance: "105MM // 4.5M",
    headline: "Sculpting with dark.",
    subhead: "Precision studio lighting shaping form and contour.",
  },
  {
    id: "07G",
    code: "EXHIBIT // 07G",
    title: "ABSTRACT MOTION",
    subTitle: "Long Exposure",
    src: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=85",
    exif: "f/8.0 · 4s · 14mm · ISO 100",
    lane: "left-top",
    textPosition: "right-center",
    focusDistance: "14MM // 24.0M",
    headline: "Painting with time.",
    subhead: "Fluid dynamics captured in a single extended frame.",
  },
  {
    id: "08H",
    code: "EXHIBIT // 08H",
    title: "THE FINAL APERTURE",
    subTitle: "Master Gallery Showcase",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85",
    exif: "f/1.4 · 1/4000s · 85mm · ISO 100",
    lane: "center-stage",
    textPosition: "center-bottom",
    focusDistance: "85MM // ∞ INF",
    headline: "Welcome to the Exhibition.",
    subhead: "Explore the full archival collection from GCU Photography Club.",
  },
];

function getCardLaneStyle(lane: string, isMobile: boolean): React.CSSProperties {
  if (isMobile) {
    if (lane === "center-stage") return { left: "50%", top: "33%", transform: "translate(-50%, -50%)" };
    return { left: "50%", top: "34%", transform: "translate(-50%, -50%)" };
  }
  switch (lane) {
    case "left-top": return { left: "24%", top: "42%", transform: "translate(-50%, -50%)" };
    case "left-center": return { left: "23%", top: "50%", transform: "translate(-50%, -50%)" };
    case "left-bottom": return { left: "25%", top: "58%", transform: "translate(-50%, -50%)" };
    case "right-top": return { left: "76%", top: "42%", transform: "translate(-50%, -50%)" };
    case "right-center": return { left: "77%", top: "50%", transform: "translate(-50%, -50%)" };
    case "right-bottom": return { left: "75%", top: "58%", transform: "translate(-50%, -50%)" };
    case "center-stage": default: return { left: "50%", top: "41%", transform: "translate(-50%, -50%)" };
  }
}

function getTextPositionStyle(pos: string, isMobile: boolean): React.CSSProperties {
  if (isMobile) {
    return { left: "50%", bottom: "11%", transform: "translateX(-50%)", textAlign: "center", width: "90vw" };
  }
  switch (pos) {
    case "right-center": return { right: "7%", top: "50%", transform: "translateY(-50%)", textAlign: "right" };
    case "right-top": return { right: "7%", top: "38%", transform: "translateY(-50%)", textAlign: "right" };
    case "right-bottom": return { right: "7%", top: "60%", transform: "translateY(-50%)", textAlign: "right" };
    case "left-center": return { left: "7%", top: "50%", transform: "translateY(-50%)", textAlign: "left" };
    case "left-top": return { left: "7%", top: "38%", transform: "translateY(-50%)", textAlign: "left" };
    case "left-bottom": return { left: "7%", top: "60%", transform: "translateY(-50%)", textAlign: "left" };
    case "center-bottom": default: 
      // Brought the final text block up by 10%
      return { left: "50%", bottom: "18%", transform: "translateX(-50%)", textAlign: "center" };
  }
}

export default function PullInScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const darknessOverlayRef = useRef<HTMLDivElement>(null);
  const sunsetOverlayRef = useRef<HTMLDivElement>(null);
  const eveningOverlayRef = useRef<HTMLDivElement>(null);
  const tunnelEnvironmentRef = useRef<HTMLDivElement>(null);
  const hudBarRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const zAxisReadoutRef = useRef<HTMLSpanElement>(null);
  const lastFrameIdxRef = useRef<number>(0);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finalCtaRef = useRef<HTMLDivElement>(null);
  const bgImageWrapperRef = useRef<HTMLDivElement>(null);

  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [focusDistanceText, setFocusDistanceText] = useState("35MM // 1.2M");
  const [zAxisMM, setZAxisMM] = useState("-600MM");
  const [isMobile, setIsMobile] = useState(false);
  const [exhibits, setExhibits] = useState(EXHIBITION_PAIRINGS);

  useEffect(() => {
    fetch("/api/pullin-exhibits")
      .then((r) => r.json())
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setExhibits((prev) =>
            prev.map((orig, idx) => {
              const matched =
                res.data[idx] ||
                res.data.find((d: any) => d.code === orig.code);
              if (!matched) return orig;
              return {
                ...orig,
                title: matched.title || orig.title,
                subTitle: matched.subTitle || orig.subTitle,
                src: matched.src || orig.src,
                exif: matched.exif || orig.exif,
                focusDistance: matched.focusDistance || orig.focusDistance,
                headline: matched.headline || orig.headline,
                subhead: matched.subhead || orig.subhead,
              };
            })
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024 || !stageRef.current) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      
      gsap.to(stageRef.current, { rotationY: nx * 4.2, rotationX: -ny * 4.2, duration: 0.85, ease: "power2.out", overwrite: "auto" });
      
      if (tunnelEnvironmentRef.current) {
        gsap.to(tunnelEnvironmentRef.current, { rotationY: nx * 2.5, rotationX: -ny * 2.5, x: -nx * 14, y: -ny * 10, duration: 1.0, ease: "power2.out", overwrite: "auto" });
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const totalPairs = EXHIBITION_PAIRINGS.length;
      const sharedTrack = document.getElementById("exhibition-scroll-track");

      gsap.set(container, { autoAlpha: sharedTrack ? 0 : 1 });
      gsap.set(hudBarRef.current, { opacity: 0 });
      gsap.set(darknessOverlayRef.current, { opacity: 0 }); 
      gsap.set(sunsetOverlayRef.current, { opacity: 0 });
      gsap.set(eveningOverlayRef.current, { opacity: 0 });
      if (finalCtaRef.current) gsap.set(finalCtaRef.current, { opacity: 0, y: 24 });
      if (bgImageWrapperRef.current) gsap.set(bgImageWrapperRef.current, { scale: 1.05 });

      // Reset Card States
      cardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        const sideTilt = idx % 2 === 0 ? -9 : 9;
        gsap.set(cardEl, {
          z: -1350,
          scale: 0.72,
          rotationY: idx === totalPairs - 1 ? 0 : sideTilt,
          opacity: 0,
        });
      });

      textRefs.current.forEach((textEl) => {
        if (!textEl) return;
        gsap.set(textEl, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", y: 32, opacity: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sharedTrack || container,
          pin: sharedTrack ? false : true,
          start: () => sharedTrack ? `top+=${window.innerHeight * 2.4} top` : "top top",
          end: () => `+=${window.innerHeight * 11.2}`,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const currentIdx = Math.min(totalPairs - 1, Math.floor(p * totalPairs));

            if (currentIdx !== lastFrameIdxRef.current) {
              lastFrameIdxRef.current = currentIdx;
              setActiveFrameIndex(currentIdx);
              setFocusDistanceText(EXHIBITION_PAIRINGS[currentIdx].focusDistance);
            }

            const zDistance = Math.round(-600 + p * 750);
            const formattedZ = zDistance >= 0 ? `+${zDistance}MM` : `${zDistance}MM`;

            if (zAxisReadoutRef.current) zAxisReadoutRef.current.textContent = formattedZ;
            else setZAxisMM(formattedZ);
          },
        },
      });

      tl.to(container, { autoAlpha: 1, duration: 0.02, ease: "none" }, 0);
      tl.to(hudBarRef.current, { opacity: 1, duration: 0.06, ease: "power2.out" }, 0.01);
      
      // ==============================================================================
      // TUNNEL PARALLAX BACKGROUND (DYNAMIC TUNNEL ZOOM-IN EFFECT)
      // ==============================================================================
      if (bgImageWrapperRef.current) {
        tl.fromTo(
          bgImageWrapperRef.current,
          { scale: 1.05 },
          { scale: 1.35, duration: 1, ease: "power1.inOut" },
          0
        );
      }
      const sharedBg = document.getElementById("shared-exhibition-bg-image");
      if (sharedBg) {
        tl.fromTo(
          sharedBg,
          { scale: 1.05 },
          { scale: 1.35, duration: 1, ease: "power1.inOut" },
          0
        );
      }

      if (tunnelEnvironmentRef.current) {
        tl.fromTo(
          tunnelEnvironmentRef.current,
          { scale: 0.9, opacity: 0.5 },
          { scale: 1.4, opacity: 1, duration: 1, ease: "power1.inOut" },
          0
        );
      }

      // ==============================================================================
      // BACKGROUND REMAINS CRISP, BRIGHT, AND VIBRANT THROUGHOUT
      // ==============================================================================
      tl.to(darknessOverlayRef.current, { opacity: 0, duration: 1, ease: "none" }, 0);
      tl.to(sunsetOverlayRef.current, { opacity: 0, duration: 1, ease: "none" }, 0);
      tl.to(eveningOverlayRef.current, { opacity: 0, duration: 1, ease: "none" }, 0);

      // ==============================================================================
      // 8-FRAME FLY-THROUGH CHOREOGRAPHY
      // ==============================================================================
      const step = 0.88 / totalPairs;

      EXHIBITION_PAIRINGS.forEach((_, idx) => {
        const cardEl = cardRefs.current[idx];
        const textEl = textRefs.current[idx];
        const isLast = idx === totalPairs - 1;
        const startT = 0.03 + idx * step;
        const focusT = startT + step * 0.48;
        const exitT = startT + step * 1.05;

        if (cardEl) {
          tl.to(cardEl, {
              z: 0, scale: 1, rotationY: 0, opacity: 1, duration: step * 0.48, ease: "power2.out",
          }, startT);

          if (!isLast) {
            tl.to(cardEl, {
                z: 340, scale: 1.16, opacity: 0, duration: step * 0.55, ease: "power2.in",
            }, focusT + step * 0.14);
          } else {
            tl.to(cardEl, { z: 45, scale: 1.04, duration: step * 0.55, ease: "power1.out" }, focusT);
          }
        }

        if (textEl) {
          tl.to(textEl, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", y: 0, opacity: 1, duration: step * 0.38, ease: "power3.out",
          }, startT + step * 0.12);

          if (!isLast) {
            tl.to(textEl, { y: -28, opacity: 0, duration: step * 0.35, ease: "power2.in" }, exitT - step * 0.15);
          }
        }
      });

      if (finalCtaRef.current) {
        tl.to(finalCtaRef.current, { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" }, 0.88);
      }

      tl.to([stageRef.current, hudBarRef.current], {
          opacity: 0, y: -24, duration: 0.05, ease: "power2.in",
      }, 0.95);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "transparent",
        overflow: "hidden",
        userSelect: "none",
        perspective: "1200px",
      }}
    >
      {/* SCENE 2 FULLSCREEN CAMPUS BACKGROUND WITH TUNNEL ZOOM EFFECT */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden", pointerEvents: "none" }}>
        <div
          ref={bgImageWrapperRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            willChange: "transform",
          }}
        >
          <Image
            src="/images/gcu-campus-anime.jpg"
            alt="Campus Background"
            fill
            priority
            sizes="100vw"
            className="object-cover w-full h-full"
            style={{
              objectFit: "cover",
              objectPosition: "center 82%",
              transform: "scale(1.06)",
              filter: "brightness(0.48) blur(3.2px) contrast(1.06)",
            }}
          />
        </div>
        {/* Soft, restrained contrast scrim for maximum typography readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(3,3,3,0.36) 0%, rgba(3,3,3,0.58) 75%, rgba(3,3,3,0.82) 100%)",
          }}
        />
      </div>

      {/* ATMOSPHERIC EV OVERLAYS */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, willChange: "opacity" }}>
        <div ref={darknessOverlayRef} style={{ position: "absolute", inset: 0, backgroundColor: "#020202", opacity: 0, pointerEvents: "none" }} />
        <div ref={sunsetOverlayRef} style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 45%, rgba(212,168,67,0.35) 0%, rgba(120,65,20,0.2) 50%, transparent 80%)", mixBlendMode: "screen", opacity: 0, pointerEvents: "none" }} />
        <div ref={eveningOverlayRef} style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(18,28,48,0.55) 0%, rgba(5,5,8,0.95) 80%)", opacity: 0, pointerEvents: "none" }} />
      </div>

      {/* CLEAN TUNNEL ENVIRONMENT (SQUARE RINGS REMOVED) */}
      <div ref={tunnelEnvironmentRef} style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", transformStyle: "preserve-3d", pointerEvents: "none" }}>
        {/* Center Focal Plane Reticle kept for camera HUD theme */}
        <div style={{ position: "relative", width: "56px", height: "56px", borderRadius: "50%", border: "1px dashed rgba(212, 168, 67, 0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ width: "14px", height: "1px", backgroundColor: "rgba(212, 168, 67, 0.7)", position: "absolute" }} />
          <span style={{ width: "1px", height: "14px", backgroundColor: "rgba(212, 168, 67, 0.7)", position: "absolute" }} />
        </div>
      </div>

      {/* 3D CARDS & TYPOGRAPHY STAGE */}
      <div ref={stageRef} style={{ position: "absolute", inset: 0, zIndex: 20, transformStyle: "preserve-3d", pointerEvents: "none", willChange: "transform" }}>
        {exhibits.map((item, idx) => {
          const laneStyle = getCardLaneStyle(item.lane, isMobile);
          return (
            <div key={item.id} ref={(el) => { cardRefs.current[idx] = el; }} style={{ 
                position: "absolute", 
                ...laneStyle, 
                // SIGNIFICANTLY INCREASED CARD SIZES
                width: isMobile ? "min(88vw, 340px)" : item.lane === "center-stage" ? "clamp(400px, 38vw, 560px)" : "clamp(340px, 30vw, 460px)", 
                backgroundColor: "rgba(12, 12, 14, 0.92)", 
                border: "1px solid rgba(212, 168, 67, 0.38)", 
                borderRadius: "14px", 
                padding: "12px 14px 14px 14px", 
                boxShadow: "0 30px 75px rgba(0, 0, 0, 0.95), 0 0 28px rgba(212, 168, 67, 0.12)", 
                backdropFilter: "blur(12px)", 
                transformStyle: "preserve-3d", 
                willChange: "transform, opacity" 
            }}>
              <div className="font-mono" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "9px", paddingBottom: "7px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "9px", letterSpacing: "0.22em", color: "#D4A843" }}>
                <span>▸ {item.code}</span>
                <div style={{ display: "flex", gap: "5px" }}>
                  {[0, 1, 2, 3, 4].map((hole) => (
                    <span key={hole} style={{ width: "8px", height: "5px", borderRadius: "1.5px", backgroundColor: "#050505", border: "0.6px solid rgba(212, 168, 67, 0.45)" }} />
                  ))}
                </div>
                <span style={{ color: "#8A8A8A" }}>{item.subTitle}</span>
              </div>
              
              <div style={{ 
                  position: "relative", 
                  width: "100%", 
                  // SCALED UP IMAGE HEIGHTS TO MATCH NEW WIDTHS
                  height: isMobile ? "180px" : item.lane === "center-stage" ? "320px" : "280px", 
                  borderRadius: "10px", 
                  overflow: "hidden", 
                  border: "1px solid rgba(255, 255, 255, 0.1)" 
              }}>
                <Image src={item.src} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 600px" style={{ objectFit: "cover", filter: "contrast(1.06) brightness(0.95)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.82) 0%, transparent 55%)" }} />
                <div className="font-display" style={{ position: "absolute", bottom: "10px", left: "12px", fontSize: "17px", letterSpacing: "0.14em", color: "#FAFAFA" }}>
                  {item.title}
                </div>
              </div>
              <div className="font-mono" style={{ marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "9.5px", letterSpacing: "0.14em", color: "#8A8A8A" }}>
                <span>{item.exif}</span>
                <span style={{ color: "#D4A843", backgroundColor: "rgba(212, 168, 67, 0.12)", border: "1px solid rgba(212, 168, 67, 0.3)", padding: "2px 7px", borderRadius: "4px", fontSize: "8px" }}>RAW</span>
              </div>
            </div>
          );
        })}

        {exhibits.map((item, idx) => {
          const textStyle = getTextPositionStyle(item.textPosition, isMobile);
          const isLast = idx === exhibits.length - 1;

          return (
            <div key={`text-${item.id}`} ref={(el) => { textRefs.current[idx] = el; }} style={{ position: "absolute", ...textStyle, maxWidth: isMobile ? "90vw" : "420px", zIndex: 30, pointerEvents: isLast ? "auto" : "none", willChange: "transform, opacity, clip-path" }}>
              <div className="font-mono" style={{ display: "inline-block", fontSize: "10px", letterSpacing: "0.28em", color: "#D4A843", backgroundColor: "rgba(212, 168, 67, 0.1)", border: "1px solid rgba(212, 168, 67, 0.32)", padding: "4px 12px", borderRadius: "999px", marginBottom: "14px" }}>
                {item.code} · {item.focusDistance}
              </div>
              <h2 className="font-display" style={{ fontSize: isMobile ? "clamp(1.4rem, 5.2vw, 2rem)" : "clamp(2.4rem, 3.8vw, 3.8rem)", fontWeight: 300, color: "#FAFAFA", lineHeight: 1.12, letterSpacing: "0.04em", textShadow: "0 12px 35px rgba(0, 0, 0, 0.85)" }}>
                {item.headline}
              </h2>
              <p className="font-body" style={{ marginTop: "12px", fontSize: isMobile ? "12px" : "15px", fontWeight: 300, color: "#E8E8E8", lineHeight: 1.6, opacity: 0.85 }}>
                {item.subhead}
              </p>
              {isLast && (
                <div ref={finalCtaRef} style={{ marginTop: "22px", display: "inline-block" }}>
                  <Link
                    href="/gallery"
                    className="group font-mono relative inline-flex items-center gap-3 min-h-[44px] py-2 px-1 text-[#D4A843] hover:text-white text-[11px] sm:text-[12.5px] tracking-[0.3em] uppercase font-bold transition-colors duration-300 cursor-pointer touch-manipulation bg-transparent border-0 shadow-none rounded-none focus-visible:outline-2 focus-visible:outline-[#D4A843] focus-visible:outline-offset-4"
                    title="Explore Full Gallery"
                    aria-label="Explore Full Gallery"
                  >
                    <span className="transition-colors duration-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                      Explore Full Gallery
                    </span>
                    <span className="text-base sm:text-lg font-light transition-transform duration-300 group-hover:translate-x-1.5 text-[#D4A843] group-hover:text-white">
                      →
                    </span>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* HUD BAR */}
      <div ref={hudBarRef} style={{ position: "absolute", inset: isMobile ? "68px 14px 64px 14px" : "clamp(16px, 2.5vw, 32px)", zIndex: 35, display: "flex", flexDirection: "column", justifyContent: "space-between", pointerEvents: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "20px", height: "20px", borderTop: "1.5px solid rgba(212, 168, 67, 0.75)", borderLeft: "1.5px solid rgba(212, 168, 67, 0.75)" }} />
            <span className="font-mono" style={{ fontSize: isMobile ? "9px" : "10.5px", letterSpacing: "0.26em", color: "#D4A843" }}>[ SCENE 02 // THE PULL-IN ]</span>
          </div>
          <div className="font-mono" style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: isMobile ? "9px" : "10.5px", letterSpacing: "0.22em", color: "#E8E8E8" }}>
            <span>FOCUS: <strong style={{ color: "#D4A843" }}>{focusDistanceText}</strong></span>
            {!isMobile && <span>Z-AXIS: <strong ref={zAxisReadoutRef} style={{ color: "#FAFAFA" }}>{zAxisMM}</strong></span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="font-mono" style={{ fontSize: isMobile ? "9px" : "11px", letterSpacing: "0.22em", color: "#FAFAFA" }}>
              {String(activeFrameIndex + 1).padStart(2, "0")} / {String(exhibits.length).padStart(2, "0")}
            </span>
            <div style={{ width: "20px", height: "20px", borderTop: "1.5px solid rgba(212, 168, 67, 0.75)", borderRight: "1.5px solid rgba(212, 168, 67, 0.75)" }} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
            <div style={{ width: "20px", height: "20px", borderBottom: "1.5px solid rgba(212, 168, 67, 0.75)", borderLeft: "1.5px solid rgba(212, 168, 67, 0.75)" }} />
            <span className="font-mono" style={{ fontSize: isMobile ? "8.5px" : "10px", letterSpacing: "0.22em", color: "#8A8A8A" }}>
              {isMobile ? "RACK FOCUS" : "3D PERSPECTIVE CORRIDOR · RACK FOCUS ACTIVE"}
            </span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "6px", paddingBottom: "4px" }}>
            {exhibits.map((item, idx) => {
              const isCurrent = idx === activeFrameIndex;
              const isPassed = idx < activeFrameIndex;
              return (
                <span key={item.id} style={{ width: isCurrent ? "22px" : "8px", height: "3px", borderRadius: "2px", backgroundColor: isCurrent ? "#D4A843" : isPassed ? "rgba(212, 168, 67, 0.45)" : "rgba(255, 255, 255, 0.16)", transition: "all 0.25s ease" }} />
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
            <span className="font-mono" style={{ fontSize: isMobile ? "8.5px" : "10px", letterSpacing: "0.22em", color: "#D4A843" }}>↓ SCROLL TO PULL FOCUS</span>
            <div style={{ width: "20px", height: "20px", borderBottom: "1.5px solid rgba(212, 168, 67, 0.75)", borderRight: "1.5px solid rgba(212, 168, 67, 0.75)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}