// src/models/HeroReel.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHeroReel extends Document {
  frameCode: string; // e.g. "01A", "02B"
  title: string;
  src: string;
  exif: string;
  order: number;
}

const HeroReelSchema = new Schema<IHeroReel>(
  {
    frameCode: { type: String, required: true },
    title: { type: String, required: true },
    src: { type: String, required: true },
    exif: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const HeroReel: Model<IHeroReel> =
  mongoose.models.HeroReel || mongoose.model<IHeroReel>("HeroReel", HeroReelSchema);
