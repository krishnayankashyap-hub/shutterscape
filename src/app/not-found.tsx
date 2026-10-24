// src/app/not-found.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";

const WITTY_QUOTES = [
  "“Excuse me... did anyone leave a RAW file for this URL in the Lost & Found?”",
  "“Frame 404: The shutter clicked, but someone forgot to take the lens cap off.”",
  "“We checked every negative sleeve and contact sheet. This page was never exposed.”",
  "“Even our 85mm ƒ/1.2 lens couldn't find a single focal point on this route.”",
  "“Total darkroom blowout! The intern left the door open during film development.”",
  "“Error 404: Exposure lost somewhere between Guwahati and the cloud server.”",
];

export default function NotFound() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isBellRinging, setIsBellRinging] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringCount, setRingCount] = useState(0);

  // Smooth pupil tracking based on mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      // Clamp eye movement between -5 and 5
      setMousePos({
        x: Math.max(-5, Math.min(5, dx * 6)),
        y: Math.max(-4, Math.min(4, dy * 5)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Synthetic mechanical bell chime sound effect
  const playBellChime = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // Dual metallic frequencies for an authentic reception desk bell (1760Hz & 3520Hz)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(1760, now); // A6

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(3520, now); // Harmonic chime

      gainNode.gain.setValueAtTime(0.2, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.9);
      osc2.stop(now + 0.9);
    } catch {
      // Audio context fallback
    }
  }, []);

  // Camera shutter click sound
  const playShutterClick = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();

      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1600, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio fallback
    }
  }, []);

  // Ring the desk bell action
  const handleRingBell = useCallback(() => {
    playBellChime();
    setIsBellRinging(true);
    setRingCount((prev) => prev + 1);
    setQuoteIndex((prev) => (prev + 1) % WITTY_QUOTES.length);
    setTimeout(() => setIsBellRinging(false), 500);
  }, [playBellChime]);

  // Click the 404 camera character action
  const handleCameraSnap = useCallback(() => {
    playShutterClick();
    setIsFlashing(true);
    setQuoteIndex((prev) => (prev + 1) % WITTY_QUOTES.length);
    setTimeout(() => setIsFlashing(false), 220);
  }, [playShutterClick]);

  const activeQuote = useMemo(() => WITTY_QUOTES[quoteIndex], [quoteIndex]);

  return (
    <main className="relative z-[9999] min-h-screen w-full bg-white text-[#050505] font-sans selection:bg-[#FDE047] selection:text-black flex flex-col items-center justify-between py-6 px-4 sm:px-8 md:px-12 overflow-y-auto">
      
      {/* Flash overlay for interactive camera click */}
      <div 
        className={`fixed inset-0 bg-white pointer-events-none z-[10000] transition-opacity duration-200 ${
          isFlashing ? "opacity-90" : "opacity-0"
        }`} 
      />

      {/* ============================================================
          TOP HEADER: MINIMAL & BALANCED
          ============================================================ */}
      <header className="w-full flex items-center justify-between pb-4 border-b border-black/10 gap-2 sm:gap-4 shrink-0">
        <Link 
          href="/" 
          className="flex items-center gap-3.5 group text-decoration-none"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#050505] bg-white flex items-center justify-center font-serif italic font-bold text-lg sm:text-xl text-[#050505] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#050505]">
                ShutterScape
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono px-1.5 sm:px-2 py-0.5 rounded bg-black/5 font-semibold text-gray-700">
                GCU
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-500 font-mono tracking-tight mt-0.5">
              Photographic Lost & Found // Dept. 404
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6 font-mono text-xs">
          <span className="hidden sm:inline-block text-gray-400 font-medium">
            LOC: 26.1158°N, 91.7086°E
          </span>
          <Link
            href="mailto:shutterscape@gcuniversity.ac.in"
            className="px-3.5 sm:px-5 py-2 sm:py-2.5 min-h-[44px] inline-flex items-center touch-manipulation border border-black/20 rounded-full hover:border-black hover:bg-black hover:text-white transition-all text-[11px] sm:text-xs font-semibold shrink-0"
          >
            Report Missing Reel
          </Link>
        </div>
      </header>

      {/* ============================================================
          CENTERPIECE: BIGGER, READABLE & FULLY CENTERED
          ============================================================ */}
      <div className="flex flex-col items-center justify-center w-full my-6 flex-1 shrink-0">
        
        {/* Dynamic Speech Bubble - BIGGER & ULTRA READABLE */}
        <div className="relative mb-5 w-full max-w-3xl px-4 flex justify-center shrink-0">
          <div 
            onClick={handleRingBell}
            className="group cursor-pointer relative bg-white border-2 border-[#050505] rounded-2xl px-8 py-5 shadow-[5px_5px_0px_#050505] hover:shadow-[7px_7px_0px_#050505] transition-all max-w-2xl text-center w-full"
          >
            <p className="font-mono text-base sm:text-lg md:text-xl font-bold text-[#050505] leading-snug">
              {activeQuote}
            </p>
            <div className="mt-2 flex items-center justify-center gap-2 text-xs font-mono text-gray-500 font-medium">
              <span className="animate-pulse text-sm">🔔</span>
              <span>Click the desk bell or camera to hear another excuse</span>
            </div>

            {/* Bubble Tail Pointing Down */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-b-2 border-r-2 border-[#050505] rotate-45" />
          </div>
        </div>

        {/* The Kodak Yellow Canvas - BIGGER CONTAINER (max-w-7xl) */}
        <div className="relative w-full max-w-7xl bg-[#FDE047] border-3 sm:border-4 border-[#050505] rounded-2xl sm:rounded-3xl shadow-[10px_10px_0px_#050505] p-3.5 sm:p-10 md:p-12 flex items-center justify-center overflow-hidden shrink-0">
          
          {/* Subtle Photographic Film Perforations at Top and Bottom */}
          <div className="absolute top-3 left-0 right-0 flex justify-between px-6 pointer-events-none opacity-25">
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={`sprocket-top-${i}`} className="w-5 h-3 rounded-sm bg-black" />
            ))}
          </div>
          <div className="absolute bottom-3 left-0 right-0 flex justify-between px-6 pointer-events-none opacity-25">
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={`sprocket-bot-${i}`} className="w-5 h-3 rounded-sm bg-black" />
            ))}
          </div>

          {/* Interactive SVG Artwork */}
          <svg
            viewBox="0 0 880 490"
            className="w-full h-auto max-h-[560px] select-none"
            fill="none"
            stroke="#050505"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="10" stroke="#050505" strokeWidth="1.5" opacity="0.3" />
              </pattern>
            </defs>

            {/* FLOOR GROUND LINE & SHADOW HATCHING */}
            <line x1="20" y1="415" x2="860" y2="415" strokeWidth="4.5" />
            <line x1="110" y1="423" x2="290" y2="423" strokeWidth="2.5" strokeDasharray="6 6" opacity="0.4" />
            <line x1="480" y1="423" x2="800" y2="423" strokeWidth="2.5" strokeDasharray="6 6" opacity="0.4" />

            {/* HANGING DARKROOM INDUSTRIAL CEILING LAMP */}
            <line x1="420" y1="0" x2="420" y2="55" strokeWidth="3.5" />
            <path d="M388 75 L420 55 L452 75 Z" fill="#050505" />
            <circle cx="420" cy="80" r="8" fill="#FFF" strokeWidth="2.5" />
            {/* Soft dashed light cone */}
            <path d="M392 85 L320 230 M448 85 L520 230" stroke="#050505" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.25" />

            {/* ============================================================
                THE LOST & FOUND BOOTH (RIGHT SIDE)
                ============================================================ */}
            
            {/* Booth Building / Arch Window */}
            <rect x="500" y="130" width="280" height="160" rx="8" fill="white" strokeWidth="4" />
            <path d="M535 285 V180 A50 50 0 0 1 745 180 V285 Z" fill="#FDE047" strokeWidth="3.5" />

            {/* Hanging Chains & Main Sign - BIGGER & BOLDER TEXT */}
            <line x1="550" y1="55" x2="550" y2="85" strokeWidth="2.5" strokeDasharray="4 4" />
            <line x1="730" y1="55" x2="730" y2="85" strokeWidth="2.5" strokeDasharray="4 4" />
            
            <g className="transition-transform duration-300 hover:rotate-1 origin-center cursor-default">
              <rect x="510" y="80" width="260" height="54" rx="8" fill="white" strokeWidth="4" />
              <text x="640" y="110" fontSize="21" fontFamily="monospace" fontWeight="900" letterSpacing="2" textAnchor="middle" strokeWidth="0.8" fill="#050505">
                LOST & FOUND
              </text>
              <text x="640" y="125" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="1" textAnchor="middle" strokeWidth="0.2" fill="#555">
                DEPARTMENT 404 // GCU
              </text>
            </g>

            {/* Pinned Missing Notices on Booth Wall */}
            <g transform="translate(735, 140) rotate(8)">
              <rect x="0" y="0" width="38" height="48" fill="white" strokeWidth="2" />
              <circle cx="19" cy="6" r="3" fill="#EF4444" strokeWidth="1" />
              <text x="19" y="24" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle" strokeWidth="0.2" fill="#050505">
                LOST:
              </text>
              <text x="19" y="34" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle" strokeWidth="0.2" fill="#050505">
                FOCUS
              </text>
            </g>

            {/* ATTENDANT PERSON INSIDE BOOTH */}
            <g id="attendant">
              {/* Torso with tie */}
              <path d="M585 285 C585 230 695 230 695 285 Z" fill="white" strokeWidth="3.5" />
              <path d="M640 242 L646 264 L640 274 L634 264 Z" fill="#050505" strokeWidth="1" />
              
              {/* Head */}
              <circle cx="640" cy="205" r="40" fill="white" strokeWidth="3.5" />
              
              {/* Photographer's Vintage Beret */}
              <path d="M605 194 Q638 150 680 182 Q645 172 605 194 Z" fill="#050505" strokeWidth="2.5" />
              <circle cx="644" cy="160" r="3.5" fill="#050505" />

              {/* Eyebrows */}
              <path d="M616 186 Q625 182 634 186" strokeWidth="2.5" fill="none" />
              <path d="M646 186 Q655 182 664 186" strokeWidth="2.5" fill="none" />

              {/* Round Spectacles */}
              <circle cx="625" cy="204" r="14" fill="#FDE047" strokeWidth="3.2" />
              <circle cx="655" cy="204" r="14" fill="#FDE047" strokeWidth="3.2" />
              <path d="M639 204 H641" strokeWidth="3.2" />
              
              {/* Pupils that Track Cursor Dynamically */}
              <circle 
                cx={625 + mousePos.x} 
                cy={204 + mousePos.y} 
                r="5" 
                fill="#050505" 
                strokeWidth="0" 
              />
              <circle 
                cx={655 + mousePos.x} 
                cy={204 + mousePos.y} 
                r="5" 
                fill="#050505" 
                strokeWidth="0" 
              />

              {/* Nose & Smile */}
              <path d="M640 207 C642 217 635 218 635 218" strokeWidth="2.5" fill="none" />
              <path d="M633 226 Q640 233 647 226" strokeWidth="2.5" fill="none" />
            </g>

            {/* Booth Front Counter Desk */}
            <rect x="470" y="285" width="340" height="22" rx="4" fill="white" strokeWidth="4" />
            <rect x="490" y="307" width="300" height="108" fill="white" strokeWidth="4" />
            {/* Vertical Wood Grooves */}
            <line x1="550" y1="307" x2="550" y2="415" strokeWidth="2.5" opacity="0.4" />
            <line x1="610" y1="307" x2="610" y2="415" strokeWidth="2.5" opacity="0.4" />
            <line x1="670" y1="307" x2="670" y2="415" strokeWidth="2.5" opacity="0.4" />
            <line x1="730" y1="307" x2="730" y2="415" strokeWidth="2.5" opacity="0.4" />

            {/* PROPS ON THE DESK */}

            {/* Interactive Reception Desk Bell - BIGGER READABLE TAG */}
            <g 
              onClick={handleRingBell} 
              className={`cursor-pointer transition-transform duration-200 ${
                isBellRinging ? "-rotate-6 scale-110" : "hover:scale-105"
              }`}
              style={{ transformOrigin: "508px 275px" }}
            >
              <rect x="490" y="278" width="36" height="7" rx="2" fill="#050505" />
              <path d="M492 278 Q508 252 524 278 Z" fill="white" strokeWidth="3" />
              <line x1="508" y1="252" x2="508" y2="244" strokeWidth="3" />
              <circle cx="508" cy="243" r="3.5" fill="#050505" />
              
              {/* Floating "RING ME" Tag - BIGGER & BOLDER */}
              <g transform="translate(476, 215)">
                <rect x="0" y="0" width="68" height="22" rx="5" fill="#050505" strokeWidth="0" />
                <text x="34" y="15" fontSize="10" fontFamily="monospace" fontWeight="900" textAnchor="middle" fill="#FDE047" strokeWidth="0">
                  {ringCount > 0 ? `DING! (${ringCount})` : "RING ME 🛎"}
                </text>
              </g>
            </g>

            {/* Stack of 35mm Film Canisters on Desk - BIGGER TEXT */}
            <g transform="translate(740, 246)">
              {/* Bottom canister */}
              <rect x="0" y="20" width="34" height="19" rx="2" fill="white" strokeWidth="2.5" />
              <text x="17" y="33" fontSize="9" fontFamily="monospace" fontWeight="900" textAnchor="middle" fill="#050505" strokeWidth="0">
                400
              </text>
              {/* Top canister */}
              <rect x="3" y="2" width="28" height="18" rx="2" fill="#050505" strokeWidth="2.5" />
              <text x="17" y="15" fontSize="9" fontFamily="monospace" fontWeight="900" textAnchor="middle" fill="#FDE047" strokeWidth="0">
                GCU
              </text>
            </g>

            {/* ============================================================
                THE 404 CAMERA CHARACTER (LEFT SIDE)
                ============================================================ */}
            
            <g 
              onClick={handleCameraSnap}
              className="cursor-pointer group"
              id="camera-character"
            >
              {/* Confused Question Mark above character */}
              <g transform="translate(200, 115)" className="animate-bounce">
                <text x="0" y="0" fontSize="36" fontFamily="monospace" fontWeight="900" fill="#050505" strokeWidth="1">
                  ?
                </text>
              </g>

              {/* Legs */}
              <line x1="170" y1="335" x2="170" y2="400" strokeWidth="5" />
              <line x1="245" y1="335" x2="245" y2="400" strokeWidth="5" />

              {/* High-top Sneakers */}
              {/* Left Sneaker */}
              <g transform="translate(145, 400)">
                <path d="M0 15 H35 Q35 5 25 5 L18 5 L18 0 L8 0 L0 15 Z" fill="white" strokeWidth="3" />
                <rect x="0" y="11" width="35" height="4" fill="#050505" />
              </g>
              {/* Right Sneaker (Tapping animation) */}
              <g transform="translate(230, 400)" className="transition-transform duration-200 group-hover:-rotate-12 origin-bottom-left">
                <path d="M0 15 H35 Q35 5 25 5 L18 5 L18 0 L8 0 L0 15 Z" fill="white" strokeWidth="3" />
                <rect x="0" y="11" width="35" height="4" fill="#050505" />
              </g>

              {/* Rangefinder Camera Body */}
              <g transform="translate(110, 175)">
                {/* Main Body */}
                <rect x="0" y="35" width="200" height="125" rx="14" fill="white" strokeWidth="4" />
                
                {/* Camera Top Plate (Metallic rangefinder tier) */}
                <path d="M15 35 V16 H115 V35 Z" fill="white" strokeWidth="3.5" />
                
                {/* Shutter Button & Knobs */}
                <rect x="25" y="8" width="16" height="8" rx="2" fill="#050505" />
                <rect x="85" y="10" width="18" height="6" fill="#050505" />
                <rect x="155" y="24" width="28" height="11" rx="2" fill="#050505" />

                {/* Leica-Style Red Dot Monogram */}
                <circle cx="24" cy="58" r="10" fill="#EF4444" strokeWidth="1" />
                <text x="24" y="63" fontSize="11" fontFamily="serif" fontStyle="italic" fontWeight="bold" textAnchor="middle" fill="white" strokeWidth="0">
                  S
                </text>

                {/* Viewfinder Window */}
                <rect x="160" y="48" width="24" height="16" rx="3" fill="#FDE047" strokeWidth="2.5" />
                <line x1="160" y1="48" x2="184" y2="64" strokeWidth="1.5" opacity="0.4" />

                {/* ============================================================
                    DEDICATED UNOBSTRUCTED 404 MODEL BADGE PLATE (100% VISIBLE!)
                    ============================================================ */}
                <g transform="translate(10, 88)">
                  <rect x="0" y="0" width="68" height="42" rx="8" fill="white" stroke="#050505" strokeWidth="3.5" />
                  <text x="34" y="30" fontSize="28" fontFamily="monospace" fontWeight="900" letterSpacing="1" textAnchor="middle" fill="#050505" strokeWidth="1">
                    404
                  </text>
                </g>

                {/* BIG CAMERA LENS IN CENTER (OFF TO THE RIGHT, ZERO OVERLAP WITH 404) */}
                <g transform="translate(130, 95)">
                  {/* Outer Lens Barrel */}
                  <circle cx="0" cy="0" r="44" fill="white" strokeWidth="4" />
                  <circle cx="0" cy="0" r="33" fill="#FDE047" strokeWidth="3" />
                  
                  {/* Aperture Iris / Eye that tracks the mouse */}
                  <circle 
                    cx={mousePos.x * 1.5} 
                    cy={mousePos.y * 1.5} 
                    r="15" 
                    fill="#050505" 
                    strokeWidth="0" 
                  />
                  {/* Catchlight Reflection */}
                  <circle 
                    cx={mousePos.x * 1.5 - 5} 
                    cy={mousePos.y * 1.5 - 5} 
                    r="4.5" 
                    fill="white" 
                    strokeWidth="0" 
                  />

                  {/* Lens markings - READABLE */}
                  <text x="0" y="42" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle" fill="#050505" strokeWidth="0">
                    50MM ƒ/1.4
                  </text>
                </g>

                {/* Cartoon Hand holding an upside-down Sitemap */}
                <g transform="translate(186, 108)">
                  <path d="M0 0 L28 -12 L50 16 L22 28 Z" fill="white" strokeWidth="2.5" />
                  <text x="25" y="6" fontSize="8" fontFamily="monospace" fontWeight="900" fill="#050505" strokeWidth="0" transform="rotate(15)">
                    SITEMAP
                  </text>
                  <text x="24" y="17" fontSize="7" fontFamily="monospace" fontWeight="bold" fill="#EF4444" strokeWidth="0" transform="rotate(15)">
                    (LOST)
                  </text>
                </g>

                {/* Left hand scratching head */}
                <path d="M0 100 C-15 90 -20 60 -5 50" strokeWidth="3.5" fill="none" />
              </g>
            </g>

          </svg>
        </div>

        {/* ============================================================
            PROMINENT & BROUGHT-DOWN "RETURN TO HOME" BUTTON
            (GENEROUS BREATHING SPACE: pt-12 sm:pt-16 pb-8)
            ============================================================ */}
        <div className="pt-6 sm:pt-14 md:pt-20 pb-4 sm:pb-8 flex justify-center items-center w-full shrink-0 relative z-30">
          <Link
            href="/"
            className="px-8 sm:px-16 py-3.5 sm:py-5 min-h-[44px] touch-manipulation bg-[#050505] text-[#FAFAFA] hover:bg-[#FDE047] hover:text-[#050505] border-3 border-[#050505] font-mono text-xs sm:text-base font-bold tracking-widest uppercase rounded-full shadow-[5px_5px_0px_#050505] hover:shadow-[8px_8px_0px_#050505] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 sm:gap-4 group cursor-pointer"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1 font-bold text-lg">
              ↺
            </span>
            <span className="tracking-widest">Return to Home</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 font-bold text-lg">
              →
            </span>
          </Link>
        </div>

      </div>

      {/* ============================================================
          TINY MINIMAL BOTTOM METADATA
          ============================================================ */}
      <footer className="w-full flex items-center justify-center py-4 text-center shrink-0">
        <p className="font-mono text-[10px] text-gray-400 tracking-widest uppercase">
          GCU PHOTOGRAPHY CLUB · ERROR 404 · FRAME UNACCOUNTED FOR
        </p>
      </footer>

    </main>
  );
}
