// src/app/page.tsx
"use client";

import DesktopOilstainExperience from "@/components/desktop/DesktopOilstainExperience";
import MobileOilstainExperience from "@/components/mobile/MobileOilstainExperience";

export default function Home() {
  return (
    <>
      {/* ============================================================
          DESKTOP EXPERIENCE (>= 1024px) - VISUAL & STRUCTURAL TWIN
          ============================================================ */}
      <div className="hidden lg:block">
        <DesktopOilstainExperience />
      </div>

      {/* ============================================================
          MOBILE EXPERIENCE (< 1024px) - 100% UNTOUCHED
          ============================================================ */}
      <div className="block lg:hidden">
        <MobileOilstainExperience />
      </div>
    </>
  );
}
