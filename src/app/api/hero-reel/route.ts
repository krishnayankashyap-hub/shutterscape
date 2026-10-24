// src/app/api/hero-reel/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { HeroReel } from "@/models/HeroReel";

// Static fallback data matching ApertureHero.tsx
const DEFAULT_HERO_REEL = [
  { frameCode: "01A", title: "SILENT PEAKS", src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=85", exif: "85MM · F/1.4 · ISO 200", order: 1 },
  { frameCode: "02B", title: "GOLDEN HORIZON", src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=85", exif: "35MM · F/2.0 · 1/1000S", order: 2 },
  { frameCode: "03C", title: "CANYON DRIFT", src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=85", exif: "50MM · F/1.8 · RAW", order: 3 },
  { frameCode: "04D", title: "MIST & LIGHT", src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=85", exif: "24MM · F/2.8 · GOLDEN HR", order: 4 },
  { frameCode: "05E", title: "URBAN SOLITUDE", src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=85", exif: "35MM · F/1.4 · NIGHT", order: 5 },
  { frameCode: "06F", title: "ALPINE CREST", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85", exif: "70MM · F/4.0 · DAWN", order: 6 },
];

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, data: DEFAULT_HERO_REEL, source: "fallback" });
    }

    const items = await HeroReel.find().sort({ order: 1 });
    if (!items || items.length === 0) {
      return NextResponse.json({ success: true, data: DEFAULT_HERO_REEL, source: "default" });
    }

    return NextResponse.json({ success: true, data: items, source: "database" });
  } catch (error) {
    console.error("GET /api/hero-reel error:", error);
    return NextResponse.json({ success: true, data: DEFAULT_HERO_REEL, source: "fallback" });
  }
}

export async function PUT(request: Request) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    const body = await request.json();
    const { items } = body;

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Items array is required" }, { status: 400 });
    }

    // Upsert or replace each frame
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      await HeroReel.findOneAndUpdate(
        { frameCode: it.frameCode },
        {
          frameCode: it.frameCode,
          title: it.title,
          src: it.src,
          exif: it.exif,
          order: i + 1,
        },
        { upsert: true, new: true }
      );
    }

    const updated = await HeroReel.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT /api/hero-reel error:", error);
    return NextResponse.json({ error: "Failed to update hero reel" }, { status: 500 });
  }
}
