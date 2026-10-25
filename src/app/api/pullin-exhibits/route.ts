// src/app/api/pullin-exhibits/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { PullInExhibit } from "@/models/PullInExhibit";

// Static fallback matching PullInScene.tsx
const DEFAULT_EXHIBITS = [
  { code: "EXHIBIT // 01A", title: "STREET & SHADOWS", subTitle: "Guwahati Dusk", src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=85", exif: "f/2.8 · 1/500s · 35mm · ISO 400", focusDistance: "35MM // 1.2M", headline: "Capturing raw light.", subhead: "Spontaneous moments frozen in urban twilight.", order: 1 },
  { code: "EXHIBIT // 02B", title: "BEHIND THE LENS", subTitle: "Human Portrait", src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=85", exif: "f/1.4 · 1/1000s · 85mm · ISO 160", focusDistance: "85MM // 2.4M", headline: "Telling silent stories.", subhead: "The human gaze captured through vintage prime glass.", order: 2 },
  { code: "EXHIBIT // 03C", title: "BRAHMAPUTRA MIST", subTitle: "Exhibition Landscape", src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=85", exif: "f/4.0 · 1/250s · 24mm · ISO 100", focusDistance: "24MM // 3.8M", headline: "Chasing golden hours.", subhead: "Ethereal atmospheric depth along the river banks.", order: 3 },
  { code: "EXHIBIT // 04D", title: "SILENT PEAKS", subTitle: "High Altitude", src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=85", exif: "f/2.0 · 1/2000s · 50mm · ISO 200", focusDistance: "50MM // 5.0M", headline: "Reaching the heights.", subhead: "Towering silhouettes piercing morning cloud cover.", order: 4 },
  { code: "EXHIBIT // 05E", title: "URBAN DRIFT", subTitle: "Street Monochrome", src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=85", exif: "f/1.8 · 1/250s · 35mm · ISO 800", focusDistance: "35MM // 2.0M", headline: "Observing city cadence.", subhead: "High-contrast shadows cutting across crowded transit hubs.", order: 5 },
  { code: "EXHIBIT // 06F", title: "ALPINE DAWN", subTitle: "Fine Art Landscape", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85", exif: "f/5.6 · 1/125s · 70mm · ISO 64", focusDistance: "70MM // ∞", headline: "Waiting for first warmth.", subhead: "The razor line between pitch darkness and violet dawn.", order: 6 },
  { code: "EXHIBIT // 07G", title: "RACK FOCUS CLINIC", subTitle: "Darkroom Studio", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85", exif: "f/1.4 · 1/800s · 85mm · ISO 100", focusDistance: "85MM // 1.5M", headline: "Isolating the emotion.", subhead: "Deliberate shallow depth turning urban clutter into velvet bokeh.", order: 7 },
  { code: "EXHIBIT // 08H", title: "MONOCHROME RIVERS", subTitle: "Archive Retrospective", src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=85", exif: "f/8.0 · 1/60s · 20mm · ISO 50", focusDistance: "20MM // 0.8M", headline: "Freezing living heritage.", subhead: "Archival silver gelatin prints documenting Assam's river lifeline.", order: 8 },
];

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, data: DEFAULT_EXHIBITS, source: "fallback" });
    }

    const items = await PullInExhibit.find().sort({ order: 1 });
    if (!items || items.length === 0) {
      return NextResponse.json({ success: true, data: DEFAULT_EXHIBITS, source: "default" });
    }

    return NextResponse.json({ success: true, data: items, source: "database" });
  } catch (error) {
    console.error("GET /api/pullin-exhibits error:", error);
    return NextResponse.json({ success: true, data: DEFAULT_EXHIBITS, source: "fallback" });
  }
}

export async function PUT(request: Request) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    const body = await request.json();

    // Case 1: Bulk array of items { items: [...] }
    if (Array.isArray(body.items)) {
      for (let i = 0; i < body.items.length; i++) {
        const it = body.items[i];
        await PullInExhibit.findOneAndUpdate(
          { code: it.code },
          {
            code: it.code,
            title: it.title,
            subTitle: it.subTitle || "",
            src: it.src,
            exif: it.exif || "",
            focusDistance: it.focusDistance || "",
            headline: it.headline,
            subhead: it.subhead || "",
            order: i + 1,
          },
          { upsert: true, new: true }
        );
      }
      const updated = await PullInExhibit.find().sort({ order: 1 });
      return NextResponse.json({ success: true, data: updated });
    }

    // Case 2: Direct array [...]
    if (Array.isArray(body)) {
      for (let i = 0; i < body.length; i++) {
        const it = body[i];
        await PullInExhibit.findOneAndUpdate(
          { code: it.code },
          {
            code: it.code,
            title: it.title,
            subTitle: it.subTitle || "",
            src: it.src,
            exif: it.exif || "",
            focusDistance: it.focusDistance || "",
            headline: it.headline,
            subhead: it.subhead || "",
            order: i + 1,
          },
          { upsert: true, new: true }
        );
      }
      const updated = await PullInExhibit.find().sort({ order: 1 });
      return NextResponse.json({ success: true, data: updated });
    }

    // Case 3: Single item update from dashboard modal
    const { _id, id, code, ...fields } = body;
    const targetQuery = _id
      ? { _id }
      : id
      ? { _id: id }
      : code
      ? { code }
      : null;

    if (!targetQuery) {
      return NextResponse.json(
        { error: "Exhibit code or ID is required" },
        { status: 400 }
      );
    }

    const updated = await PullInExhibit.findOneAndUpdate(
      targetQuery,
      {
        ...(code ? { code } : {}),
        ...fields,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT /api/pullin-exhibits error:", error);
    return NextResponse.json({ error: "Failed to update corridor exhibits" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return PUT(request);
}
