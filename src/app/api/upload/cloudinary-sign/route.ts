// src/app/api/upload/cloudinary-sign/route.ts
import { NextResponse } from "next/server";
import { isCloudinaryConfigured, getCloudinary } from "@/lib/cloudinary";

export async function POST() {
  try {
    if (!isCloudinaryConfigured()) {
      return NextResponse.json({
        enabled: false,
        message: "Cloudinary is not configured",
      });
    }

    const cld = getCloudinary();
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = "shutterscape";

    const signature = cld.utils.api_sign_request(
      { folder, timestamp },
      process.env.CLOUDINARY_API_SECRET!.trim()
    );

    return NextResponse.json({
      enabled: true,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME!.trim(),
      apiKey: process.env.CLOUDINARY_API_KEY!.trim(),
      timestamp,
      signature,
      folder,
    });
  } catch (error) {
    console.error("Cloudinary sign error:", error);
    return NextResponse.json(
      {
        enabled: false,
        message: error instanceof Error ? error.message : "Failed to sign upload request",
      },
      { status: 500 }
    );
  }
}
