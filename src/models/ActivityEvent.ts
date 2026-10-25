// src/models/ActivityEvent.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IActivityEvent extends Document {
  id?: string;
  shortTitle: string;
  title: string;
  category: "PHOTOWALK" | "WORKSHOP" | "EXHIBITION" | "COMPETITION";
  year: "2026" | "2025";
  date: string;
  location: string;
  description: string;
  exif: string;
  filmStock: string;
  img: string;
  isUpcoming: boolean;
  order: number;
}

const ActivityEventSchema = new Schema<IActivityEvent>(
  {
    id: { type: String },
    shortTitle: { type: String, required: true },
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["PHOTOWALK", "WORKSHOP", "EXHIBITION", "COMPETITION"],
    },
    year: { type: String, required: true, enum: ["2026", "2025"] },
    date: { type: String, required: true },
    location: { type: String, default: "" },
    description: { type: String, default: "" },
    exif: { type: String, default: "" },
    filmStock: { type: String, default: "KODAK PORTRA 400" },
    img: { type: String, required: true },
    isUpcoming: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ActivityEvent: Model<IActivityEvent> =
  mongoose.models.ActivityEvent ||
  mongoose.model<IActivityEvent>("ActivityEvent", ActivityEventSchema);
