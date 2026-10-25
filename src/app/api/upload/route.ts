// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UploadMedia } from "@/models/UploadMedia";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/jpeg";
    const originalName = file.name || "upload.jpg";
    const base64Data = buffer.toString("base64");

    const conn = await connectDB();
    if (conn) {
      // Store in MongoDB Atlas as a persistent cloud media asset
      const media = await UploadMedia.create({
        filename: originalName,
        mimeType,
        size: file.size,
        data: base64Data,
      });

      const publicUrl = `/api/media/${media._id.toString()}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename: originalName,
        size: file.size,
        mimeType,
      });
    }

    // High-availability fallback: Data URI
    const dataUri = `data:${mimeType};base64,${base64Data}`;
    return NextResponse.json({
      success: true,
      url: dataUri,
      filename: originalName,
      size: file.size,
      mimeType,
    });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to upload file",
      },
      { status: 500 }
    );
  }
}
