// src/app/api/media/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UploadMedia } from "@/models/UploadMedia";
import mongoose from "mongoose";

// In-memory hot cache for instantaneous sub-millisecond serving
const cache = new Map<string, { buffer: Buffer; mimeType: string }>();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse("Invalid Media ID", { status: 400 });
    }

    // 1. Check in-memory hot cache (served in < 0.5 milliseconds)
    const cached = cache.get(id);
    if (cached) {
      return new NextResponse(new Uint8Array(cached.buffer), {
        status: 200,
        headers: {
          "Content-Type": cached.mimeType,
          "Content-Length": cached.buffer.length.toString(),
          "Cache-Control":
            "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable",
          "CDN-Cache-Control": "public, max-age=31536000, immutable",
          "Vercel-CDN-Cache-Control": "public, max-age=31536000, immutable",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // 2. Fetch from DB
    const conn = await connectDB();
    if (!conn) {
      return new NextResponse("Database unavailable", { status: 503 });
    }

    const media = await UploadMedia.findById(id).lean();
    if (!media || !media.data) {
      return new NextResponse("Media not found", { status: 404 });
    }

    const rawBuffer = Buffer.from(media.data, "base64");
    const mimeType = media.mimeType || "image/webp";

    // 3. Video streaming with HTTP 206 Range support
    if (mimeType.startsWith("video/")) {
      const range = request.headers.get("range");
      const totalSize = rawBuffer.length;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const maxChunk = 1.5 * 1024 * 1024;
        const end = parts[1]
          ? parseInt(parts[1], 10)
          : Math.min(start + maxChunk - 1, totalSize - 1);

        const chunk = rawBuffer.subarray(start, end + 1);

        return new NextResponse(new Uint8Array(chunk), {
          status: 206,
          headers: {
            "Content-Range": `bytes ${start}-${end}/${totalSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunk.length.toString(),
            "Content-Type": mimeType,
            "Cache-Control":
              "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable",
            "CDN-Cache-Control": "public, max-age=31536000, immutable",
            "Vercel-CDN-Cache-Control": "public, max-age=31536000, immutable",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      return new NextResponse(new Uint8Array(rawBuffer), {
        status: 200,
        headers: {
          "Content-Type": mimeType,
          "Content-Length": totalSize.toString(),
          "Accept-Ranges": "bytes",
          "Cache-Control":
            "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable",
          "CDN-Cache-Control": "public, max-age=31536000, immutable",
          "Vercel-CDN-Cache-Control": "public, max-age=31536000, immutable",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // 4. Image: Store in hot cache (LRU up to 100 entries to prevent memory bloat)
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      if (firstKey) cache.delete(firstKey);
    }
    cache.set(id, { buffer: rawBuffer, mimeType });

    return new NextResponse(new Uint8Array(rawBuffer), {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Length": rawBuffer.length.toString(),
        "Cache-Control":
          "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable",
        "CDN-Cache-Control": "public, max-age=31536000, immutable",
        "Vercel-CDN-Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("GET /api/media/[id] error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
