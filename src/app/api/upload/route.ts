// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UploadMedia } from "@/models/UploadMedia";
import { isCloudinaryConfigured, uploadToCloudinary } from "@/lib/cloudinary";
import { isR2Configured, uploadToR2 } from "@/lib/r2";
import sharp from "sharp";

export async function GET() {
  const cldActive = isCloudinaryConfigured();
  const r2Active = isR2Configured();

  let storage = "mongodb-fallback";
  if (cldActive) storage = "cloudinary";
  else if (r2Active) storage = "cloudflare-r2";

  return NextResponse.json({
    success: true,
    storage,
    cloudinary: {
      configured: cldActive,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || null,
    },
    cloudflareR2: {
      configured: r2Active,
      bucket: process.env.R2_BUCKET_NAME || null,
      publicUrl: process.env.R2_PUBLIC_URL || null,
    },
  });
}

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

    // Auto-compress raster images to lightweight WebP if appropriate
    if (
      mimeType.startsWith("image/") &&
      !mimeType.includes("svg") &&
      !mimeType.includes("gif")
    ) {
      try {
        const webpBuf = await sharp(buffer)
          .resize({
            width: 2000,
            height: 2000,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: 85 })
          .toBuffer();
        buffer = webpBuf;
        mimeType = "image/webp";
      } catch (compressionErr) {
        console.warn(
          "Upload image compression failed, using original buffer:",
          compressionErr
        );
      }
    }

    // 1. PRIMARY: Cloudinary (100% Free, No Credit Card, 25GB Storage/Bandwidth)
    if (isCloudinaryConfigured()) {
      try {
        const cldRes = await uploadToCloudinary(buffer, originalName);
        return NextResponse.json({
          success: true,
          url: cldRes.secure_url,
          provider: "cloudinary",
          filename: originalName,
          size: buffer.length,
          mimeType,
        });
      } catch (cldErr) {
        console.error("Cloudinary upload failed, checking next fallback:", cldErr);
      }
    }

    // 2. SECONDARY: Cloudflare R2
    if (isR2Configured()) {
      try {
        const { url } = await uploadToR2(buffer, originalName, mimeType);
        return NextResponse.json({
          success: true,
          url,
          provider: "cloudflare-r2",
          filename: originalName,
          size: buffer.length,
          mimeType,
        });
      } catch (r2Error) {
        console.error("Cloudflare R2 upload failed, falling back to MongoDB:", r2Error);
      }
    }

    // 3. TERTIARY: MongoDB Atlas Base64 Cloud Asset
    const base64Data = buffer.toString("base64");
    const conn = await connectDB();
    if (conn) {
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
        provider: "mongodb",
        filename: originalName,
        size: buffer.length,
        mimeType,
      });
    }

    // 4. QUATERNARY: Data URI
    const dataUri = `data:${mimeType};base64,${base64Data}`;
    return NextResponse.json({
      success: true,
      url: dataUri,
      provider: "data-uri",
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
