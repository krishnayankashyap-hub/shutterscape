// src/components/cinematic/EditorialSpread.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROSTER_TIERS = [
  { count: "02", label: "FACULTY MENTORS", code: "CH // 02" },
  { count: "03", label: "BEHIND THE LENS", code: "CH // 03" },
  { count: "06", label: "CORE COMMITTEE", code: "CH // 04" },
  { count: "02", label: "FOUNDING VISIONARIES", code: "CH // 05" },
  { count: "04", label: "LEGACY TORCHBEARERS", code: "CH // 06" },
];

export default function EditorialSpread() {
  const sectionRef = useRef<HTMLElement>(null);
  const whiteBgRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  
  // Parallax Photo Refs
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const photo3Ref = useRef<HTMLDivElement>(null);
  
  // UI Data Layer Refs
  const uiLayerRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLAnchorElement>(null);
  const magneticArrowRef = useRef<HTMLSpanElement>(null);

  const [isMobile, setIsMobile] = useState(false);

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
    const arrowXTo = gsap.quickTo(arrow, "x", { duration: 0.35, ease: "power3.out" });

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
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(whiteBgRef.current, { clipPath: "circle(0% at 50% 50%)" });
      gsap.set([photo1Ref.current, photo2Ref.current, photo3Ref.current], { y: "120vh" });
      gsap.set(uiLayerRef.current, { opacity: 0, y: 100, pointerEvents: "none" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2, 
        },
      });

      // PHASE 1: The Dramatic Aperture Light Reveal
      tl.to(whiteBgRef.current, { 
        clipPath: "circle(150% at 50% 50%)", 
        duration: 1.5, 
        ease: "power2.inOut" 
      }, 0);

      // PHASE 2: The Photos Float Up via Parallax
      tl.to(photo1Ref.current, { y: "-120vh", duration: 5, ease: "none" }, 0.5);
      tl.to(photo2Ref.current, { y: "-150vh", duration: 6, ease: "none" }, 0.8);
      tl.to(photo3Ref.current, { y: "-100vh", duration: 4.5, ease: "none" }, 1.5);

      // PHASE 3: Giant Text slowly drifts and fades away
      tl.to(giantTextRef.current, { 
        scale: 0.92, 
        opacity: 0, 
        duration: 2, 
        ease: "power2.inOut" 
      }, 4.5);

      // PHASE 4: The Clean UI / Editorial Data glides into the white void
      tl.to(uiLayerRef.current, { 
        opacity: 1, 
        y: 0, 
        pointerEvents: "auto", 
        duration: 2, 
        ease: "power3.out" 
      }, 5.5);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[400vh] bg-transparent">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-transparent flex items-center justify-center">
        
        <div ref={whiteBgRef} className="absolute inset-0 bg-[#F4F4F5] w-full h-full">
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply pointer-events-none" />

          {/* LAYER 1: PARALLAX FLOATING PRINTS (Z-10) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div ref={photo1Ref} className="absolute left-[5%] md:left-[10%] top-[100vh] w-[70vw] md:w-[35vw] h-[30vh] md:h-[45vh] shadow-[0_30px_80px_rgba(0,0,0,0.15)]">
              <Image src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=85" alt="GCU Photography" fill style={{ objectFit: "cover" }} />
            </div>
            <div ref={photo2Ref} className="absolute right-[5%] md:right-[15%] top-[100vh] w-[50vw] md:w-[22vw] h-[40vh] md:h-[60vh] shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
              <Image src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=85" alt="GCU Studio" fill style={{ objectFit: "cover" }} />
            </div>
            <div ref={photo3Ref} className="absolute left-[20%] md:left-[38%] top-[100vh] w-[60vw] md:w-[30vw] h-[25vh] md:h-[35vh] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <Image src="https://images.unsplash.com/photo-1554223090-7e482851df45?w=1000&q=85" alt="GCU Field Work" fill style={{ objectFit: "cover" }} />
            </div>
          </div>

          {/* LAYER 2: THE "DIFFERENCE" TYPOGRAPHY (Z-20) */}
          <div ref={giantTextRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none mix-blend-difference px-4">
            <p className="font-mono text-white text-[10px] sm:text-xs md:text-sm tracking-[0.4em] mb-3 md:mb-6 opacity-80 text-center">
              SCENE 03 // THE EDITORIAL SPREAD
            </p>
            <h2 className="font-serif text-white text-3xl sm:text-5xl md:text-[8vw] leading-[0.95] md:leading-[0.85] uppercase text-center font-light tracking-tight">
              More Than A<br/>
              <span className="italic font-normal">Camera Club.</span>
            </h2>
            <p className="font-body text-white text-xs sm:text-base md:text-2xl font-light mt-4 md:mt-8 max-w-2xl text-center opacity-90">
              A community of visual observers at Girijananda Chowdhury University.
            </p>
          </div>

          {/* ==========================================================
              LAYER 3: FINAL EDITORIAL DATA & CTA (Z-30)
              ========================================================== */}
          <div 
            ref={uiLayerRef}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#F4F4F5] px-4"
          >
            <div className="max-w-6xl w-full px-2 sm:px-6 flex flex-col items-center">
              
              {/* Inclusivity Ethos Quote */}
              <div className="relative mb-4 sm:mb-8 md:mb-28 text-center max-w-4xl">
                <div className="font-mono text-[9.5px] sm:text-[11px] md:text-xs tracking-[0.3em] text-[#D4A843] mb-2 sm:mb-4 md:mb-8 uppercase">
                  Open Inclusivity Ethos //
                </div>
                <p className="font-serif text-base sm:text-2xl md:text-4xl italic font-light leading-snug sm:leading-[1.4] text-[#050505]">
                  “You don’t need a DSLR! Whether you shoot on a flagship mirrorless or a smartphone — your eye and perspective matter most.”
                </p>
              </div>

              {/* 5-Tier Roster Architectural Grid */}
              <div className="w-full border-t border-[#050505]/10 pt-4 sm:pt-8 md:pt-16 mb-4 sm:mb-8 md:mb-12">
                <div className="font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.28em] text-[#050505]/40 mb-3 sm:mb-6 md:mb-12 text-center">
                  THE 5-TIER ROSTER & LEGACY INDEX //
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 sm:gap-8 md:gap-24">
                  {ROSTER_TIERS.map((tier) => (
                    <div key={tier.code} className="flex flex-col items-center px-1 sm:px-2">
                      <span className="font-serif text-2xl sm:text-4xl md:text-6xl text-[#050505]">{tier.count}</span>
                      <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] text-[#050505]/30 mt-1 mb-1 sm:mt-2 sm:mb-2 md:mt-3 md:mb-3">{tier.code}</span>
                      <span className="font-mono text-[8.5px] sm:text-[10px] md:text-[11px] tracking-[0.2em] text-[#D4A843] uppercase text-center">{tier.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frameless & Borderless Editorial CTA Button to /about */}
              <div className="mt-3 sm:mt-8 md:mt-20 relative top-0 md:top-12">
                <Link 
                  ref={magneticBtnRef} 
                  href="/about" 
                  className="group font-mono relative inline-flex items-center gap-3 sm:gap-4 min-h-[44px] py-2 px-1 text-[#050505] hover:text-[#D4A843] text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.3em] uppercase font-bold transition-colors duration-300 cursor-pointer touch-manipulation bg-transparent border-0 shadow-none rounded-none focus-visible:outline-2 focus-visible:outline-[#D4A843] focus-visible:outline-offset-4"
                  title="Discover Our Story"
                  aria-label="Discover Our Story"
                >
                  <span className="transition-colors duration-300">Discover Our Story</span>
                  <span ref={magneticArrowRef} className="text-xl sm:text-2xl font-light transition-transform duration-300 group-hover:translate-x-1.5 text-[#D4A843]">→</span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
