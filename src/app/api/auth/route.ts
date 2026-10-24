// src/app/api/auth/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AdminUser } from "@/models/AdminUser";
import {
  verifyPassword,
  signSessionToken,
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    // --- LOGOUT ACTION ---
    if (action === "logout") {
      const response = NextResponse.json({ success: true, message: "Logged out cleanly" });
      response.cookies.set(SESSION_COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      return response;
    }

    // --- LOGIN ACTION ---
    const { username, password } = body;
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const conn = await connectDB();

    // If MongoDB is not yet configured, allow default admin credentials in development
    if (!conn) {
      const defaultAdminUser = process.env.ADMIN_INIT_USERNAME || "admin";
      const defaultAdminPass = process.env.ADMIN_INIT_PASSWORD || "ShutterScape2026!";

      if (username.trim().toLowerCase() === defaultAdminUser.toLowerCase() && password === defaultAdminPass) {
        const token = await signSessionToken({
          userId: "dev-mock-admin-id",
          username: defaultAdminUser,
          role: "SUPERADMIN",
        });

        const response = NextResponse.json({
          success: true,
          user: { username: defaultAdminUser, role: "SUPERADMIN" },
          note: "Running on development emergency credentials (MongoDB not connected)",
        });

        response.cookies.set(SESSION_COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
      }

      return NextResponse.json(
        {
          error:
            "Database connection offline and credentials do not match fallback admin",
        },
        { status: 401 }
      );
    }

    // Connect to database and find user
    const user = await AdminUser.findOne({
      $or: [
        { username: username.trim().toLowerCase() },
        { email: username.trim().toLowerCase() },
      ],
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Sign session JWT
    const token = await signSessionToken({
      userId: user._id.toString(),
      username: user.username,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: { username: user.username, role: user.role },
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Auth API Error:", error);
    return NextResponse.json(
      { error: "Internal authentication error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => {
        const [k, ...v] = c.split("=");
        return [k, decodeURIComponent(v.join("="))];
      })
    );

    const token = cookies[SESSION_COOKIE_NAME];
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const payload = await verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        userId: payload.userId,
        username: payload.username,
        role: payload.role,
      },
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
