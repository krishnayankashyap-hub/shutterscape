// src/models/GalleryFrame.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryFrame extends Document {
  id?: string;
  title: string;
  category: "DOCUMENTARY" | "PORTRAITURE" | "LANDSCAPE" | "ARCHITECTURE" | "STREET" | "EXPERIMENTAL";
  photographer: string;
  filmStock: string;
  exif: string;
  src: string;
  description: string;
  location: string;
  order: number;
}

const GalleryFrameSchema = new Schema<IGalleryFrame>(
  {
    id: { type: String },
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["DOCUMENTARY", "PORTRAITURE", "LANDSCAPE", "ARCHITECTURE", "STREET", "EXPERIMENTAL"],
    },
    photographer: { type: String, required: true },
    filmStock: { type: String, default: "KODAK PORTRA 400" },
    exif: { type: String, default: "" },
    src: { type: String, required: true },
    description: { type: String, default: "" },
    location: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const GalleryFrame: Model<IGalleryFrame> =
  mongoose.models.GalleryFrame || mongoose.model<IGalleryFrame>("GalleryFrame", GalleryFrameSchema);
