"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // On mobile devices (< 1024px or touch), let the browser use native 120Hz/60Hz hardware momentum scrolling!
    // Running Lenis on mobile touch hijacks the touch event stream and causes heavy input lag and stuttering.
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.0,
      infinite: false,
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      const isReload =
        navEntries.length > 0
          ? navEntries[0].type === "reload"
          : (performance as unknown as { navigation?: { type: number } }).navigation?.type === 1;

      if (isReload || !window.location.hash) {
        lenis.scrollTo(0, { immediate: true });
      }
    }

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update, false, true);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      if (typeof window !== "undefined") {
        const win = window as unknown as { __lenis?: Lenis | null };
        if (win.__lenis === lenis) {
          win.__lenis = null;
        }
      }
    };
  }, []);

  return <>{children}</>;
}