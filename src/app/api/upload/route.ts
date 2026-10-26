// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UploadMedia } from "@/models/UploadMedia";
import sharp from "sharp";

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
    let buffer = Buffer.from(bytes);
    let mimeType = file.type || "image/jpeg";
    const originalName = file.name || "upload.jpg";

    // Auto-compress images to ultra-fast lightweight WebP before storing in MongoDB
    if (
      mimeType.startsWith("image/") &&
      !mimeType.includes("svg") &&
      !mimeType.includes("gif")
    ) {
      try {
        const webpBuf = await sharp(buffer)
          .resize({
            width: 1600,
            height: 1600,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: 82 })
          .toBuffer();
        buffer = webpBuf;
        mimeType = "image/webp";
      } catch (compressionErr) {
        console.warn("Upload image compression failed, using original:", compressionErr);
      }
    }

    const base64Data = buffer.toString("base64");

    const conn = await connectDB();
    if (conn) {
      // Store in MongoDB Atlas as a persistent cloud media asset
      const media = await UploadMedia.create({
        filename: originalName,
        mimeType,
        size: buffer.length,
        data: base64Data,
      });

      const publicUrl = `/api/media/${media._id.toString()}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename: originalName,
        size: buffer.length,
        mimeType,
      });
    }

    // High-availability fallback: Data URI
    const dataUri = `data:${mimeType};base64,${base64Data}`;
    return NextResponse.json({
      success: true,
      url: dataUri,
      filename: originalName,
      size: buffer.length,
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
