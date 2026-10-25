
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function GlobalMusicPlayer() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    let disposed = false;
    let attemptInProgress = false;
    let lastPlayAttempt = 0;
    let touchStartY: number | null = null;

    const startMusic = () => {
      const now = Date.now();
      if (disposed || !audio.paused || attemptInProgress || now - lastPlayAttempt < 1200) return;

      lastPlayAttempt = now;
      attemptInProgress = true;
      audio.muted = false;

      // Call play directly inside the user gesture handler.
      audio.play()
        .then(() => {
          if (disposed) return;

          setIsPlaying(true);
          removeScrollListeners();
        })
        .catch(() => {
          // Keep listening and retry on the next real scroll gesture after cooldown.
          attemptInProgress = false;
          setIsPlaying(false);
        });
    };

    const handleWheel = (event: WheelEvent) => {
      // Ignore tiny trackpad noise.
      if (Math.abs(event.deltaY) > 1) {
        startMusic();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartY === null || !event.touches[0]) return;

      const currentY = event.touches[0].clientY;

      // Start only after meaningful finger movement.
      if (Math.abs(currentY - touchStartY) >= 6) {
        startMusic();
      }
    };

    const handleTouchEnd = () => {
      touchStartY = null;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      // Do not mistake interactions with controls for page scrolling.
      if (
        target?.closest(
          "button, a, input, textarea, select, [contenteditable='true']"
        )
      ) {
        return;
      }

      const scrollKeys = [
        "ArrowDown",
        "ArrowUp",
        "PageDown",
        "PageUp",
        " ",
        "Spacebar",
        "Home",
        "End",
      ];

      if (scrollKeys.includes(event.key)) {
        startMusic();
      }
    };

    const removeScrollListeners = () => {
      window.removeEventListener("wheel", handleWheel, true);
      window.removeEventListener("touchstart", handleTouchStart, true);
      window.removeEventListener("touchmove", handleTouchMove, true);
      window.removeEventListener("touchend", handleTouchEnd, true);
      window.removeEventListener("keydown", handleKeyDown, true);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Listen for genuine scrolling gestures.
    window.addEventListener("wheel", handleWheel, {
      passive: true,
      capture: true,
    });

    window.addEventListener("touchstart", handleTouchStart, {
      passive: true,
      capture: true,
    });

    window.addEventListener("touchmove", handleTouchMove, {
      passive: true,
      capture: true,
    });

    window.addEventListener("touchend", handleTouchEnd, true);
    window.addEventListener("keydown", handleKeyDown, true);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      disposed = true;
      removeScrollListeners();

      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        audio.muted = false;
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Unable to play background music:", error);
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/background-music.mp3"
        loop
        preload="none"
      />

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Turn music off" : "Turn music on"}
        title={isPlaying ? "Turn music off" : "Turn music on"}
        className="fixed bottom-4 sm:bottom-6 left-4 sm:left-16 z-[9999] flex h-11 w-11 min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-full border border-[#D4A843]/50 bg-[#080808]/90 text-[#D4A843] shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#D4A843] hover:bg-[#D4A843] hover:text-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 5 6 9H3v6h3l5 4z" />

          {isPlaying ? (
            <>
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M19 5a10 10 0 0 1 0 14" />
            </>
          ) : (
            <>
              <path d="m16 9 5 6" />
              <path d="m21 9-5 6" />
            </>
          )}
        </svg>
      </button>
    </>
  );
}
