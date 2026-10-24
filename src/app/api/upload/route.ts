// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

// Allow payloads up to 100MB for 4K vertical video reels and raw photos
export const config = {
  api: {
    bodyParser: false,
  },
};

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

    // Sanitize filename to prevent directory traversal or malformed paths
    const originalName = file.name || "upload";
    const extension = path.extname(originalName) || "";
    const baseName = path
      .basename(originalName, extension)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 40);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e4)}`;
    const finalFilename = `${baseName}-${uniqueSuffix}${extension}`;

    // Target storage directory: <project_root>/public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, finalFilename);

    await writeFile(filePath, buffer);

    // Public URL accessible by Next.js static asset server
    const publicUrl = `/uploads/${finalFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: finalFilename,
      size: file.size,
      mimeType: file.type,
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
