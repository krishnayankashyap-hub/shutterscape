// src/app/api/moments-reels/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { MomentsReel } from "@/models/MomentsReel";

// Default Reels matching FramesOfMoments.tsx
const DEFAULT_REELS = [
  { photographer: "Parambrata Sarkar", videoSrc: "/videos/reel-1.mp4", order: 1 },
  { photographer: "Sayan Saha", videoSrc: "/videos/reel-2.mp4", order: 2 },
  { photographer: "Aman Baha", videoSrc: "/videos/reel-3.mp4", order: 3 },
  { photographer: "Sampad Dutta", videoSrc: "/videos/reel-4.mp4", order: 4 },
  { photographer: "Bituparna", videoSrc: "/videos/reel-5.mp4", order: 5 },
  { photographer: "Sohan Chandra", videoSrc: "/videos/reel-6.mp4", order: 6 },
];

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, data: DEFAULT_REELS, source: "fallback" });
    }

    const items = await MomentsReel.find().sort({ order: 1 });
    if (!items || items.length === 0) {
      return NextResponse.json({ success: true, data: DEFAULT_REELS, source: "default" });
    }

    return NextResponse.json({ success: true, data: items, source: "database" });
  } catch (error) {
    console.error("GET /api/moments-reels error:", error);
    return NextResponse.json({ success: true, data: DEFAULT_REELS, source: "fallback" });
  }
}

export async function POST(request: Request) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    const body = await request.json();
    const count = await MomentsReel.countDocuments();
    const newReel = await MomentsReel.create({
      ...body,
      order: body.order || count + 1,
    });

    return NextResponse.json({ success: true, data: newReel }, { status: 201 });
  } catch (error) {
    console.error("POST /api/moments-reels error:", error);
    return NextResponse.json({ error: "Failed to create moments reel" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    const body = await request.json();
    const { id, _id, ...updates } = body;
    const targetId = id || _id;

    if (!targetId) {
      return NextResponse.json({ error: "Reel ID is required" }, { status: 400 });
    }

    const updated = await MomentsReel.findByIdAndUpdate(targetId, updates, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT /api/moments-reels error:", error);
    return NextResponse.json({ error: "Failed to update reel" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Reel ID is required" }, { status: 400 });
    }

    await MomentsReel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Reel deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/moments-reels error:", error);
    return NextResponse.json({ error: "Failed to delete reel" }, { status: 500 });
  }
}
