"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CameraShutterLoader() {
  const pathname = usePathname();
  const [flashActive, setFlashActive] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const loaderRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const apertureRingRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    // 1. Prevent browser from restoring raw scroll offsets before GSAP pins hydrate
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      const isReload =
        navEntries.length > 0
          ? navEntries[0].type === "reload"
          : (performance as unknown as { navigation?: { type: number } }).navigation?.type === 1;

      if (isReload || !window.location.hash) {
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname);
        }
        window.scrollTo(0, 0);
      }
    }

    // 2. Play subtle synthesized camera shutter mechanical click
    const playCameraShutterSound = () => {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        if (ctx.state === "suspended") ctx.resume();

        // Shutter curtain 1 click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(650, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.035);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.035);

        // Shutter curtain 2 close click
        setTimeout(() => {
          try {
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = "sine";
            osc2.frequency.setValueAtTime(520, ctx.currentTime);
            osc2.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.04);
            gain2.gain.setValueAtTime(0.09, ctx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start();
            osc2.stop(ctx.currentTime + 0.04);
          } catch {}
        }, 50);
      } catch {
        // Silently ignore if browser gesture policy blocks audio
      }
    };

    // 3. Camera aperture focus & shutter flash animation timeline (Exact 2-Second Cinematic Intro)
    const tl = gsap.timeline({
      onComplete: () => {
        setDismissed(true);
        // Refresh ScrollTrigger pins cleanly once screen is revealed
        if (typeof window !== "undefined") {
          ScrollTrigger.refresh();
        }
      },
    });

    // Initial state
    gsap.set(cameraRef.current, { scale: 0.88, opacity: 0 });
    gsap.set(flashRef.current, { opacity: 0 });

    // Step 1: Camera enters and lens locks focus smoothly (0.5s)
    tl.to(cameraRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    // Step 2: Lens aperture rotates & contracts - autofocus calibration (0.5s, overlap 0.2s)
    if (apertureRingRef.current) {
      tl.to(
        apertureRingRef.current,
        {
          rotate: 90,
          scale: 0.92,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "-=0.2"
      );
    }

    // Step 3: Brief focus lock pause before shutter release (0.25s)
    tl.to({}, { duration: 0.25 });

    // Step 4: CAMERA SHUTTER CLICK + FLASH BURST! (0.1s)
    tl.call(() => {
      setFlashActive(true);
      playCameraShutterSound();
    });

    tl.to(
      flashRef.current,
      {
        opacity: 0.98,
        duration: 0.08,
        ease: "power4.in",
      },
      "+=0.02"
    );

    // Step 5: Flash dissipates with optical bloom, revealing clean website (0.55s)
    tl.to(flashRef.current, {
      opacity: 0,
      duration: 0.55,
      ease: "power2.out",
    });

    tl.to(
      loaderRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      },
      "-=0.25"
    );

    return () => {
      tl.kill();
    };
  }, []);

  if (dismissed || pathname?.startsWith("/admin")) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] bg-[#030303] flex flex-col items-center justify-center select-none cursor-default"
      style={{ willChange: "opacity" }}
    >
      {/* CAMERA VIEWFINDER RETICLE & BODY */}
      <div
        ref={cameraRef}
        className="relative flex flex-col items-center justify-center gap-6 opacity-0"
        style={{ opacity: 0 }}
      >
        {/* Focusing Brackets [ + ] */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          {/* Top-Left Bracket */}
          <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4A843] rounded-tl-sm" />
          {/* Top-Right Bracket */}
          <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4A843] rounded-tr-sm" />
          {/* Bottom-Left Bracket */}
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4A843] rounded-bl-sm" />
          {/* Bottom-Right Bracket */}
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4A843] rounded-br-sm" />

          {/* Minimalist Camera Icon with Lens */}
          <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#0d0d10] border border-white/10 rounded-2xl shadow-2xl">
            {/* Viewfinder Flash/LED */}
            <div className="absolute -top-2 left-3 w-5 h-2 bg-[#1b1b22] border-t border-x border-white/10 rounded-t-sm" />
            <div
              className={`absolute -top-1.5 right-3 w-2 h-2 rounded-full transition-colors duration-200 ${
                flashActive
                  ? "bg-[#EF4444] shadow-[0_0_12px_#EF4444]"
                  : "bg-[#D4A843] shadow-[0_0_8px_#D4A843]"
              }`}
            />

            {/* Aperture Lens SVG */}
            <svg
              ref={apertureRingRef}
              className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4A843]"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.2)" />
              <circle cx="24" cy="24" r="8" fill="#D4A843" fillOpacity="0.18" />
              <path d="M24 4 L30 18" />
              <path d="M44 24 L30 30" />
              <path d="M24 44 L18 30" />
              <path d="M4 24 L18 18" />
            </svg>
          </div>
        </div>

        {/* ShutterScape Camera HUD Tag */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.32em] text-[#FAFAFA] uppercase">
              SHUTTERSCAPE // FOCUSING
            </span>
          </div>
          <span className="font-mono text-[9px] tracking-[0.22em] text-white/40 uppercase">
            CALIBRATING LENS OPTICS
          </span>
        </div>
      </div>

      {/* FULLSCREEN CAMERA FLASH STROBE BURST (starts strictly at opacity: 0) */}
      <div
        ref={flashRef}
        className="fixed inset-0 pointer-events-none z-50 opacity-0 bg-gradient-to-b from-white via-white to-amber-50"
        style={{ opacity: 0, willChange: "opacity" }}
      />
    </div>
  );
}
