// src/app/admin/login/page.tsx
"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(
          data.error || "Authentication failed. Please verify credentials."
        );
        setLoading(false);
        return;
      }
      router.push(callbackUrl);
    } catch {
      setErrorMsg("Network error connecting to administrative service.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{ padding: "32px 16px" }}
      className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F4F7FE] text-[#2A3547] font-sans antialiased"
    >
      <div className="w-full max-w-[440px]">
        <div
          style={{ padding: "36px 34px" }}
          className="bg-white border border-[#EAEFF4] rounded-2xl shadow-[0_12px_40px_rgba(145,158,171,0.12)]"
        >
          {/* Brand Header */}
          <div
            style={{ marginBottom: "28px" }}
            className="flex flex-col items-center text-center"
          >
            <div
              style={{ width: "48px", height: "48px", marginBottom: "14px" }}
              className="rounded-2xl bg-[#5D87FF] flex items-center justify-center text-white font-serif italic font-bold text-2xl shadow-[0_6px_18px_rgba(93,135,255,0.35)]"
            >
              S
            </div>
            <span
              style={{ padding: "4px 12px", marginBottom: "10px" }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#ECF2FF] text-[#5D87FF] text-[11px] font-bold tracking-wider uppercase"
            >
              ● The Darkroom Controller
            </span>
            <h1 className="text-xl font-extrabold text-[#2A3547] tracking-tight">
              Sign in to Admin CMS
            </h1>
            <p
              style={{ marginTop: "4px" }}
              className="text-xs text-[#7C8FAC]"
            >
              Girijananda Chowdhury University · ShutterScape
            </p>
          </div>

          {errorMsg && (
            <div
              style={{ padding: "12px 14px", marginBottom: "20px" }}
              className="rounded-xl bg-[#FDEDE8] border border-[#FA896B]/40 text-[#C2410C] text-xs font-semibold"
            >
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                style={{ marginBottom: "8px" }}
                className="block text-xs font-bold uppercase tracking-wider text-[#2A3547]"
              >
                Administrator ID / Username
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                style={{ padding: "12px 16px" }}
                className="w-full rounded-xl bg-[#F8FAFC] focus:bg-white border border-[#DFE5EF] focus:border-[#5D87FF] text-sm text-[#2A3547] outline-none transition-all"
              />
            </div>

            <div>
              <label
                style={{ marginBottom: "8px" }}
                className="block text-xs font-bold uppercase tracking-wider text-[#2A3547]"
              >
                Access Key / Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{ padding: "12px 16px" }}
                className="w-full rounded-xl bg-[#F8FAFC] focus:bg-white border border-[#DFE5EF] focus:border-[#5D87FF] text-sm text-[#2A3547] outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ padding: "13px 20px", marginTop: "6px" }}
              className="w-full rounded-xl bg-[#5D87FF] hover:bg-[#4570EA] text-white text-sm font-bold shadow-[0_6px_18px_rgba(93,135,255,0.32)] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading && (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              )}
              <span>{loading ? "Authenticating..." : "Access Controller"}</span>
            </button>
          </form>
        </div>

        <div
          style={{ marginTop: "20px" }}
          className="text-center text-xs font-medium text-[#7C8FAC]"
        >
          Production CMS v4.0 · Secured by JWT Edge Guard
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F4F7FE] text-[#7C8FAC] font-mono text-xs">
          Loading gateway...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
