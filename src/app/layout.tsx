
import GlobalMusicPlayer from "@/components/cinematic/GlobalMusicPlayer";
import GlobalBranding from "@/components/cinematic/GlobalBranding";
import CameraShutterLoader from "@/components/cinematic/CameraShutterLoader";
import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Sora,
  Inter,
  Space_Mono,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShutterScape | GCU Photography Club",
  description:
    "ShutterScape is the official photography club of Girijananda Chowdhury University. Observe, capture, and tell stories through photographs.",
};

export const viewport: Viewport = {
  themeColor: "#030303",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${sora.variable} ${inter.variable} ${spaceMono.variable} bg-[#030303] text-[#FAFAFA]`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                var nav = performance.getEntriesByType('navigation');
                var isReload = nav && nav.length > 0 ? nav[0].type === 'reload' : false;
                if (isReload) {
                  if (window.location.hash) {
                    history.replaceState(null, '', window.location.pathname);
                  }
                  window.scrollTo(0, 0);
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-body antialiased bg-[#030303] text-[#FAFAFA]"
      >
        {/* Camera shutter & flash loading transition */}
        <CameraShutterLoader />

        {/* Global branding header (ShutterScape & GCU) */}
        <GlobalBranding />

        {/* Global background music player */}
        <GlobalMusicPlayer />

        {/* Website pages and scenes */}
        {children}
      </body>
    </html>
  );
}
