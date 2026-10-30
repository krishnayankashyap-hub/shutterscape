// src/models/Spotlight.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISpotlightItem {
  id?: string;
  title: string;
  category: string;
  date: string;
  targetDate: string;
  location: string;
  filmStock: string;
  img: string;
  description: string;
  ctaText: string;
  isActive?: boolean;
}

export interface ISpotlightDoc extends Document {
  upcoming: ISpotlightItem;
  live: ISpotlightItem;
}

const SpotlightItemSchema = new Schema<ISpotlightItem>(
  {
    id: { type: String },
    title: { type: String, default: "" },
    category: { type: String, default: "" },
    date: { type: String, default: "" },
    targetDate: { type: String, default: "" },
    location: { type: String, default: "" },
    filmStock: { type: String, default: "" },
    img: { type: String, default: "" },
    description: { type: String, default: "" },
    ctaText: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);

const SpotlightSchema = new Schema<ISpotlightDoc>(
  {
    upcoming: { type: SpotlightItemSchema, required: true },
    live: { type: SpotlightItemSchema, required: true },
  },
  { timestamps: true }
);

export const Spotlight: Model<ISpotlightDoc> =
  mongoose.models.Spotlight ||
  mongoose.model<ISpotlightDoc>("Spotlight", SpotlightSchema);
