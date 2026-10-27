// src/config/mobileHeroMedia.ts
/**
 * Configuration for the Mobile Hero Opening Section Background Video
 *
 * HOW TO ADD YOUR VIDEO:
 * ----------------------------------------------------
 * Option 1 (Local file - Recommended):
 * Drop or replace your .mp4 video file at:
 * `public/videos/mobile-hero-background.mp4`
 *
 * Option 2 (External URL or custom path):
 * Change `videoSrc` below to any external video URL (e.g. Cloudinary, AWS S3, Vercel Blob)
 * or any path inside the `public/` directory.
 */

export interface MobileHeroMediaConfig {
  /** Video file path or URL for the mobile hero background */
  videoSrc: string;
  /** Fallback poster image displayed while loading or if video fails to load */
  posterSrc: string;
  /** Whether the video starts muted (required for autoPlay on mobile browsers) */
  defaultMuted: boolean;
  /** Optional sound toggle button on the hero */
  showAudioToggle: boolean;
}

export const MOBILE_HERO_MEDIA: MobileHeroMediaConfig = {
  // Path to your hero background video file
  videoSrc: "/videos/mobile-hero-background.mp4",

  // Poster fallback image (Campus vista)
  posterSrc: "/images/gcu-campus-anime.jpg",

  // Muted required by Safari/Chrome mobile for autoplay
  defaultMuted: true,

  // Shows an optional tap-for-sound pill in the bottom corner of the hero
  showAudioToggle: true,
};
