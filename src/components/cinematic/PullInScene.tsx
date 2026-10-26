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
    title: "Mist and Midows",
    subTitle: "FOGGY",
    src: "/api/media/6ade5727c27b25f89317a56e",
    exif: "weather",
    lane: "left-top",
    textPosition: "right-center",
    focusDistance: "35MM // 1.2M",
    headline: "CAPTURING FOGGY WEATHER",
    subhead: "Spontaneous moments frozen in urban twilight.",
  },
  {
    id: "02B",
    code: "EXHIBIT // 02B",
    title: "passion through the lens",
    subTitle: "Human Portrait",
    src: "/api/media/6ade5fc397369901d08048bd",
    exif: "By Imran Farhat",
    lane: "right-center",
    textPosition: "left-center",
    focusDistance: "85MM // 2.4M",
    headline: "AWARDED BEST ALUMNI  PHOTOGRAPHY",
    subhead: "The human gaze captured through vintage prime glass.",
  },
  {
    id: "03C",
    code: "EXHIBIT // 03C",
    title: "4th Foundation Day",
    subTitle: "Exhibition Landscape",
    src: "/api/media/6ade60493c562bf90f9b2a6c",
    exif: "by Aryan Deep Singh",
    lane: "left-bottom",
    textPosition: "right-top",
    focusDistance: "24MM // 3.8M",
    headline: "CREATIVITY, ARTISTIC VISION",
    subhead: "Ethereal atmospheric depth along the river banks.",
  },
  {
    id: "04D",
    code: "EXHIBIT // 04D",
    title: "SILENT PEAKS",
    subTitle: "High Altitude",
    src: "/api/media/6ade60e5d43cca4cd02daa0f",
    exif: "f/2.0 · 1/2000s · 50mm · ISO 200",
    lane: "right-top",
    textPosition: "left-bottom",
    focusDistance: "50MM // 5.0M",
    headline: "REACHING THE HEIGHTS",
    subhead: "Towering silhouettes piercing morning cloud cover.",
  },
  {
    id: "05E",
    code: "EXHIBIT // 05E",
    title: "World Photography",
    subTitle: "window Monochrome",
    src: "/api/media/6ade61178ff4fc64ac7615e4",
    exif: "by Tapas Sarma",
    lane: "left-center",
    textPosition: "right-bottom",
    focusDistance: "50MM // 2.2M",
    headline: "OBSERVING DARK",
    subhead: "High-contrast shadows cutting across crowded transit hubs.",
  },
  {
    id: "06F",
    code: "EXHIBIT // 06F",
    title: "ALPINE DAWN",
    subTitle: "Fine Art Landscape",
    src: "/api/media/6ade61c88ff4fc64ac7615e5",
    exif: "by Alankrita Ghosh ",
    lane: "right-bottom",
    textPosition: "left-top",
    focusDistance: "70MM // ∞",
    headline: "WAITING FOR THE FIRST WARMTH, PHOTO OF THE WEEK",
    subhead: "The razor line between pitch darkness and violet dawn.",
  },
  {
    id: "07G",
    code: "EXHIBIT // 07G",
    title: "RACK FOCUS CLINIC",
    subTitle: "sunny glimpse",
    src: "/api/media/6ade621f3c562bf90f9b2a6d",
    exif: "BY chinmoy kalita",
    lane: "left-top",
    textPosition: "right-center",
    focusDistance: "85MM // 1.5M",
    headline: "PHOTO OF THE WEEK ",
    subhead: "Deliberate shallow depth turning urban clutter into velvet bokeh.",
  },
  {
    id: "08H",
    code: "EXHIBIT // 08H",
    title: "MONOCHROME Peace",
    subTitle: "Archive Retrospective",
    src: "/api/media/6ade6265d43cca4cd02daa10",
    exif: "peace among the whispering trees",
    lane: "center-stage",
    textPosition: "center-bottom",
    focusDistance: "20MM // 0.8M",
    headline: "LIVING HERITAGE",
    subhead: "Archival silver gelatin prints documenting Assam's river lifeline.",
  },
];

function getCardLaneStyle(lane: string, isMobile: boolean): React.CSSProperties {
  if (isMobile) {
    return { left: "50%", top: "26%", transform: "translate(-50%, -50%)" };
  }
  switch (lane) {
    case "left-top": return { left: "24%", top: "42%", transform: "translate(-50%, -50%)" };
    case "left-center": return { left: "23%", top: "50%", transform: "translate(-50%, -50%)" };
    case "left-bottom": return { left: "25%", top: "58%", transform: "translate(-50%, -50%)" };
    case "right-top": return { left: "76%", top: "42%", transform: "translate(-50%, -50%)" };
    case "right-center": return { left: "77%", top: "50%", transform: "translate(-50%, -50%)" };
    case "right-bottom": return { left: "75%", top: "58%", transform: "translate(-50%, -50%)" };
    case "center-stage": default: 
      return { 
        left: "50%", 
        top: "39%", 
        transform: "translate(-50%, -50%)" 
      };
  }
}

function getTextPositionStyle(pos: string, isMobile: boolean): React.CSSProperties {
  if (isMobile) {
    return { 
      left: "50%", 
      top: "calc(26% + 115px)", 
      transform: "translateX(-50%)", 
      textAlign: "center", 
      width: "88vw" 
    };
  }
  switch (pos) {
    case "right-center": return { right: "7%", top: "50%", transform: "translateY(-50%)", textAlign: "right" };
    case "right-top": return { right: "7%", top: "38%", transform: "translateY(-50%)", textAlign: "right" };
    case "right-bottom": return { right: "7%", top: "60%", transform: "translateY(-50%)", textAlign: "right" };
    case "left-center": return { left: "7%", top: "50%", transform: "translateY(-50%)", textAlign: "left" };
    case "left-top": return { left: "7%", top: "38%", transform: "translateY(-50%)", textAlign: "left" };
    case "left-bottom": return { left: "7%", top: "60%", transform: "translateY(-50%)", textAlign: "left" };
    case "center-bottom": default: 
      return { 
        left: "50%", 
        top: "calc(39% + 155px)", 
        transform: "translateX(-50%)", 
        textAlign: "center" 
      };
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
                src:
                  matched.src && !matched.src.startsWith("blob:")
                    ? matched.src
                    : orig.src,
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
    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;

    const updateTilt = () => {
      rafId = null;
      if (stageRef.current) {
        gsap.to(stageRef.current, {
          rotationY: targetX * 4.2,
          rotationX: -targetY * 4.2,
          duration: 0.85,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (tunnelEnvironmentRef.current) {
        gsap.to(tunnelEnvironmentRef.current, {
          rotationY: targetX * 2.5,
          rotationX: -targetY * 2.5,
          x: -targetX * 14,
          y: -targetY * 10,
          duration: 1.0,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024 || !stageRef.current) return;
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!rafId) {
        rafId = requestAnimationFrame(updateTilt);
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
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

      {/* CLEAN TUNNEL ENVIRONMENT */}
      <div ref={tunnelEnvironmentRef} style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }} />

      {/* 3D CARDS & TYPOGRAPHY STAGE */}
      <div ref={stageRef} style={{ position: "absolute", inset: 0, zIndex: 20, transformStyle: "preserve-3d", pointerEvents: "none", willChange: "transform" }}>
        {exhibits.map((item, idx) => {
          const laneStyle = getCardLaneStyle(item.lane, isMobile);
          return (
            <div key={item.id} ref={(el) => { cardRefs.current[idx] = el; }} style={{ 
                position: "absolute", 
                ...laneStyle, 
                // BALANCED CARD SIZES (Prevents overlap with stage text)
                width: isMobile ? "min(82vw, 290px)" : item.lane === "center-stage" ? "clamp(320px, 30vw, 420px)" : "clamp(290px, 25vw, 380px)", 
                backgroundColor: "rgba(12, 12, 14, 0.92)", 
                border: "1px solid rgba(212, 168, 67, 0.38)", 
                borderRadius: "14px", 
                padding: isMobile ? "10px 12px 12px 12px" : "12px 14px 14px 14px", 
                boxShadow: "0 30px 75px rgba(0, 0, 0, 0.95), 0 0 28px rgba(212, 168, 67, 0.12)", 
                backdropFilter: "blur(12px)", 
                transformStyle: "preserve-3d", 
                willChange: "transform, opacity" 
            }}>
              <div className="font-mono" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isMobile ? "6px" : "9px", paddingBottom: isMobile ? "5px" : "7px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", fontSize: isMobile ? "8px" : "9px", letterSpacing: "0.22em", color: "#D4A843" }}>
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
                  height: isMobile ? "120px" : item.lane === "center-stage" ? "185px" : "180px", 
                  borderRadius: "10px", 
                  overflow: "hidden", 
                  border: "1px solid rgba(255, 255, 255, 0.1)" 
              }}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  priority={true}
                  unoptimized={item.src.startsWith("/api/media/")}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    const fallback = EXHIBITION_PAIRINGS[idx]?.src || EXHIBITION_PAIRINGS[0].src;
                    if (target.src !== fallback) target.src = fallback;
                  }}
                  sizes="(max-width: 1024px) 100vw, 600px"
                  style={{ objectFit: "cover", filter: "contrast(1.06) brightness(0.95)" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.82) 0%, transparent 55%)" }} />
                <div className="font-display" style={{ position: "absolute", bottom: isMobile ? "6px" : "10px", left: isMobile ? "8px" : "12px", fontSize: isMobile ? "14px" : "17px", letterSpacing: "0.14em", color: "#FAFAFA" }}>
                  {item.title}
                </div>
              </div>
              <div className="font-mono" style={{ marginTop: isMobile ? "6px" : "10px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: isMobile ? "8px" : "9.5px", letterSpacing: "0.14em", color: "#8A8A8A" }}>
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
            <div key={`text-${item.id}`} ref={(el) => { textRefs.current[idx] = el; }} style={{ position: "absolute", ...textStyle, maxWidth: isMobile ? "88vw" : item.lane === "center-stage" ? "min(90vw, 520px)" : "420px", zIndex: 30, pointerEvents: isLast ? "auto" : "none", willChange: "transform, opacity, clip-path" }}>
              <div className="font-mono" style={{ display: "inline-block", fontSize: isMobile ? "8.5px" : "10px", letterSpacing: "0.28em", color: "#D4A843", backgroundColor: "rgba(212, 168, 67, 0.1)", border: "1px solid rgba(212, 168, 67, 0.32)", padding: isMobile ? "2px 8px" : "3px 10px", borderRadius: "999px", marginBottom: isMobile ? "5px" : "8px" }}>
                {item.code} · {item.focusDistance}
              </div>
              <h2 className="font-display" style={{ fontSize: isMobile ? "clamp(1.05rem, 3.6vw, 1.3rem)" : "clamp(1.5rem, 2.2vw, 2.2rem)", fontWeight: 300, color: "#FAFAFA", lineHeight: 1.15, letterSpacing: "0.04em", textShadow: "0 12px 35px rgba(0, 0, 0, 0.85)" }}>
                {item.headline}
              </h2>
              <p className="font-body" style={{ marginTop: isMobile ? "4px" : "8px", fontSize: isMobile ? "11px" : "14px", fontWeight: 300, color: "#E8E8E8", lineHeight: 1.45, opacity: 0.85 }}>
                {item.subhead}
              </p>
              {isLast && (
                <div ref={finalCtaRef} style={{ marginTop: isMobile ? "10px" : "16px", display: "inline-block" }}>
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
      <div ref={hudBarRef} style={{ position: "absolute", inset: isMobile ? "82px 14px 58px 14px" : "clamp(56px, 7.5vh, 68px) clamp(16px, 2.5vw, 32px) clamp(24px, 3vh, 32px) clamp(16px, 2.5vw, 32px)", zIndex: 35, display: "flex", flexDirection: "column", justifyContent: "space-between", pointerEvents: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "3px" : "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "12px" }}>
              <div style={{ width: isMobile ? "14px" : "20px", height: isMobile ? "14px" : "20px", borderTop: "1.5px solid rgba(212, 168, 67, 0.75)", borderLeft: "1.5px solid rgba(212, 168, 67, 0.75)" }} />
              <span className="font-mono" style={{ fontSize: isMobile ? "8.5px" : "10.5px", letterSpacing: "0.26em", color: "#D4A843" }}>[ SCENE 02 // THE PULL-IN ]</span>
            </div>
            <div className="font-mono flex" style={{ alignItems: "center", gap: isMobile ? "8px" : "14px", paddingLeft: isMobile ? "22px" : "32px", fontSize: isMobile ? "7.5px" : "9.5px", letterSpacing: isMobile ? "0.16em" : "0.22em", color: "#E8E8E8" }}>
              <span>FOCUS: <strong style={{ color: "#D4A843" }}>{focusDistanceText}</strong></span>
              <span>Z-AXIS: <strong ref={zAxisReadoutRef} style={{ color: "#FAFAFA" }}>{zAxisMM}</strong></span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "12px" }}>
            <span className="font-mono" style={{ fontSize: isMobile ? "8.5px" : "11px", letterSpacing: "0.22em", color: "#FAFAFA" }}>
              {String(activeFrameIndex + 1).padStart(2, "0")} / {String(exhibits.length).padStart(2, "0")}
            </span>
            <div style={{ width: isMobile ? "14px" : "20px", height: isMobile ? "14px" : "20px", borderTop: "1.5px solid rgba(212, 168, 67, 0.75)", borderRight: "1.5px solid rgba(212, 168, 67, 0.75)" }} />
          </div>
        </div>

        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <span className="font-mono" style={{ fontSize: "8px", letterSpacing: "0.22em", color: "#D4A843" }}>
                ↓ SCROLL TO PULL FOCUS
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <div style={{ width: "14px", height: "14px", borderBottom: "1.5px solid rgba(212, 168, 67, 0.75)", borderLeft: "1.5px solid rgba(212, 168, 67, 0.75)" }} />
                <span className="font-mono" style={{ fontSize: "7.5px", letterSpacing: "0.18em", color: "#8A8A8A" }}>
                  RACK FOCUS
                </span>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "4px", paddingBottom: "2px" }}>
                {exhibits.map((item, idx) => {
                  const isCurrent = idx === activeFrameIndex;
                  const isPassed = idx < activeFrameIndex;
                  return (
                    <span key={item.id} style={{ width: isCurrent ? "14px" : "5px", height: "2.5px", borderRadius: "1.5px", backgroundColor: isCurrent ? "#D4A843" : isPassed ? "rgba(212, 168, 67, 0.45)" : "rgba(255, 255, 255, 0.16)", transition: "all 0.25s ease" }} />
                  );
                })}
              </div>

              <div style={{ width: "14px", height: "14px", borderBottom: "1.5px solid rgba(212, 168, 67, 0.75)", borderRight: "1.5px solid rgba(212, 168, 67, 0.75)" }} />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
              <div style={{ width: "20px", height: "20px", borderBottom: "1.5px solid rgba(212, 168, 67, 0.75)", borderLeft: "1.5px solid rgba(212, 168, 67, 0.75)" }} />
              <span className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.22em", color: "#8A8A8A" }}>
                3D PERSPECTIVE CORRIDOR · RACK FOCUS ACTIVE
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
              <span className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.22em", color: "#D4A843" }}>↓ SCROLL TO PULL FOCUS</span>
              <div style={{ width: "20px", height: "20px", borderBottom: "1.5px solid rgba(212, 168, 67, 0.75)", borderRight: "1.5px solid rgba(212, 168, 67, 0.75)" }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}