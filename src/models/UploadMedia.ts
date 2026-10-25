// src/models/UploadMedia.ts
import mongoose from "mongoose";

const UploadMediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: String, required: true },
  },
  { timestamps: true }
);

export const UploadMedia =
  mongoose.models.UploadMedia ||
  mongoose.model("UploadMedia", UploadMediaSchema);
