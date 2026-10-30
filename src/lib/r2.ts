// src/lib/r2.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
const bucketName = process.env.R2_BUCKET_NAME?.trim();
const publicUrl = process.env.R2_PUBLIC_URL?.trim().replace(/\/$/, "");

/**
 * Returns true if all required Cloudflare R2 credentials are present.
 */
export function isR2Configured(): boolean {
  return Boolean(
    accountId &&
    accessKeyId &&
    secretAccessKey &&
    bucketName &&
    publicUrl
  );
}

let s3ClientInstance: S3Client | null = null;

/**
 * Returns a singleton S3Client instance connected to Cloudflare R2.
 */
export function getR2Client(): S3Client {
  if (!s3ClientInstance) {
    if (!accountId || !accessKeyId || !secretAccessKey) {
      throw new Error(
        "Cloudflare R2 credentials (CLOUDFLARE_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY) are missing."
      );
    }
    s3ClientInstance = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }
  return s3ClientInstance;
}

/**
 * Uploads a file buffer directly to Cloudflare R2 and returns its public CDN URL.
 */
export async function uploadToR2(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<{ url: string; key: string }> {
  if (!isR2Configured()) {
    throw new Error("Cloudflare R2 is not fully configured.");
  }

  const cleanName = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  const key = `uploads/${Date.now()}-${cleanName}`;

  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: bucketName!,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  const fileUrl = `${publicUrl}/${key}`;
  return { url: fileUrl, key };
}

/**
 * Generates a presigned PUT URL allowing client-side direct uploads to Cloudflare R2,
 * bypassing Vercel serverless request body size limits.
 */
export async function createPresignedUploadUrl(
  filename: string,
  contentType: string
): Promise<{ uploadUrl: string; publicUrl: string; key: string }> {
  if (!isR2Configured()) {
    throw new Error("Cloudflare R2 is not fully configured.");
  }

  const cleanName = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  const key = `uploads/${Date.now()}-${cleanName}`;

  const client = getR2Client();
  const command = new PutObjectCommand({
    Bucket: bucketName!,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  const finalPublicUrl = `${publicUrl}/${key}`;

  return { uploadUrl, publicUrl: finalPublicUrl, key };
}
