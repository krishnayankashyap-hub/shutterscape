// src/components/cinematic/GlobalBranding.tsx
"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface NavItem {
  id: string;
  title: string;
  targetId?: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", title: "HOME", targetId: "exhibition-scroll-track", href: "/" },
  { id: "gallery", title: "GALLERY", targetId: "scene-exhibition", href: "/#scene-exhibition" },
  { id: "about", title: "ABOUT", targetId: "scene-about-showcase", href: "/#scene-about-showcase" },
  { id: "timeline", title: "ACTIVITY", targetId: "scene-activity-showcase", href: "/#scene-activity-showcase" },
  { id: "moments", title: "MOMENTS", targetId: "scene-gallery", href: "/#scene-gallery" },
];

function getTargetScrollY(targetId: string): number | null {
  if (typeof window === "undefined") return null;
  const vh = window.innerHeight;
  if (targetId === "home" || targetId === "exhibition-scroll-track") return 0;

  const el = document.getElementById(targetId);
  if (el) {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    return Math.max(0, Math.round(rect.top + scrollTop));
  }

  switch (targetId) {
    case "scene-exhibition":
      return 12.48 * vh;
    case "scene-about-showcase":
    case "scene-roster":
      return 16.82 * vh; // 1400vh + 282vh = 1682vh: Phase 4 "Discover Our Story" / 5-Tier Roster
    case "scene-activity-showcase":
    case "scene-timeline":
      return 21.05 * vh; // 1800vh + 305vh = 2105vh: "Living Visual Chronicle" showcase
    case "scene-gallery":
    case "moments":
      return 22.60 * vh;
    default:
      return null;
  }
}

export default function GlobalBranding() {
  const router = useRouter();
  const pathname = usePathname();

  const isLightPage = pathname === "/activities" || pathname === "/gallery";

  const [activeNav, setActiveNav] = useState(
    pathname === "/activities"
      ? "timeline"
      : pathname === "/gallery"
      ? "gallery"
      : "home"
  );
  const [isLightBackground, setIsLightBackground] = useState(isLightPage);
  const activeNavRef = useRef(
    pathname === "/activities"
      ? "timeline"
      : pathname === "/gallery"
      ? "gallery"
      : "home"
  );
  const isLightRef = useRef(isLightPage);

  // Synchronize activeNav and light background adaptation with RAF throttling
  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const ce = e as CustomEvent<{ isLight: boolean }>;
      if (ce.detail) {
        const val = Boolean(ce.detail.isLight);
        if (isLightRef.current !== val) {
          isLightRef.current = val;
          setIsLightBackground(val);
        }
      }
    };

    window.addEventListener("navbar-theme-change", handleThemeChange);

    if (pathname === "/gallery") {
      setActiveNav("gallery");
      activeNavRef.current = "gallery";
      setIsLightBackground(true);
      isLightRef.current = true;
      return () => {
        window.removeEventListener("navbar-theme-change", handleThemeChange);
      };
    }
    if (pathname === "/activities") {
      setActiveNav("timeline");
      activeNavRef.current = "timeline";
      setIsLightBackground(true);
      isLightRef.current = true;
      return () => {
        window.removeEventListener("navbar-theme-change", handleThemeChange);
      };
    }
    if (pathname === "/about") {
      setActiveNav("about");
      activeNavRef.current = "about";
      setIsLightBackground(false);
      isLightRef.current = false;
      return () => {
        window.removeEventListener("navbar-theme-change", handleThemeChange);
      };
    }

    let rafId: number | null = null;
    const lightSectionIds = [
      "not-found-container",
      "scene-roster",
      "scene-timeline",
      "scene-credits",
    ];

    const performScrollCheck = () => {
      rafId = null;

      if (document.getElementById("not-found-container")) {
        if (!isLightRef.current) {
          isLightRef.current = true;
          setIsLightBackground(true);
        }
        if (activeNavRef.current !== "") {
          activeNavRef.current = "";
          setActiveNav("");
        }
        return;
      }

      // 1. Scroll-spy active state determination
      const offset = 220;
      const galleryEl = document.getElementById("scene-gallery");
      const timelineEl = document.getElementById("scene-timeline");
      const rosterEl = document.getElementById("scene-roster");
      const exhibitionEl = document.getElementById("scene-exhibition");

      let nextNav = "home";
      if (galleryEl && galleryEl.getBoundingClientRect().top <= offset) {
        nextNav = "moments";
      } else if (timelineEl && timelineEl.getBoundingClientRect().top <= offset) {
        nextNav = "timeline";
      } else if (rosterEl && rosterEl.getBoundingClientRect().top <= offset) {
        nextNav = "about";
      } else if (exhibitionEl && exhibitionEl.getBoundingClientRect().top <= offset) {
        nextNav = "gallery";
      }

      if (activeNavRef.current !== nextNav) {
        activeNavRef.current = nextNav;
        setActiveNav(nextNav);
      }

      // 2. Automatic contrast adaptation
      const headerY = 90;
      let isOverLight = false;
      for (const id of lightSectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerY && rect.bottom >= headerY) {
            isOverLight = true;
            break;
          }
        }
      }
      if (isLightRef.current !== isOverLight) {
        isLightRef.current = isOverLight;
        setIsLightBackground(isOverLight);
      }
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(performScrollCheck);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    // Hook up to Lenis smooth scroller if active on window
    const lenis = (
      window as unknown as {
        __lenis?: {
          on: (event: string, callback: () => void) => void;
          off: (event: string, callback: () => void) => void;
        };
      }
    ).__lenis;

    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis && typeof lenis.off === "function") {
        lenis.off("scroll", handleScroll);
      }
    };
  }, [pathname]);

  // Handle cross-page hash anchor navigation (e.g. from /gallery to /#scene-about-showcase)
  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined") {
      const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      const isReload =
        navEntries.length > 0
          ? navEntries[0].type === "reload"
          : (performance as unknown as { navigation?: { type: number } }).navigation?.type === 1;

      // On page reload, strictly reset to top (0, 0) and strip anchor hash so it never gets stuck
      if (isReload) {
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
        return;
      }

      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace("#", "");
        let cleanTimer: NodeJS.Timeout | null = null;
        const navTimer = setTimeout(() => {
          const y = getTargetScrollY(targetId);
          if (y !== null) {
            const lenis = (
              window as unknown as {
                __lenis?: {
                  scrollTo: (
                    target: number,
                    options?: { duration?: number }
                  ) => void;
                };
              }
            ).__lenis;

            if (lenis && typeof lenis.scrollTo === "function") {
              lenis.scrollTo(y, { duration: 1.2 });
            } else {
              window.scrollTo({ top: y, behavior: "smooth" });
            }

            // Clean hash once reached so subsequent refreshes start cleanly at top
            cleanTimer = setTimeout(() => {
              if (window.location.hash) {
                window.history.replaceState(null, "", window.location.pathname);
              }
            }, 1400);
          }
        }, 120);

        return () => {
          clearTimeout(navTimer);
          if (cleanTimer) clearTimeout(cleanTimer);
        };
      }
    }
  }, [pathname]);

  // Smooth scroll handler & full page route transition
  const handleNavClick = useCallback(
    (item: NavItem, e?: React.MouseEvent) => {
      if (e) e.preventDefault();
      if (typeof window === "undefined") return;

      // If we are on /gallery or other subpages, navigate back to home target
      if (pathname !== "/") {
        router.push(item.href);
        return;
      }

      // If on homepage:
      const lenis = (
        window as unknown as {
          __lenis?: {
            scrollTo: (
              target: number,
              options?: { duration?: number }
            ) => void;
          };
        }
      ).__lenis;

      if (item.id === "home" || item.targetId === "exhibition-scroll-track") {
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.6 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      if (item.targetId) {
        const y = getTargetScrollY(item.targetId);
        if (y !== null) {
          if (lenis) {
            lenis.scrollTo(y, { duration: 1.4 });
          } else {
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }
      }
    },
    [pathname, router]
  );

  // Home return button handler for the ShutterScape logo
  const handleHomeClick = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.preventDefault();
      if (typeof window === "undefined") return;

      if (pathname !== "/") {
        router.push("/");
        return;
      }

      const lenis = (
        window as unknown as {
          __lenis?: {
            scrollTo: (
              target: HTMLElement | number | string,
              options?: { offset?: number; duration?: number }
            ) => void;
          };
        }
      ).__lenis;

      if (lenis) {
        lenis.scrollTo(0, { duration: 1.6 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [pathname, router]
  );



  // Pure adaptive coloring properties
  const textColor = isLightBackground ? "#050505" : "#FFFFFF";
  const mutedTextColor = isLightBackground ? "rgba(5, 5, 5, 0.45)" : "rgba(255, 255, 255, 0.45)";
  const dividerColor = isLightBackground ? "rgba(5, 5, 5, 0.2)" : "rgba(255, 255, 255, 0.2)";
  const activeGoldColor = isLightBackground ? "#B4831B" : "#D4A843";

  // Completely omit public navigation on all administrative dashboard routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`fixed ${
        pathname === "/activities"
          ? "top-2 sm:top-3 md:top-4"
          : "top-2 sm:top-3 md:top-4 lg:top-5"
      } w-full z-[9980] pointer-events-none select-none flex justify-center`}
      role="banner"
      aria-label="Global Viewfinder Navigation"
    >
      {/* The shadow dynamically applies in dark environments and lifts cleanly in white environments */}
      <div
        className="relative flex flex-wrap md:flex-nowrap items-center justify-between w-full max-w-7xl gap-y-1 gap-x-2 sm:gap-4 md:gap-6 px-4 sm:px-6 pointer-events-auto transition-all duration-500"
        style={{
          filter: isLightBackground
            ? "none"
            : "drop-shadow(0 4px 12px rgba(0,0,0,0.85)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
        }}
      >
        
        {/* ============================================================
            LEFT SIDE: SHUTTERSCAPE LOGO + REC (Home Return Button)
            ============================================================ */}
        <div className="order-1 md:order-1 md:flex-1 flex items-center justify-start gap-2 sm:gap-4 md:gap-6 shrink-0 z-10">
          <button
            type="button"
            onClick={handleHomeClick}
            className="group relative flex items-center shrink-0 cursor-pointer min-h-[44px] min-w-[44px] transition-transform duration-500 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-[#D4A843]"
            title="ShutterScape Logo"
            aria-label="ShutterScape Home"
          >
            <div
              className="relative h-6 w-[70px] sm:h-8 sm:w-[100px] md:h-[42px] md:w-[150px] transition-all duration-500"
              style={{
                filter: isLightBackground
                  ? "brightness(0)"
                  : "none",
              }}
            >
              <Image
                src="/images/shutterscape-brand-white.png"
                alt="ShutterScape Logo"
                fill
                sizes="(max-width: 640px) 85px, (max-width: 768px) 120px, 150px"
                priority
                unoptimized
                className="object-contain"
              />
            </div>
          </button>

          {/* Viewfinder REC indicator */}
          <div
            className="hidden xl:flex items-center gap-4 font-mono text-[10px] tracking-[0.25em] uppercase font-bold opacity-90 transition-colors duration-500"
            style={{ color: textColor }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#EF4444] animate-pulse" />
              <span>REC</span>
            </div>
            <span
              className="h-6 w-[1px] transition-colors duration-500"
              style={{ backgroundColor: dividerColor }}
            />
          </div>
        </div>

        {/* ============================================================
            CENTER: NAVIGATION ITEMS (HOME // GALLERY // ABOUT // ACTIVITY // MOMENTS) - DEAD CENTER
            ============================================================ */}
        <nav
          className="order-3 md:order-2 md:absolute md:left-1/2 md:-translate-x-1/2 w-full md:w-auto flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 shrink-0 mt-0.5 sm:mt-1 md:mt-0 z-20"
          aria-label="Primary Navigation"
        >
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeNav === item.id;

            return (
              <React.Fragment key={item.id}>
                <button
                  type="button"
                  onClick={(e) => handleNavClick(item, e)}
                  aria-current={isActive ? "page" : undefined}
                  className="group relative flex flex-col items-center justify-center font-mono text-[9px] sm:text-[10px] md:text-[11px] lg:text-[11.5px] uppercase tracking-[0.14em] sm:tracking-[0.18em] font-bold transition-colors duration-300 cursor-pointer min-h-[34px] sm:min-h-[38px] px-1 sm:px-1.5 md:px-2 py-1 touch-manipulation focus-visible:outline-2 focus-visible:outline-[#D4A843]"
                  style={{
                    color: isActive ? activeGoldColor : textColor,
                    opacity: isActive ? 1 : 0.75,
                  }}
                >
                  <span>{item.title}</span>

                  {/* Sharp Gold Underline for Active/Hover State */}
                  <span
                    className={`absolute bottom-0.5 w-full h-[1.5px] transition-transform duration-500 ease-out origin-center ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    style={{ backgroundColor: activeGoldColor }}
                  />
                </button>

                {/* Technical Slash Separators */}
                {index < NAV_ITEMS.length - 1 && (
                  <span
                    className="font-mono text-[8px] sm:text-[9px] md:text-[10px] pointer-events-none select-none transition-colors duration-500 opacity-45"
                    style={{ color: mutedTextColor }}
                  >
                    //
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* ============================================================
            RIGHT SIDE: GCU LOGO
            ============================================================ */}
        <div className="order-2 md:order-3 md:flex-1 flex items-center justify-end gap-2 sm:gap-4 md:gap-6 shrink-0 z-10">
          <a
            href="https://gcu.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center shrink-0 min-h-[44px] min-w-[44px] transition-transform duration-500 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-[#D4A843]"
            title="Girijananda Chowdhury University"
            aria-label="Girijananda Chowdhury University"
          >
            <div
              className="relative h-6 w-[82px] sm:h-8 sm:w-[115px] md:h-[40px] md:w-[175px] transition-all duration-500"
            >
              <Image
                src={
                  isLightBackground
                    ? "/images/gcu-logo-black-text.png"
                    : "/images/gcu-logo-white-text.png"
                }
                alt="GCU Logo"
                fill
                sizes="(max-width: 640px) 130px, (max-width: 768px) 150px, 175px"
                priority
                unoptimized
                className="object-contain"
              />
            </div>
          </a>
        </div>

      </div>
    </header>
  );
}
