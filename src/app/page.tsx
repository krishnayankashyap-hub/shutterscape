// src/app/page.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroller from "@/components/cinematic/SmoothScroller";
import ApertureHero from "@/components/cinematic/ApertureHero";
import PullInScene from "@/components/cinematic/PullInScene";
import EditorialSpread from "@/components/cinematic/EditorialSpread";
import TimelinePeek from "@/components/cinematic/TimelinePeek";
import FramesOfMoments from "@/components/cinematic/FramesOfMoments";
// Fixed Import: Ensure the filename exactly matches "Scene6Credits.tsx"
import Scene6Credits from "@/components/cinematic/Scene6Credits";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const progressLineRef = useRef<SVGPathElement>(null);
  const progressNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        const lenis = (
          window as unknown as {
            __lenis?: {
              scrollTo: (
                target: number,
                options?: { immediate?: boolean }
              ) => void;
            };
          }
        ).__lenis;
        if (lenis) lenis.scrollTo(0, { immediate: true });
      }
    }

    let rafId: number | null = null;
    let cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    const recalculateDimensions = () => {
      cachedMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    const performProgressUpdate = () => {
      rafId = null;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const p = Math.min(1, Math.max(0, scrollTop / cachedMaxScroll));

      if (progressLineRef.current) {
        const totalLen = 840;
        const dashOffset = totalLen * (1 - p);
        progressLineRef.current.style.strokeDasharray = `${totalLen}`;
        progressLineRef.current.style.strokeDashoffset = `${dashOffset}`;
      }

      if (progressNodeRef.current) {
        const yVh = 8 + p * 84;
        progressNodeRef.current.style.top = `${yVh}vh`;
      }
    };

    const updateGlobalProgress = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(performProgressUpdate);
      }
    };

    recalculateDimensions();
    performProgressUpdate();

    window.addEventListener("scroll", updateGlobalProgress, { passive: true });
    window.addEventListener("resize", () => {
      recalculateDimensions();
      updateGlobalProgress();
    });
    ScrollTrigger.addEventListener("refresh", () => {
      recalculateDimensions();
      updateGlobalProgress();
    });

    return () => {
      window.removeEventListener("scroll", updateGlobalProgress);
      if (rafId) cancelAnimationFrame(rafId);
      ScrollTrigger.removeEventListener("refresh", updateGlobalProgress);
    };
  }, []);

  return (
    <SmoothScroller>
      {/* GLOBAL FIXED WEBSITE PROGRESS BAR */}
      <div
        className="fixed top-0 bottom-0 right-1.5 sm:right-3.5 w-5 pointer-events-none z-[9990] flex justify-center"
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
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1"
          />
          <path
            ref={progressLineRef}
            d="M 12,80 L 12,920"
            fill="none"
            stroke="#D4A843"
            strokeWidth="1.6"
            strokeLinecap="round"
            style={{
              strokeDasharray: 840,
              strokeDashoffset: 840,
            }}
          />
        </svg>

        <div
          ref={progressNodeRef}
          style={{
            position: "absolute",
            top: "8vh",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: "#FFE099",
            boxShadow: "0 0 10px #D4A843, 0 0 20px rgba(212,168,67,0.85)",
          }}
        />
      </div>

      <main className="bg-[#030303] min-h-screen text-white overflow-x-clip">
        <div
          id="exhibition-scroll-track"
          className="relative w-full h-[1400vh] bg-[#030303]"
        >
          {/* Target anchor for GALLERY navigation -> Exhibit 08H */}
          <div
            id="scene-exhibition"
            className="absolute left-0 w-full pointer-events-none"
            style={{ top: "1248vh", height: "1px" }}
          />

          <div
            id="exhibition-pinned-viewport"
            className="sticky top-0 w-full h-screen overflow-hidden bg-[#030303]"
          >
            <div className="absolute inset-0 z-10">
              <ApertureHero />
            </div>
            <div className="absolute inset-0 z-20">
              <PullInScene />
            </div>
          </div>
        </div>

        <div id="scene-roster" className="relative z-30">
          {/* Target anchor for ABOUT navigation -> "Discover Our Story" / 5-Tier Roster */}
          <div
            id="scene-about-showcase"
            className="absolute left-0 w-full pointer-events-none"
            style={{ top: "282vh", height: "1px" }}
          />
          <EditorialSpread />
        </div>

        <div id="scene-timeline" className="relative z-30">
          {/* Target anchor for ACTIVITY navigation -> "Living Visual Chronicle" */}
          <div
            id="scene-activity-showcase"
            className="absolute left-0 w-full pointer-events-none"
            style={{ top: "305vh", height: "1px" }}
          />
          <TimelinePeek />
        </div>

        <div id="scene-gallery" className="relative z-30">
          <FramesOfMoments />
        </div>

        {/* SCENE 6: The Credits & Footer */}
        <div id="scene-credits" className="relative z-30">
          <Scene6Credits />
        </div>
      </main>
    </SmoothScroller>
  );
}