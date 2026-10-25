// src/app/api/media/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UploadMedia } from "@/models/UploadMedia";
import mongoose from "mongoose";

export async function GET(
  _request: Request,
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

    const buffer = Buffer.from(media.data, "base64");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": media.mimeType || "image/jpeg",
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("GET /api/media/[id] error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
