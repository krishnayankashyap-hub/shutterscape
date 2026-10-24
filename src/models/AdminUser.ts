// src/models/AdminUser.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdminUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  role: "SUPERADMIN" | "CURATOR";
  createdAt: Date;
  lastLogin?: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["SUPERADMIN", "CURATOR"], default: "CURATOR" },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser || mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);
