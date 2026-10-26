"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

export interface ReelItem {
  id: string;
  photographer: string;
  videoSrc: string;
}

// 6 High-Quality Local Portrait Videos that Autoplay Instantly
const REELS: ReelItem[] = [
  {
    id: "01",
    photographer: "World Photography Day",
    videoSrc: "/api/media/6adf475c3c63e8ae4ff0a9d4",
  },
  {
    id: "02",
    photographer: "Glimpse of Grooming Club’s Ramp Walk",
    videoSrc: "/api/media/6ade6c0a40346d3181c85f3a",
  },
  {
    id: "03",
    photographer: "Wall Painting",
    videoSrc: "/api/media/6adf48963c63e8ae4ff0a9d7",
  },
  {
    id: "04",
    photographer: "Photography Workshop ",
    videoSrc: "/api/media/6adf48cd3c63e8ae4ff0a9d8",
  },
  {
    id: "05",
    photographer: "A New Beginning",
    videoSrc: "/api/media/6adf48403c63e8ae4ff0a9d6",
  },
  {
    id: "06",
    photographer: "Magic of Filmmaking",
    videoSrc: "/api/media/6adf47e63c63e8ae4ff0a9d5",
  },
];

export interface FramesOfMomentsProps {
  initialReels?: ReelItem[];
}

export default function FramesOfMoments({ initialReels }: FramesOfMomentsProps = {}) {
  const [reels, setReels] = useState<ReelItem[]>(
    initialReels && initialReels.length > 0 ? initialReels : REELS
  );

  useEffect(() => {
    fetch("/api/moments-reels")
      .then((r) => r.json())
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setReels(
            res.data.map((d: any, idx: number) => {
              const defaultReel = REELS[idx % REELS.length];
              const validVideoSrc =
                d.videoSrc && !d.videoSrc.startsWith("blob:")
                  ? d.videoSrc
                  : defaultReel.videoSrc;
              return {
                id: d._id || String(idx + 1).padStart(2, "0"),
                photographer: d.photographer || defaultReel.photographer,
                videoSrc: validVideoSrc,
              };
            })
          );
        }
      })
      .catch(() => {});
  }, []);

  const reelsList = reels;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartXRef = useRef<number>(0);
  const dragStartXRef = useRef<number>(0);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // ============================================================
  // FORCE ALL VIDEOS TO AUTOPLAY SIMULTANEOUSLY
  // ============================================================
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        video.playsInline = true;
        video.play().catch(() => {});
      }
    });
  }, []);

  // ============================================================
  // AUTO-PLAY AND SYNCHRONIZE ACTIVE VIDEO ON CHANGE
  // ============================================================
  useEffect(() => {
    // When activeIndex changes, restart the active center video from 0s
    const activeVid = videoRefs.current[activeIndex];
    if (activeVid) {
      activeVid.currentTime = 0;
      activeVid.play().catch(() => {});
    }

    // Ensure all videos keep playing simultaneously
    videoRefs.current.forEach((vid) => {
      if (vid) {
        vid.play().catch(() => {});
      }
    });
  }, [activeIndex]);

  // ============================================================
  // AUTO-CHANGE TO NEXT VIDEO WHEN ACTIVE VIDEO FINISHES
  // ============================================================
  const handleVideoEnded = (index: number) => {
    if (index === activeIndex && !isPaused) {
      setActiveIndex((prev) => (prev + 1) % reelsList.length);
    }
  };

  // ============================================================
  // MATHEMATICALLY FLAWLESS 3D CENTERED CAROUSEL
  // ============================================================
  const getCardStyle = (index: number) => {
    const total = reelsList.length;
    let relativeIndex = index - activeIndex;

    // Smooth circular wrapping
    if (relativeIndex > total / 2) relativeIndex -= total;
    if (relativeIndex < -total / 2) relativeIndex += total;

    let translateX = 0;
    let scale = 1;
    let zIndex = 40;
    let opacity = 1;
    let rotateY = 0;
    let filter = "none";

    if (relativeIndex === 0) {
      // CENTER ACTIVE CARD: Exactly in center, sharpest focus
      translateX = 0;
      scale = 1;
      zIndex = 50;
      opacity = 1;
      rotateY = 0;
      filter = "none";
    } else if (relativeIndex === 1) {
      // RIGHT CARD: Offset to right, visible 3-card showcase
      translateX = isMobile ? 88 : 108;
      scale = isMobile ? 0.88 : 0.90;
      zIndex = 35;
      opacity = 0.85;
      rotateY = -6;
      filter = "brightness(0.85)";
    } else if (relativeIndex === -1) {
      // LEFT CARD: Offset to left, visible 3-card showcase
      translateX = isMobile ? -88 : -108;
      scale = isMobile ? 0.88 : 0.90;
      zIndex = 35;
      opacity = 0.85;
      rotateY = 6;
      filter = "brightness(0.85)";
    } else if (relativeIndex === 2) {
      // FAR RIGHT: Pre-staged out of view for smooth entry
      translateX = isMobile ? 165 : 210;
      scale = 0.75;
      zIndex = 20;
      opacity = 0;
      rotateY = -12;
      filter = "brightness(0.5)";
    } else if (relativeIndex === -2) {
      // FAR LEFT: Pre-staged out of view for smooth entry
      translateX = isMobile ? -165 : -210;
      scale = 0.75;
      zIndex = 20;
      opacity = 0;
      rotateY = 12;
      filter = "brightness(0.5)";
    } else {
      // HIDDEN REELS
      translateX = 0;
      scale = 0.6;
      zIndex = 10;
      opacity = 0;
    }

    return {
      transform: `translate(-50%, -50%) translateX(${translateX}%) scale(${scale}) perspective(1200px) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      filter,
    };
  };

  // ============================================================
  // INTERACTION (CLICK / TAP TO CENTER / UNMUTE)
  // ============================================================
  const handleCardClick = (id: string, index: number) => {
    if (index === activeIndex) {
      // Toggle audio on active center card
      if (activeAudioId === id) {
        setActiveAudioId(null);
        if (videoRefs.current[index]) videoRefs.current[index]!.muted = true;
      } else {
        setActiveAudioId(id);
        videoRefs.current.forEach((video, i) => {
          if (video) video.muted = i !== index;
        });
      }
    } else {
      // Slide clicked side card into center focus
      setActiveIndex(index);
      setActiveAudioId(null);
      videoRefs.current.forEach((video) => {
        if (video) video.muted = true;
      });
    }
  };

  // Touch & Swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % reelsList.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + reelsList.length) % reelsList.length);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartXRef.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const diff = dragStartXRef.current - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % reelsList.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + reelsList.length) % reelsList.length);
      }
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center overflow-hidden selection:bg-[#EF4444] selection:text-white pt-[160px] pb-8 md:pt-[195px] md:pb-12">
      {/* Dancing Script Font & Sound Wave Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        .font-script { font-family: 'Dancing Script', cursive; }
        
        .sound-wave {
          display: flex;
          align-items: center;
          gap: 2px;
          height: 12px;
        }
        .sound-wave span {
          display: block;
          width: 2px;
          background: #FAFAFA;
          border-radius: 2px;
          animation: wave 1s ease-in-out infinite;
        }
        .sound-wave span:nth-child(1) { animation-delay: 0.0s; height: 40%; }
        .sound-wave span:nth-child(2) { animation-delay: 0.2s; height: 100%; }
        .sound-wave span:nth-child(3) { animation-delay: 0.4s; height: 60%; }
        @keyframes wave { 50% { height: 20%; } }
      `,
        }}
      />

      {/* Subtle Background Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 w-full max-w-[1700px] mx-auto flex flex-col items-center gap-4 md:gap-5 px-4 sm:px-8 md:px-12">
        {/* ============================================================
            BEAUTIFULLY CENTERED HEADER: RED TITLE & CLEAN FRAMELESS CTA
            ============================================================ */}
        <div className="flex flex-col items-center justify-center text-center px-4 gap-2 w-full max-w-2xl mx-auto">
          <h2 className="font-script text-6xl sm:text-7xl lg:text-[88px] font-bold tracking-normal leading-[0.9]">
            <span className="text-white drop-shadow-sm">Frames in </span>
            <span className="text-[#EF4444] drop-shadow-[0_0_35px_rgba(239,68,68,0.4)]">Motion</span>
          </h2>
          <p className="font-sans text-[13px] md:text-base text-gray-400 font-medium tracking-wide">
            Moments in motion — from the club and its members.
          </p>
          <div className="pt-1">
            <Link
              href="/gallery"
              className="group inline-flex items-center justify-center gap-2 font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-200"
            >
              <span>SEE MORE</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 text-[#EF4444]">→</span>
            </Link>
          </div>
        </div>

        {/* ============================================================
            MATHEMATICALLY CENTERED 3-CARD CAROUSEL (EXACT SCREENSHOT 2)
            Cards are tall and immersive (64vh), completely filling the lower void.
            ============================================================ */}
        <div
          className="relative w-full h-[62vh] min-h-[460px] max-h-[660px] flex items-center justify-center overflow-hidden my-1"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            const activeVid = videoRefs.current[activeIndex];
            if (activeVid && activeVid.ended) {
              setActiveIndex((prev) => (prev + 1) % reelsList.length);
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {reelsList.map((reel, index) => {
            const isActive = index === activeIndex;
            const isActiveAudio = activeAudioId === reel.id;

            return (
              <div
                key={reel.id}
                onClick={() => handleCardClick(reel.id, index)}
                className="absolute top-1/2 left-1/2 w-[76vw] sm:w-[300px] md:w-[340px] lg:w-[365px] aspect-[9/16] max-h-[61vh] rounded-[24px] md:rounded-[32px] overflow-hidden group bg-[#0A0A0D] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] cursor-pointer select-none"
                style={{
                  ...getCardStyle(index),
                  transition: "all 0.75s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {/* REAL AUTOPLAYING LOCAL MP4 VIDEO */}
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={reel.videoSrc}
                  autoPlay
                  loop={!isActive}
                  muted={activeAudioId !== reel.id}
                  playsInline
                  preload="auto"
                  onError={(e) => {
                    const video = e.currentTarget;
                    const fallback = `/videos/reel-${(index % 6) + 1}.mp4`;
                    if (video.src !== fallback) {
                      video.src = fallback;
                      video.play().catch(() => {});
                    }
                  }}
                  onTimeUpdate={(e) => {
                    const video = e.currentTarget;
                    if (video.duration && !isNaN(video.duration)) {
                      const pct = (video.currentTime / video.duration) * 100;
                      setProgressMap((prev) => ({ ...prev, [reel.id]: pct }));
                      // Seamless end detection
                      if (isActive && !isPaused && video.currentTime >= video.duration - 0.08) {
                        handleVideoEnded(index);
                      }
                    }
                  }}
                  onEnded={() => handleVideoEnded(index)}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* Dark Gradients for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25 opacity-85 pointer-events-none transition-opacity duration-500" />

                {/* Active Card Subtle Border Glow */}
                <div
                  className={`absolute inset-0 border-2 rounded-[24px] md:rounded-[32px] pointer-events-none transition-all duration-500 ${
                    isActive ? "border-white/30" : "border-transparent"
                  }`}
                />

                {/* Top Audio Indicator on Active Card */}
                {isActive && (
                  <div className="absolute top-5 right-5 z-10 pointer-events-none">
                    {isActiveAudio ? (
                      <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2 shadow-lg">
                        <div className="sound-wave">
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Author Badge & Name (Always Visible on Cards) */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 pointer-events-none transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-md shrink-0">
                    <span className="text-[#050505] font-sans font-bold text-[10px] tracking-wider">
                      {getInitials(reel.photographer)}
                    </span>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-sans font-semibold text-[13px] md:text-[14px] text-white drop-shadow-md truncate">
                      {reel.photographer}
                    </span>
                  </div>
                </div>

                {/* PROGRESSIVE TIMELINE BAR FOR EACH VIDEO */}
                <div className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-white/20 z-20 pointer-events-none overflow-hidden">
                  <div
                    className="h-full bg-[#EF4444] shadow-[0_0_10px_rgba(239,68,68,0.85)]"
                    style={{
                      width: `${progressMap[reel.id] || 0}%`,
                      transition: "width 0.12s linear",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================================
            FOOTER HINT
            ============================================================ */}
        <div className="text-center">
          <p className="font-sans text-[11px] md:text-[13px] text-white/40 font-medium tracking-wide">
            Tap a reel to watch it with sound
          </p>
        </div>
      </div>
    </section>
  );
}
