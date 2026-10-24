// src/components/cinematic/Scene6Credits.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "ACTIVE MEMBERS", target: 200, suffix: "+" },
  { label: "PHOTOWALKS & CLINICS", target: 50, suffix: "+" },
  { label: "FRAMES PRESERVED", target: 5000, suffix: "+" },
];

export default function Scene6Credits() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Animation Refs
  const backgroundTextRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const giantCtaRef = useRef<HTMLHeadingElement>(null);
  
  // Magnetic Button Refs
  const waBtnRef = useRef<HTMLAnchorElement>(null);
  const igBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 1024);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Reusable magnetic physics setup
  const initMagneticButton = (btn: HTMLElement | null) => {
    if (!btn) return;
    const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      xTo((e.clientX - cx) * 0.25);
      yTo((e.clientY - cy) * 0.3);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  };

  useEffect(() => {
    const cleanupWA = initMagneticButton(waBtnRef.current);
    const cleanupIG = initMagneticButton(igBtnRef.current);
    return () => {
      cleanupWA?.();
      cleanupIG?.();
    };
  }, []);

  // GSAP Scroll Animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. WOW FACTOR: Giant Background "SHUTTERSCAPE" Parallax Drift
      gsap.fromTo(
        backgroundTextRef.current,
        { x: isMobile ? "2vw" : "5vw" },
        {
          x: isMobile ? "-10vw" : "-25vw",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // 2. Rolling Number Counters
      countersRef.current.forEach((counterEl, index) => {
        if (!counterEl) return;
        const targetObj = { val: 0 };
        const endVal = STATS[index].target;
        
        gsap.to(targetObj, {
          val: endVal,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            const formatted = Math.floor(targetObj.val).toLocaleString("en-US");
            counterEl.innerText = `${formatted}${STATS[index].suffix}`;
          },
        });
      });

      // 3. Giant CTA Bottom-Up Reveal
      gsap.fromTo(
        giantCtaRef.current,
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          y: 40,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: giantCtaRef.current,
            start: "top 85%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#F4F4F5",
        color: "#050505",
        paddingTop: "60px",
        paddingBottom: "80px",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.03,
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          mixBlendMode: "multiply",
        }}
      />

      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0">
        <h1
          ref={backgroundTextRef}
          className="font-serif text-6xl sm:text-8xl md:text-[28vw] leading-none whitespace-nowrap will-change-transform"
          style={{
            color: "rgba(5, 5, 5, 0.04)",
            marginTop: "-10vh"
          }}
        >
          SHUTTERSCAPE STUDIO
        </h1>
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1360px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 28px" }}>
        
        <div style={{ borderTop: "1px solid rgba(5,5,5,0.12)", paddingTop: "32px", paddingBottom: "36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#D4A843", boxShadow: "0 0 10px rgba(212,168,67,0.5)" }} />
              <span className="font-mono text-[10px] md:text-xs tracking-[0.32em] text-[#D4A843] uppercase">
                [ SCENE 06 // THE CREDITS ]
              </span>
            </div>
            <div className="font-mono text-[10px] md:text-xs tracking-[0.24em] text-[#050505]/40 uppercase">
              OUR IMPACT
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span
                  ref={(el) => { countersRef.current[idx] = el; }}
                  className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#050505] font-light tracking-tighter leading-none"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  0{stat.suffix}
                </span>
                <span className="mt-2.5 sm:mt-3 font-mono text-[9.5px] md:text-[10.5px] tracking-[0.25em] text-[#D4A843] uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(5,5,5,0.12)", paddingTop: "36px", paddingBottom: "42px", textAlign: "center" }}>
          <h2
            ref={giantCtaRef}
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-[#050505] tracking-tight leading-tight"
          >
            Shape the{" "}
            <span className="italic text-[#D4A843] font-normal">Visual Archive.</span>
          </h2>
          
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full max-w-md sm:max-w-none mx-auto">
            
            {/* WHATSAPP BUTTON WITH SVG LOGO */}
            <Link
              ref={waBtnRef}
              href="https://chat.whatsapp.com/Hs71BicR1Xj3PmOyPJ5wdc?s=sw&p=a&mlu=4&ilr=4"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono relative inline-flex items-center justify-center gap-2.5 rounded-full uppercase transition-all duration-300 group min-h-[44px] min-w-[44px] w-full sm:w-auto touch-manipulation cursor-pointer"
              style={{
                padding: "12px 28px",
                backgroundColor: "#050505",
                border: "1px solid #050505",
                color: "#FAFAFA",
                fontSize: "10.5px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#D4A843";
                e.currentTarget.style.borderColor = "#D4A843";
                e.currentTarget.style.color = "#050505";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#050505";
                e.currentTarget.style.borderColor = "#050505";
                e.currentTarget.style.color = "#FAFAFA";
              }}
            >
              {/* WhatsApp Icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.199 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Join WhatsApp</span>
            </Link>
            
            {/* INSTAGRAM BUTTON WITH SVG LOGO */}
            <Link
              ref={igBtnRef}
              href="https://www.instagram.com/shutterscape_gcu"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono relative inline-flex items-center justify-center gap-2.5 rounded-full uppercase transition-all duration-300 group min-h-[44px] min-w-[44px] w-full sm:w-auto touch-manipulation cursor-pointer"
              style={{
                padding: "12px 28px",
                backgroundColor: "transparent",
                border: "1px solid rgba(5,5,5,0.2)",
                color: "#050505",
                fontSize: "10.5px",
                fontWeight: 600,
                letterSpacing: "0.22em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#D4A843";
                e.currentTarget.style.color = "#D4A843";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(5,5,5,0.2)";
                e.currentTarget.style.color = "#050505";
              }}
            >
              {/* Instagram Icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <span>Follow Us</span>
            </Link>
          </div>
        </div>

        {/* ============================================================
            SECTION 3: THE COLOPHON (FOOTER WITH PROMINENT MAP)
            ============================================================ */}
        <footer style={{ borderTop: "1px solid rgba(5,5,5,0.12)", paddingTop: "36px", paddingBottom: "24px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-8">
            
            {/* Left Column: Branding & Logos */}
            <div>
              <h4 className="font-serif text-2xl md:text-3xl text-[#050505] tracking-wide mb-3">ShutterScape Studio</h4>
              <p className="font-mono text-[9.5px] md:text-[10.5px] tracking-[0.18em] text-[#050505]/60 uppercase max-w-md leading-relaxed mb-6">
                The official photography & visual storytelling club of Girijananda Chowdhury University.
              </p>
              
              <div className="flex items-center gap-5 opacity-80 mix-blend-multiply">
                <div className="relative w-12 h-12">
                  <Image 
                    src="/images/gcu-logo.png" 
                    alt="GCU Logo" 
                    fill 
                    className="object-contain drop-shadow-sm" 
                  />
                </div>
                <div className="relative w-12 h-12">
                  <Image 
                    src="/images/shutterscape-logo.png" 
                    alt="ShutterScape Logo" 
                    fill 
                    className="object-contain drop-shadow-sm" 
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Address, Map, and Contact */}
            <div className="flex flex-col lg:items-end text-left lg:text-right">
              <div className="font-mono text-[9.5px] md:text-[10px] tracking-[0.18em] text-[#050505]/40 uppercase mb-2">Location</div>
              <p className="font-body text-[13px] md:text-[14px] leading-relaxed text-[#050505]/80 mb-4">
                Girijananda Chowdhury University<br/>
                Hathkhowapara, Azara, Guwahati<br/>
                Assam 781017, India
              </p>

              {/* FIXED GOOGLE MAP EMBED */}
              <div className="w-full max-w-[360px] h-[130px] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-black/10 mb-2.5 filter grayscale-[80%] hover:grayscale-0 hover:shadow-[0_15px_40px_rgba(212,168,67,0.15)] transition-all duration-500">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.493527263544!2d91.60334817610196!3d26.11520639391097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a4ffab238a8e1%3A0xda591cc5a3592bc1!2sGirijananda%20Chowdhury%20University%2C%20Assam!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/NhdHs1u76Bjxo2J87"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[9.5px] tracking-wider text-[#D4A843] hover:text-[#050505] transition-colors mb-4 inline-flex items-center gap-1.5"
              >
                <span>Open University Location on Google Maps</span>
                <span>↗</span>
              </a>
              
              <div className="font-mono text-[9.5px] md:text-[10px] tracking-[0.18em] text-[#050505]/40 uppercase mb-1.5">Contact</div>
              <a href="mailto:shutterscape@gcuniversity.ac.in" className="font-mono text-xs md:text-sm tracking-widest text-[#D4A843] hover:text-[#050505] transition-colors">
                shutterscape@gcuniversity.ac.in
              </a>
            </div>
          </div>

          {/* Bottom Legal & Credit Strip */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-[#050505]/10 font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-[#050505]/40 uppercase">
            <div>
              Website Maintained by{" "}
              <a href="https://codingclub.gcuniversity.ac.in" target="_blank" className="text-[#D4A843] hover:text-[#050505] transition-colors">
                Codénix (GCU Coding Club)
              </a>
            </div>
            <div>
              © 2026 ShutterScape · All Rights Reserved
            </div>
          </div>
        </footer>

      </div>
    </section>
  );
}
