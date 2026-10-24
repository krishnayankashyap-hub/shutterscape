// src/models/MomentsReel.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMomentsReel extends Document {
  photographer: string;
  videoSrc: string;
  order: number;
}

const MomentsReelSchema = new Schema<IMomentsReel>(
  {
    photographer: { type: String, required: true },
    videoSrc: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const MomentsReel: Model<IMomentsReel> =
  mongoose.models.MomentsReel ||
  mongoose.model<IMomentsReel>("MomentsReel", MomentsReelSchema);
