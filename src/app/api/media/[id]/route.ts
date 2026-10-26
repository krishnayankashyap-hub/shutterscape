// src/app/api/media/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UploadMedia } from "@/models/UploadMedia";
import mongoose from "mongoose";
import sharp from "sharp";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse("Invalid Media ID", { status: 400 });
    }

    const conn = await connectDB();
    if (!conn) {
      return new NextResponse("Database unavailable", { status: 503 });
    }

    const media = await UploadMedia.findById(id).lean();
    if (!media || !media.data) {
      return new NextResponse("Media not found", { status: 404 });
    }

    const rawBuffer = Buffer.from(media.data, "base64");
    const mimeType = media.mimeType || "image/jpeg";

    // 1. VIDEO STREAMING WITH HTTP RANGE SUPPORT (Starts playing immediately)
    if (mimeType.startsWith("video/")) {
      const range = request.headers.get("range");
      const totalSize = rawBuffer.length;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        // Serve 1.5MB chunks so playback starts instantly
        const maxChunk = 1.5 * 1024 * 1024;
        const end = parts[1]
          ? parseInt(parts[1], 10)
          : Math.min(start + maxChunk - 1, totalSize - 1);

        const chunk = rawBuffer.subarray(start, end + 1);

        return new NextResponse(chunk, {
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

      return new NextResponse(rawBuffer, {
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

    // 2. IMAGE OPTIMIZATION: Convert PNG/JPEG to lightweight WebP on-the-fly
    let outputBuffer = rawBuffer;
    let outputMime = mimeType;

    try {
      if (mimeType.startsWith("image/") && !mimeType.includes("svg") && !mimeType.includes("gif")) {
        outputBuffer = await sharp(rawBuffer)
          .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
          .webp({ quality: 82, effort: 4 })
          .toBuffer();
        outputMime = "image/webp";
      }
    } catch {
      // Fallback to raw buffer if sharp conversion fails
      outputBuffer = rawBuffer;
      outputMime = mimeType;
    }

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        "Content-Type": outputMime,
        "Content-Length": outputBuffer.length.toString(),
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
