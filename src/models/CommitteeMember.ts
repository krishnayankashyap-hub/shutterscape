// src/models/CommitteeMember.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICommitteeMember extends Document {
  name: string;
  role: string;
  tier: "MENTOR" | "LEAD" | "CORE" | "FOUNDER" | "LEGACY";
  dept?: string;
  img: string;
  order: number;
}

const CommitteeMemberSchema = new Schema<ICommitteeMember>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    tier: {
      type: String,
      required: true,
      enum: ["MENTOR", "LEAD", "CORE", "FOUNDER", "LEGACY"],
    },
    dept: { type: String, default: "" },
    img: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CommitteeMember: Model<ICommitteeMember> =
  mongoose.models.CommitteeMember ||
  mongoose.model<ICommitteeMember>("CommitteeMember", CommitteeMemberSchema);
