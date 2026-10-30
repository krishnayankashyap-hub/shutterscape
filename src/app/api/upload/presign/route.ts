// src/app/api/upload/presign/route.ts
import { NextResponse } from "next/server";
import { isR2Configured, createPresignedUploadUrl } from "@/lib/r2";

export async function POST(request: Request) {
  try {
    if (!isR2Configured()) {
      return NextResponse.json({
        enabled: false,
        message: "Cloudflare R2 is not configured. Falling back to standard upload.",
      });
    }

    const body = await request.json();
    const { filename, contentType } = body;

    if (!filename || !contentType) {
      return NextResponse.json(
        { enabled: false, message: "Missing filename or contentType" },
        { status: 400 }
      );
    }

    const { uploadUrl, publicUrl, key } = await createPresignedUploadUrl(
      filename,
      contentType
    );

    return NextResponse.json({
      enabled: true,
      uploadUrl,
      publicUrl,
      key,
    });
  } catch (error) {
    console.error("Presign API Error:", error);
    return NextResponse.json(
      {
        enabled: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to generate presigned upload URL",
      },
      { status: 500 }
    );
  }
}
