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
  { id: "gallery", title: "GALLERY", targetId: "scene-exhibition", href: "/gallery" },
  { id: "about", title: "ABOUT", targetId: "scene-about-showcase", href: "/about" },
  { id: "timeline", title: "ACTIVITY", targetId: "scene-activity-showcase", href: "/activities" },
  { id: "moments", title: "MOMENTS", targetId: "scene-gallery", href: "/#scene-gallery" },
];

function getTargetScrollY(targetId: string): number | null {
  if (typeof window === "undefined") return null;
  const vh = window.innerHeight;
  if (targetId === "home" || targetId === "exhibition-scroll-track") return 0;

  const isMobile = window.innerWidth < 1024;
  if (isMobile) {
    let mobileTargetId = targetId;
    if (targetId === "scene-exhibition") mobileTargetId = "mobile-dark-showcase";
    else if (targetId === "scene-about-showcase" || targetId === "scene-roster") mobileTargetId = "mobile-light-about-section";
    else if (targetId === "scene-activity-showcase" || targetId === "scene-timeline") mobileTargetId = "mobile-chronology-matrix";
    else if (targetId === "scene-gallery" || targetId === "moments") mobileTargetId = "mobile-chronology-matrix";

    const el = document.getElementById(mobileTargetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      return Math.max(0, Math.round(rect.top + scrollTop - 70));
    }
    return 0;
  }

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

const FLOATING_NAV_ITEMS = [
  { id: "home", label: "Home", href: "/" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "about", label: "About", href: "/about" },
  { id: "timeline", label: "Activity", href: "/activities" },
  { id: "moments", label: "Moments", href: "/#scene-gallery" },
];

function renderFloatingNavIcon(id: string, isActive: boolean) {
  const strokeColor = isActive ? "#FFFFFF" : "#64748B";
  switch (id) {
    case "home":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10.5L12 3l9 7.5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z" />
          <circle cx="12" cy="14" r="2.5" />
        </svg>
      );
    case "gallery":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "about":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3z" />
          <path d="M18 4l.8 2.2L21 7l-2.2.8L18 10l-.8-2.2L15 7l2.2-.8L18 4z" />
        </svg>
      );
    case "timeline":
    case "activity":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 11 11 14 14 22 22 3" />
        </svg>
      );
    case "moments":
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      );
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
      : pathname === "/about"
      ? "about"
      : "home"
  );
  const [isLightBackground, setIsLightBackground] = useState(isLightPage);
  const activeNavRef = useRef(
    pathname === "/activities"
      ? "timeline"
      : pathname === "/gallery"
      ? "gallery"
      : pathname === "/about"
      ? "about"
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
      "shutterscape-universal-footer",
      "mobile-light-spec-section",
      "mobile-light-bento-section",
      "mobile-light-about-section",
      "mobile-chronology-matrix",
    ];

    let lastCheckedY = -999;
    const performScrollCheck = () => {
      rafId = null;
      const curY = window.scrollY || document.documentElement.scrollTop;
      if (Math.abs(curY - lastCheckedY) < 12) return;
      lastCheckedY = curY;

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

      // 1. Scroll-spy active state determination (Desktop & Mobile)
      const offset = 220;
      const isMobile = window.innerWidth < 1024;
      let nextNav = "home";

      if (isMobile) {
        const momentsEl = document.getElementById("mobile-chronology-matrix");
        const aboutEl = document.getElementById("mobile-light-about-section");
        const showcaseEl = document.getElementById("mobile-dark-showcase");

        if (momentsEl && momentsEl.getBoundingClientRect().top <= offset) {
          nextNav = "moments";
        } else if (aboutEl && aboutEl.getBoundingClientRect().top <= offset) {
          nextNav = "about";
        } else if (showcaseEl && showcaseEl.getBoundingClientRect().top <= offset) {
          nextNav = "gallery";
        }
      } else {
        const galleryEl = document.getElementById("scene-gallery");
        const timelineEl = document.getElementById("scene-timeline");
        const rosterEl = document.getElementById("scene-roster");
        const exhibitionEl = document.getElementById("scene-exhibition");

        if (galleryEl && galleryEl.getBoundingClientRect().top <= offset) {
          nextNav = "moments";
        } else if (timelineEl && timelineEl.getBoundingClientRect().top <= offset) {
          nextNav = "timeline";
        } else if (rosterEl && rosterEl.getBoundingClientRect().top <= offset) {
          nextNav = "about";
        } else if (exhibitionEl && exhibitionEl.getBoundingClientRect().top <= offset) {
          nextNav = "gallery";
        }
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
        if (el && el.offsetParent !== null) {
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

      // 1. If on any subpage (/about, /gallery, /activities, etc.):
      if (pathname !== "/") {
        // If clicking the current page's button, smooth scroll to top
        if (pathname === item.href) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        // Navigate cleanly to the destination page without bouncing through home
        router.push(item.href);
        return;
      }

      // 2. If on homepage (pathname === "/"):
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

  // Calculate SVG Concave Liquid Notch coordinate for Mobile Subpages
  const activeFloatingIndex = Math.max(
    0,
    FLOATING_NAV_ITEMS.findIndex((it) => it.id === activeNav)
  );
  const notchCenterX = 36 + activeFloatingIndex * 72;
  const floatingNavSvgPath = `
    M 30 0
    L ${notchCenterX - 36} 0
    C ${notchCenterX - 24} 0, ${notchCenterX - 23} 28, ${notchCenterX} 28
    C ${notchCenterX + 23} 28, ${notchCenterX + 24} 0, ${notchCenterX + 36} 0
    L 330 0
    A 30 30 0 0 1 360 30
    L 360 36
    A 30 30 0 0 1 330 66
    L 30 66
    A 30 30 0 0 1 0 36
    L 0 30
    A 30 30 0 0 1 30 0
    Z
  `;

  return (
    <>
      <header
        className={`fixed ${
          pathname === "/activities"
            ? "top-2 sm:top-3 md:top-4"
            : "top-2 sm:top-3 md:top-4 lg:top-5"
        } ${pathname === "/" ? "hidden lg:flex" : "flex"} w-full z-[9980] pointer-events-none select-none justify-center`}
        role="banner"
        aria-label="Global Viewfinder Navigation"
      >
        {/* The shadow dynamically applies in dark environments and lifts cleanly in white environments */}
        <div
          className="relative flex items-center justify-center max-w-fit mx-auto gap-2 sm:gap-3 md:gap-5 lg:gap-6 px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 pointer-events-auto transition-all duration-500"
          style={{
            filter: isLightBackground
              ? "none"
              : "drop-shadow(0 4px 12px rgba(0,0,0,0.85)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
          }}
        >
          {/* ============================================================
              LEFT: SHUTTERSCAPE LOGO + REC INDICATOR
              ============================================================ */}
          <div className="flex items-center justify-start gap-2 sm:gap-3 shrink-0 z-10">
            <button
              type="button"
              onClick={handleHomeClick}
              className="group relative flex items-center shrink-0 cursor-pointer min-h-[34px] sm:min-h-[38px] transition-transform duration-500 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-[#D4A843]"
              title="ShutterScape Logo"
              aria-label="ShutterScape Home"
            >
              <div
                className="relative h-5 w-[65px] sm:h-6 sm:w-[85px] md:h-7 md:w-[110px] transition-all duration-500"
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
                  sizes="(max-width: 640px) 75px, (max-width: 768px) 95px, 115px"
                  priority
                  unoptimized
                  className="object-contain"
                />
              </div>
            </button>

            {/* Viewfinder REC indicator */}
            <div
              className="hidden sm:flex items-center gap-2 sm:gap-2.5 font-mono text-[8.5px] md:text-[9px] tracking-[0.22em] uppercase font-bold opacity-90 transition-colors duration-500"
              style={{ color: textColor }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444] animate-pulse" />
                <span>REC</span>
              </div>
              <span
                className="h-3.5 w-[1px] transition-colors duration-500"
                style={{ backgroundColor: dividerColor }}
              />
            </div>
          </div>

          {/* ============================================================
              NAVIGATION ITEMS: HOME // GALLERY // ABOUT // ACTIVITY // MOMENTS
              (Hidden on mobile < 1024px to prevent duplicating the Modern Floating Navbar)
              ============================================================ */}
          <nav
            className="hidden lg:flex items-center justify-center gap-1 sm:gap-2 md:gap-2.5 lg:gap-3.5 shrink-0 z-20 overflow-x-auto no-scrollbar"
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
                    className="group relative flex flex-col items-center justify-center font-mono text-[8.5px] sm:text-[9.5px] md:text-[11px] lg:text-[11.5px] uppercase tracking-[0.14em] sm:tracking-[0.18em] font-bold transition-colors duration-300 cursor-pointer min-h-[32px] sm:min-h-[38px] px-1 sm:px-1.5 md:px-2 py-1 touch-manipulation focus-visible:outline-2 focus-visible:outline-[#D4A843]"
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
                      className="font-mono text-[7.5px] sm:text-[8.5px] md:text-[10px] pointer-events-none select-none transition-colors duration-500 opacity-45"
                      style={{ color: mutedTextColor }}
                    >
                      //
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Modern Floating Liquid-Notch Navbar for Mobile Subpages (Gallery, About, Activities) */}
      {pathname !== "/" && (
        <nav
          aria-label="Mobile Floating Navigation"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9985] w-[92vw] max-w-[375px] h-[66px] select-none pointer-events-auto lg:hidden"
        >
          {/* Carved SVG Pill with Smooth Concave Liquid Notch */}
          <svg
            viewBox="0 0 360 66"
            preserveAspectRatio="none"
            className="w-full h-full drop-shadow-[0_18px_38px_rgba(0,0,0,0.45)] overflow-visible"
          >
            <path
              d={floatingNavSvgPath}
              fill="#0A0A0D"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
              style={{ transition: "d 0.38s cubic-bezier(0.22, 1, 0.36, 1)" }}
            />
          </svg>

          {/* Elevated Circular Active Icon Button */}
          <div
            style={{
              left: `${(activeFloatingIndex + 0.5) * 20}%`,
              top: "-18px",
              width: "44px",
              height: "44px",
              transition: "left 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="absolute -translate-x-1/2 rounded-full bg-[#0A0A0D] border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.55)] flex items-center justify-center pointer-events-none z-20"
          >
            {renderFloatingNavIcon(activeNav, true)}
          </div>

          {/* 5 Interactive Tab Columns */}
          <div className="absolute inset-0 grid grid-cols-5 items-center z-10">
            {FLOATING_NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => router.push(item.href)}
                  className="relative h-full w-full flex flex-col items-center justify-center cursor-pointer bg-transparent border-0 outline-none"
                >
                  <span
                    style={{
                      transform: isActive ? "translateY(-14px) scale(0.5)" : "translateY(-2px) scale(1)",
                      opacity: isActive ? 0 : 0.65,
                      transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                    className="flex items-center justify-center"
                  >
                    {renderFloatingNavIcon(item.id, false)}
                  </span>
                  <span
                    style={{
                      marginTop: isActive ? "16px" : "4px",
                      transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                    className={`font-sans text-[11px] tracking-[0.01em] leading-none ${
                      isActive ? "text-white font-semibold" : "text-[#64748B] font-normal"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
