// src/models/PullInExhibit.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPullInExhibit extends Document {
  code: string; // e.g. "EXHIBIT // 01A"
  title: string;
  subTitle: string;
  src: string;
  exif: string;
  focusDistance: string;
  headline: string;
  subhead: string;
  order: number;
}

const PullInExhibitSchema = new Schema<IPullInExhibit>(
  {
    code: { type: String, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, default: "" },
    src: { type: String, required: true },
    exif: { type: String, default: "" },
    focusDistance: { type: String, default: "" },
    headline: { type: String, required: true },
    subhead: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PullInExhibit: Model<IPullInExhibit> =
  mongoose.models.PullInExhibit ||
  mongoose.model<IPullInExhibit>("PullInExhibit", PullInExhibitSchema);
