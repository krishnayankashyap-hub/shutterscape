// scripts/create-admin.ts
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const AdminUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["SUPERADMIN", "CURATOR"], default: "SUPERADMIN" },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);

async function createAdmin() {
  const args = process.argv.slice(2);
  const username = args[0] || process.env.ADMIN_INIT_USERNAME || "admin";
  const email = args[1] || "admin@shutterscape.org";
  const password = args[2] || process.env.ADMIN_INIT_PASSWORD || "ShutterScape2026!";

  console.log("\n========================================================");
  console.log("🛡️ SHUTTERSCAPE — SECURE ADMIN MANUAL PROVISIONING");
  console.log("========================================================\n");

  if (!MONGODB_URI) {
    console.warn("⚠️ Warning: MONGODB_URI is not set in .env.local.");
    console.log(`ℹ️ The application will use emergency fallback admin credentials:`);
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password}\n`);
    console.log("To persist into MongoDB Atlas, configure MONGODB_URI in .env.local and run again.\n");
    return;
  }

  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!\n");

    const saltRounds = 12;
    console.log(`Encrypting password with ${saltRounds}-round bcrypt salt...`);
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const existing = await AdminUser.findOne({
      $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
    });

    if (existing) {
      console.log(`Admin user "${username}" already exists. Updating credentials...`);
      existing.passwordHash = passwordHash;
      existing.role = "SUPERADMIN";
      await existing.save();
      console.log(`✅ Admin credentials updated successfully!`);
    } else {
      await AdminUser.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        passwordHash,
        role: "SUPERADMIN",
      });
      console.log(`✅ Admin account created successfully!`);
    }

    console.log(`\nAccount Details:`);
    console.log(`- Username: ${username}`);
    console.log(`- Email:    ${email}`);
    console.log(`- Role:     SUPERADMIN`);
    console.log(`- Portal:   http://localhost:3000/admin/login\n`);
  } catch (error) {
    console.error("❌ Error provisioning admin account:", error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
