// src/app/api/spotlight/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Spotlight } from "@/models/Spotlight";

// In-memory fallback store
const defaultSpotlightStore = {
  upcoming: {
    id: "SPOT-UPCOMING-01",
    title: "Brahmaputra Heritage Photowalk 4.0",
    category: "PHOTOWALK",
    date: "NOV 14, 2026",
    targetDate: new Date(
      Date.now() + (14 * 86400 + 6 * 3600 + 45 * 60) * 1000
    ).toISOString(),
    location: "Riverfront, Guwahati",
    filmStock: "KODAK PORTRA 400",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=75",
    description:
      "Golden-hour riverfront expedition capturing ferry silhouettes, heritage ghats, and twilight reflections with live framing critiques.",
    ctaText: "JOIN UPCOMING EVENT",
    isActive: true,
  },
  live: {
    id: "SPOT-LIVE-01",
    title: "Campus Nocturnes & Strobe Light Lab",
    category: "LIVE WORKSHOP",
    date: "HAPPENING NOW",
    targetDate: new Date(
      Date.now() + (4 * 3600 + 38 * 60 + 25) * 1000
    ).toISOString(),
    location: "GCU Media Lab, Azara",
    filmStock: "GODEX AD600 PRO · 35MM",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=75",
    description:
      "Live hands-on studio session exploring high-speed Xenon flash choreography, Chiaroscuro portrait lighting, and manual optics.",
    ctaText: "JOIN LIVE SESSION NOW",
    isActive: true,
  },
};

const globalForSpotlight = globalThis as unknown as {
  __shutterSpotlightStore?: typeof defaultSpotlightStore;
};

if (!globalForSpotlight.__shutterSpotlightStore) {
  globalForSpotlight.__shutterSpotlightStore = defaultSpotlightStore;
}

export async function GET() {
  try {
    const conn = await connectDB();
    if (conn) {
      const doc = await Spotlight.findOne().sort({ updatedAt: -1 });
      if (doc) {
        return NextResponse.json({
          success: true,
          data: {
            upcoming: doc.upcoming,
            live: doc.live,
          },
          source: "database",
        });
      }
    }
  } catch (err) {
    console.warn("MongoDB spotlight fetch error, using in-memory store:", err);
  }

  return NextResponse.json({
    success: true,
    data: globalForSpotlight.__shutterSpotlightStore || defaultSpotlightStore,
    source: "memory",
  });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const current =
      globalForSpotlight.__shutterSpotlightStore || defaultSpotlightStore;

    const updated = {
      upcoming: body.upcoming
        ? { ...current.upcoming, ...body.upcoming }
        : current.upcoming,
      live: body.live ? { ...current.live, ...body.live } : current.live,
    };

    globalForSpotlight.__shutterSpotlightStore = updated;

    try {
      const conn = await connectDB();
      if (conn) {
        await Spotlight.findOneAndUpdate(
          {},
          { upcoming: updated.upcoming, live: updated.live },
          { upsert: true, new: true }
        );
      }
    } catch (dbErr) {
      console.warn("Could not persist spotlight to MongoDB, saved to memory:", dbErr);
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to update spotlight" },
      { status: 400 }
    );
  }
}

export async function POST(req: Request) {
  return PUT(req);
}
