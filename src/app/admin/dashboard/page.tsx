// src/app/admin/dashboard/page.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FileUploadZone from "@/components/admin/FileUploadZone";

// Model interfaces matching database schemas
interface HeroReelItem {
  _id?: string;
  frameCode: string;
  title: string;
  src: string;
  exif: string;
  order?: number;
}

interface PullInExhibitItem {
  _id?: string;
  code: string;
  title: string;
  subTitle?: string;
  src: string;
  exif?: string;
  focusDistance?: string;
  headline: string;
  subhead?: string;
  order?: number;
}

interface GalleryItem {
  _id?: string;
  id?: string;
  title: string;
  category:
    | "DOCUMENTARY"
    | "PORTRAITURE"
    | "LANDSCAPE"
    | "ARCHITECTURE"
    | "STREET"
    | "EXPERIMENTAL";
  photographer: string;
  filmStock: string;
  exif: string;
  src: string;
  description: string;
  location: string;
}

interface CommitteeMemberItem {
  _id?: string;
  name: string;
  role: string;
  tier: "MENTOR" | "LEAD" | "CORE" | "FOUNDER" | "LEGACY";
  dept?: string;
  img: string;
}

interface ActivityEventItem {
  _id?: string;
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
}

interface MomentsReelItem {
  _id?: string;
  photographer: string;
  videoSrc: string;
  order?: number;
}

type TabType =
  | "gallery"
  | "activities"
  | "committee"
  | "hero"
  | "pullin"
  | "reels";

const TABS: {
  id: TabType;
  label: string;
  group: "ARCHIVES" | "SCENES";
  description: string;
}[] = [
  {
    id: "gallery",
    label: "Visual Archive",
    group: "ARCHIVES",
    description:
      "Curated 35mm & 120 contact frames, photographic EXIF, and inspection loupe essays.",
  },
  {
    id: "activities",
    label: "Activities & Timeline",
    group: "ARCHIVES",
    description:
      "Photowalks, workshops, and exhibitions across '26 and '25 with live RSVP triggers.",
  },
  {
    id: "committee",
    label: "Committee Roster",
    group: "ARCHIVES",
    description:
      "Club leadership across Mentors, Leads, Core, Founders, and Legacy chapters.",
  },
  {
    id: "hero",
    label: "Hero Contact Reel",
    group: "SCENES",
    description:
      "The 6 vertical 35mm filmstrip frames (01A–06F) flanking the camera aperture hero.",
  },
  {
    id: "pullin",
    label: "Corridor Exhibits",
    group: "SCENES",
    description:
      "The 8 3D perspective depth exhibits featured in the pull-in corridor sequence.",
  },
  {
    id: "reels",
    label: "Motion Video Reels",
    group: "SCENES",
    description:
      "Vertical phone video reels featured in the 'Frames of Moments' cinema section.",
  },
];

function getTabIcon(id: TabType, className = "w-4 h-4") {
  switch (id) {
    case "gallery":
      return (
        <svg
          className={className}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <rect x="3" y="3" width="18" height="18" rx="2.5" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 15l-5-5L5 21"
          />
        </svg>
      );
    case "hero":
      return (
        <svg
          className={className}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <rect x="2" y="2" width="20" height="20" rx="2.5" />
          <path
            strokeLinecap="round"
            d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"
          />
        </svg>
      );
    case "pullin":
      return (
        <svg
          className={className}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 21h16M4 10h16M6 10v11M18 10v11M10 10v11M14 10v11M12 3L2 7h20L12 3z"
          />
        </svg>
      );
    case "committee":
      return (
        <svg
          className={className}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
          />
          <circle cx="9" cy="7" r="4" />
          <path
            strokeLinecap="round"
            d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
          />
        </svg>
      );
    case "activities":
      return (
        <svg
          className={className}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <rect x="3" y="4" width="18" height="18" rx="2.5" />
          <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
          <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "reels":
      return (
        <svg
          className={className}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <polygon points="23 7 16 12 23 17 23 7" strokeLinejoin="round" />
          <rect x="1" y="5" width="15" height="14" rx="2.5" />
        </svg>
      );
  }
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>("gallery");
  const [loading, setLoading] = useState(false);
  const [dbSource, setDbSource] = useState<"database" | "fallback">("fallback");
  const [statusToast, setStatusToast] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Collection Data States
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [activityList, setActivityList] = useState<ActivityEventItem[]>([]);
  const [committeeList, setCommitteeList] = useState<CommitteeMemberItem[]>([]);
  const [heroReelList, setHeroReelList] = useState<HeroReelItem[]>([]);
  const [pullInList, setPullInList] = useState<PullInExhibitItem[]>([]);
  const [reelsList, setReelsList] = useState<MomentsReelItem[]>([]);

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingItem, setEditingItem] = useState<any>({});
  const [savingItem, setSavingItem] = useState(false);
  const initialSyncDone = useRef(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.backgroundColor = "#F4F7FE";
      document.documentElement.style.backgroundColor = "#F4F7FE";
    }
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setStatusToast({ text, type });
    setTimeout(() => setStatusToast(null), 4500);
  };

  const refreshAllData = useCallback(async () => {
    try {
      setLoading(true);
      const responses = await Promise.allSettled([
        fetch("/api/gallery"),
        fetch("/api/activities"),
        fetch("/api/committee"),
        fetch("/api/hero-reel"),
        fetch("/api/pullin-exhibits"),
        fetch("/api/moments-reels"),
      ]);

      const [resGal, resAct, resCom, resHero, resPull, resReels] = responses;

      if (resGal.status === "fulfilled" && resGal.value.ok) {
        const d = await resGal.value.json();
        if (d.success && d.data) setGalleryList(d.data);
        if (d.source === "database") setDbSource("database");
      }

      if (resAct.status === "fulfilled" && resAct.value.ok) {
        const d = await resAct.value.json();
        if (d.success && d.data) setActivityList(d.data);
        if (d.source === "database") setDbSource("database");
      }

      if (resCom.status === "fulfilled" && resCom.value.ok) {
        const d = await resCom.value.json();
        if (d.success && d.data) setCommitteeList(d.data);
      }

      if (resHero.status === "fulfilled" && resHero.value.ok) {
        const d = await resHero.value.json();
        if (d.success && d.data) setHeroReelList(d.data);
      }

      if (resPull.status === "fulfilled" && resPull.value.ok) {
        const d = await resPull.value.json();
        if (d.success && d.data) setPullInList(d.data);
      }

      if (resReels.status === "fulfilled" && resReels.value.ok) {
        const d = await resReels.value.json();
        if (d.success && d.data) setReelsList(d.data);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      showToast(
        "Unable to reach CMS server. Working in offline fallback mode.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialSyncDone.current) return;
    initialSyncDone.current = true;
    refreshAllData();
  }, [refreshAllData]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setEditingItem({
      category:
        activeTab === "gallery"
          ? "DOCUMENTARY"
          : activeTab === "activities"
          ? "PHOTOWALK"
          : undefined,
      tier: activeTab === "committee" ? "LEAD" : undefined,
      year: activeTab === "activities" ? "2026" : undefined,
      isUpcoming: false,
      filmStock: "KODAK PORTRA 400",
      exif: "35MM · F/2.0 · 1/500S",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: any) => {
    setModalMode("edit");
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingItem(true);

    try {
      let endpoint = "/api/gallery";
      if (activeTab === "activities") endpoint = "/api/activities";
      if (activeTab === "committee") endpoint = "/api/committee";
      if (activeTab === "hero") endpoint = "/api/hero-reel";
      if (activeTab === "pullin") endpoint = "/api/pullin-exhibits";
      if (activeTab === "reels") endpoint = "/api/moments-reels";

      const method = modalMode === "create" ? "POST" : "PUT";
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || json.message || "Failed to save record");
      }

      showToast(
        modalMode === "create"
          ? "Record created successfully!"
          : "Record updated cleanly!",
        "success"
      );
      setIsModalOpen(false);
      refreshAllData();
    } catch (err: any) {
      showToast(err.message || "Operation failed", "error");
    } finally {
      setSavingItem(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this record?"
      )
    )
      return;

    try {
      setLoading(true);
      let endpoint = `/api/gallery?id=${id}`;
      if (activeTab === "activities") endpoint = `/api/activities?id=${id}`;
      if (activeTab === "committee") endpoint = `/api/committee?id=${id}`;
      if (activeTab === "reels") endpoint = `/api/moments-reels?id=${id}`;

      const res = await fetch(endpoint, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Delete failed");

      showToast("Record deleted cleanly", "success");
      refreshAllData();
    } catch (err: any) {
      showToast(err.message || "Delete failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const activeTabMeta = useMemo(() => {
    return TABS.find((t) => t.id === activeTab) || TABS[0];
  }, [activeTab]);

  const getTabCount = (id: TabType) => {
    if (id === "gallery") return galleryList.length;
    if (id === "hero") return heroReelList.length;
    if (id === "pullin") return pullInList.length;
    if (id === "committee") return committeeList.length;
    if (id === "activities") return activityList.length;
    if (id === "reels") return reelsList.length;
    return 0;
  };

  return (
    <div
      id="cms-enterprise-root"
      className="min-h-screen w-full bg-[#F4F7FE] text-[#1E293B] font-sans flex flex-col lg:flex-row antialiased selection:bg-[#5D87FF]/15 selection:text-[#5D87FF]"
    >
      {/* Scoped Enterprise Stylesheet — 100% immune to globals.css * { padding: 0; margin: 0 } */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        #cms-enterprise-root {
          font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Inter", "Segoe UI", Roboto, sans-serif;
          background-color: #F4F7FE;
          color: #1E293B;
        }
        #cms-enterprise-root .cms-sidebar {
          width: 280px;
          background: #FFFFFF;
          border-right: 1px solid #EAEFF4;
          box-shadow: 0 0 24px rgba(145, 158, 171, 0.08);
        }
        @media (max-width: 1023px) {
          #cms-enterprise-root .cms-sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #EAEFF4;
          }
        }
        #cms-enterprise-root .cms-nav-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 11px 16px !important;
          margin-bottom: 6px !important;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          color: #5A6A85;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        #cms-enterprise-root .cms-nav-btn:hover {
          background-color: #F6F9FC;
          color: #5D87FF;
        }
        #cms-enterprise-root .cms-nav-btn.active {
          background-color: #5D87FF;
          color: #FFFFFF;
          box-shadow: 0 6px 16px rgba(93, 135, 255, 0.28);
        }
        #cms-enterprise-root .cms-card {
          background: #FFFFFF;
          border-radius: 14px;
          border: 1px solid #EAEFF4;
          box-shadow: 0 4px 20px rgba(145, 158, 171, 0.07);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        #cms-enterprise-root .cms-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(145, 158, 171, 0.14);
          border-color: #D5E0EE;
        }
        #cms-enterprise-root .cms-card-body {
          padding: 20px !important;
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-between;
        }
        #cms-enterprise-root .cms-kpi-card {
          background: #FFFFFF;
          border-radius: 14px;
          border: 1px solid #EAEFF4;
          padding: 20px 22px !important;
          box-shadow: 0 4px 18px rgba(145, 158, 171, 0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        #cms-enterprise-root .cms-primary-btn {
          background: #5D87FF;
          color: #FFFFFF;
          padding: 10px 20px !important;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(93, 135, 255, 0.3);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        #cms-enterprise-root .cms-primary-btn:hover {
          background: #4570EA;
          box-shadow: 0 6px 18px rgba(93, 135, 255, 0.4);
        }
        #cms-enterprise-root .cms-action-edit {
          padding: 7px 14px !important;
          border-radius: 8px;
          border: 1px solid #DFE5EF;
          background: #FFFFFF;
          color: #2A3547;
          font-size: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        #cms-enterprise-root .cms-action-edit:hover {
          background: #ECF2FF;
          border-color: #5D87FF;
          color: #5D87FF;
        }
        #cms-enterprise-root .cms-action-delete {
          padding: 7px 14px !important;
          border-radius: 8px;
          border: 1px solid #FDEDE8;
          background: #FDEDE8;
          color: #FA896B;
          font-size: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        #cms-enterprise-root .cms-action-delete:hover {
          background: #FA896B;
          border-color: #FA896B;
          color: #FFFFFF;
        }
        #cms-enterprise-root .cms-filter-pill {
          padding: 7px 15px !important;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
        }
        #cms-enterprise-root .cms-filter-pill.active {
          background: #5D87FF;
          color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(93, 135, 255, 0.25);
        }
        #cms-enterprise-root .cms-filter-pill.inactive {
          background: transparent;
          color: #5A6A85;
        }
        #cms-enterprise-root .cms-filter-pill.inactive:hover {
          background: #EAEFF4;
          color: #2A3547;
        }
        #cms-enterprise-root .cms-search-input {
          width: 100%;
          height: 42px;
          padding: 8px 16px 8px 42px !important;
          border-radius: 10px;
          border: 1px solid #DFE5EF;
          background: #F8FAFC;
          font-size: 13px;
          color: #2A3547;
          outline: none;
          transition: all 0.2s ease;
        }
        #cms-enterprise-root .cms-search-input:focus {
          background: #FFFFFF;
          border-color: #5D87FF;
          box-shadow: 0 0 0 3px rgba(93, 135, 255, 0.12);
        }
        #cms-enterprise-root .cms-form-input {
          width: 100%;
          padding: 10px 14px !important;
          border-radius: 9px;
          border: 1px solid #DFE5EF;
          background: #FFFFFF;
          font-size: 13px;
          color: #2A3547;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        #cms-enterprise-root .cms-form-input:focus {
          border-color: #5D87FF;
          box-shadow: 0 0 0 3px rgba(93, 135, 255, 0.12);
        }
        #cms-enterprise-root .cms-badge {
          padding: 4px 10px !important;
          border-radius: 6px;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
      `,
        }}
      />

      {/* ============================================================
          SIDEBAR NAVIGATION (MaterialPro Enterprise Left Rail)
          ============================================================ */}
      <aside className="cms-sidebar lg:h-screen lg:sticky lg:top-0 flex flex-col justify-between shrink-0 z-40">
        <div>
          {/* Brand Logo Header */}
          <div
            style={{ padding: "22px 24px" }}
            className="border-b border-[#EAEFF4] flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                style={{ width: "36px", height: "36px" }}
                className="rounded-xl bg-[#5D87FF] flex items-center justify-center text-white font-serif italic font-bold text-lg shadow-sm"
              >
                S
              </div>
              <div>
                <span className="block font-bold text-[16px] text-[#2A3547] tracking-tight leading-none">
                  ShutterScape
                </span>
                <span
                  style={{ marginTop: "3px" }}
                  className="block text-[11px] font-medium text-[#7C8FAC]"
                >
                  Darkroom CMS v4.0
                </span>
              </div>
            </div>

            <span
              style={{ padding: "4px 10px" }}
              className={`rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                dbSource === "database"
                  ? "bg-[#E6FFFA] text-[#13DEB9]"
                  : "bg-[#FEF5E5] text-[#FFAE1F]"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  dbSource === "database" ? "bg-[#13DEB9]" : "bg-[#FFAE1F]"
                }`}
              />
              {dbSource === "database" ? "Live DB" : "Cached"}
            </span>
          </div>

          {/* Navigation Menu Groups */}
          <div style={{ padding: "20px 18px" }}>
            <div
              style={{ padding: "0 12px", marginBottom: "10px" }}
              className="text-[11px] font-bold uppercase tracking-wider text-[#7C8FAC]"
            >
              Content Archives
            </div>

            {TABS.filter((t) => t.group === "ARCHIVES").map((tab) => {
              const isActive = activeTab === tab.id;
              const count = getTabCount(tab.id);
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery("");
                    setFilterCategory("ALL");
                  }}
                  className={`cms-nav-btn ${isActive ? "active" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    {getTabIcon(tab.id, "w-4 h-4")}
                    <span>{tab.label}</span>
                  </div>
                  <span
                    style={{ padding: "2px 8px" }}
                    className={`rounded-full text-[11px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#ECF2FF] text-[#5D87FF]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            <div
              style={{
                padding: "0 12px",
                marginTop: "22px",
                marginBottom: "10px",
              }}
              className="text-[11px] font-bold uppercase tracking-wider text-[#7C8FAC]"
            >
              Cinematic Scenes
            </div>

            {TABS.filter((t) => t.group === "SCENES").map((tab) => {
              const isActive = activeTab === tab.id;
              const count = getTabCount(tab.id);
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery("");
                    setFilterCategory("ALL");
                  }}
                  className={`cms-nav-btn ${isActive ? "active" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    {getTabIcon(tab.id, "w-4 h-4")}
                    <span>{tab.label}</span>
                  </div>
                  <span
                    style={{ padding: "2px 8px" }}
                    className={`rounded-full text-[11px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#ECF2FF] text-[#5D87FF]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Profile & Live Website Card */}
        <div
          style={{ padding: "18px 20px" }}
          className="border-t border-[#EAEFF4] bg-[#FAFBFD]"
        >
          <Link
            href="/"
            target="_blank"
            style={{ padding: "10px 14px", marginBottom: "14px" }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ECF2FF] hover:bg-[#5D87FF] text-[#5D87FF] hover:text-white text-xs font-bold transition-all"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <span>Open Public Website</span>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                style={{ width: "36px", height: "36px" }}
                className="rounded-full bg-[#5D87FF] text-white flex items-center justify-center font-bold text-xs shadow-xs"
              >
                AD
              </div>
              <div>
                <span className="block text-xs font-bold text-[#2A3547]">
                  Admin Lead
                </span>
                <span className="block text-[11px] text-[#7C8FAC]">
                  GCU ShutterScape
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              style={{ padding: "6px 12px" }}
              className="rounded-lg bg-[#FDEDE8] hover:bg-[#FA896B] text-[#FA896B] hover:text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* ============================================================
          MAIN WORKSPACE CANVAS
          ============================================================ */}
      <div className="flex-1 min-w-0 min-h-screen flex flex-col">
        {/* Top Enterprise Header Bar */}
        <header
          style={{ padding: "20px 32px" }}
          className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#EAEFF4] flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div
              style={{ width: "44px", height: "44px" }}
              className="rounded-xl bg-[#ECF2FF] text-[#5D87FF] flex items-center justify-center shrink-0"
            >
              {getTabIcon(activeTab, "w-5 h-5")}
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#2A3547] tracking-tight">
                {activeTabMeta.label}
              </h1>
              <p
                style={{ marginTop: "2px" }}
                className="text-xs text-[#7C8FAC]"
              >
                {activeTabMeta.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={refreshAllData}
              style={{ padding: "10px 14px" }}
              className="rounded-xl border border-[#DFE5EF] bg-white hover:bg-[#F6F9FC] text-[#5A6A85] text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <svg
                className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Sync</span>
            </button>

            {["gallery", "activities", "committee", "reels"].includes(
              activeTab
            ) && (
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="cms-primary-btn"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.4}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>
                  Add New{" "}
                  {activeTab === "gallery"
                    ? "Frame"
                    : activeTab === "committee"
                    ? "Member"
                    : activeTab === "reels"
                    ? "Reel"
                    : "Event"}
                </span>
              </button>
            )}
          </div>
        </header>

        {/* Main Workspace Container */}
        <div
          style={{ padding: "28px 32px 48px" }}
          className="flex-1 flex flex-col gap-6 max-w-[1680px] w-full mx-auto"
        >
          {/* ============================================================
              EXECUTIVE KPI SUMMARY ROW (MaterialPro Style)
              ============================================================ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <div className="cms-kpi-card">
              <div>
                <span className="text-xs font-semibold text-[#7C8FAC] block">
                  Visual Archive Frames
                </span>
                <span
                  style={{ marginTop: "4px" }}
                  className="text-2xl font-extrabold text-[#2A3547] block"
                >
                  {galleryList.length}
                </span>
                <span
                  style={{ marginTop: "4px" }}
                  className="text-[11px] font-semibold text-[#13DEB9] block"
                >
                  35mm & 120 Contact Sheets
                </span>
              </div>
              <div
                style={{ width: "48px", height: "48px" }}
                className="rounded-2xl bg-[#ECF2FF] text-[#5D87FF] flex items-center justify-center shrink-0"
              >
                {getTabIcon("gallery", "w-6 h-6")}
              </div>
            </div>

            <div className="cms-kpi-card">
              <div>
                <span className="text-xs font-semibold text-[#7C8FAC] block">
                  Chronology Events
                </span>
                <span
                  style={{ marginTop: "4px" }}
                  className="text-2xl font-extrabold text-[#2A3547] block"
                >
                  {activityList.length}
                </span>
                <span
                  style={{ marginTop: "4px" }}
                  className="text-[11px] font-semibold text-[#5D87FF] block"
                >
                  {activityList.filter((a) => a.isUpcoming).length} Upcoming
                  Live RSVP
                </span>
              </div>
              <div
                style={{ width: "48px", height: "48px" }}
                className="rounded-2xl bg-[#E6FFFA] text-[#13DEB9] flex items-center justify-center shrink-0"
              >
                {getTabIcon("activities", "w-6 h-6")}
              </div>
            </div>

            <div className="cms-kpi-card">
              <div>
                <span className="text-xs font-semibold text-[#7C8FAC] block">
                  Committee Roster
                </span>
                <span
                  style={{ marginTop: "4px" }}
                  className="text-2xl font-extrabold text-[#2A3547] block"
                >
                  {committeeList.length}
                </span>
                <span
                  style={{ marginTop: "4px" }}
                  className="text-[11px] font-semibold text-[#FFAE1F] block"
                >
                  Mentors, Leads & Core
                </span>
              </div>
              <div
                style={{ width: "48px", height: "48px" }}
                className="rounded-2xl bg-[#FEF5E5] text-[#FFAE1F] flex items-center justify-center shrink-0"
              >
                {getTabIcon("committee", "w-6 h-6")}
              </div>
            </div>

            <div className="cms-kpi-card">
              <div>
                <span className="text-xs font-semibold text-[#7C8FAC] block">
                  Scene Reels & Exhibits
                </span>
                <span
                  style={{ marginTop: "4px" }}
                  className="text-2xl font-extrabold text-[#2A3547] block"
                >
                  {heroReelList.length + pullInList.length + reelsList.length}
                </span>
                <span
                  style={{ marginTop: "4px" }}
                  className="text-[11px] font-semibold text-[#FA896B] block"
                >
                  Hero, Corridor & Motion
                </span>
              </div>
              <div
                style={{ width: "48px", height: "48px" }}
                className="rounded-2xl bg-[#FDEDE8] text-[#FA896B] flex items-center justify-center shrink-0"
              >
                {getTabIcon("reels", "w-6 h-6")}
              </div>
            </div>
          </div>

          {/* ============================================================
              ELEVATED SEARCH & SEGMENTED FILTER BAR CARD
              ============================================================ */}
          <div
            style={{ padding: "16px 22px" }}
            className="bg-white rounded-2xl border border-[#EAEFF4] shadow-[0_4px_20px_rgba(145,158,171,0.06)] flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            {/* Search Box with non-overlapping icon */}
            <div className="relative w-full lg:w-96">
              <svg
                style={{ left: "14px" }}
                className="w-4 h-4 text-[#7C8FAC] absolute top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                placeholder={`Search ${activeTabMeta.label.toLowerCase()}...`}
                className="cms-search-input"
              />
            </div>

            {/* Category Filter Pills for Gallery */}
            {activeTab === "gallery" && (
              <div
                style={{ padding: "5px" }}
                className="flex items-center gap-1.5 bg-[#F4F7FE] rounded-xl border border-[#EAEFF4] overflow-x-auto"
              >
                {[
                  "ALL",
                  "DOCUMENTARY",
                  "PORTRAITURE",
                  "LANDSCAPE",
                  "ARCHITECTURE",
                  "STREET",
                  "EXPERIMENTAL",
                ].map((cat) => {
                  const isSelected = filterCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFilterCategory(cat)}
                      className={`cms-filter-pill ${
                        isSelected ? "active" : "inactive"
                      }`}
                    >
                      {cat === "ALL" ? "All Categories" : cat}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Year Filter Pills for Activities */}
            {activeTab === "activities" && (
              <div
                style={{ padding: "5px" }}
                className="flex items-center gap-1.5 bg-[#F4F7FE] rounded-xl border border-[#EAEFF4]"
              >
                {["ALL", "2026", "2025"].map((yr) => {
                  const isSelected = filterCategory === yr;
                  return (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setFilterCategory(yr)}
                      className={`cms-filter-pill ${
                        isSelected ? "active" : "inactive"
                      }`}
                    >
                      {yr === "ALL" ? "All Years" : `Works '${yr.slice(-2)}`}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ============================================================
              TAB 1: VISUAL ARCHIVE GALLERY GRID
              ============================================================ */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryList
                .filter((item) => {
                  if (
                    filterCategory !== "ALL" &&
                    item.category !== filterCategory
                  )
                    return false;
                  if (!searchQuery) return true;
                  const q = searchQuery.toLowerCase();
                  return (
                    item.title.toLowerCase().includes(q) ||
                    item.photographer.toLowerCase().includes(q) ||
                    item.category.toLowerCase().includes(q) ||
                    item.filmStock.toLowerCase().includes(q)
                  );
                })
                .map((item, idx) => (
                  <div
                    key={item._id || item.id || idx}
                    className="cms-card group"
                  >
                    <div className="relative aspect-[16/10] w-full bg-[#F1F5F9] overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="400px"
                        unoptimized
                      />
                      <div
                        style={{ top: "12px", left: "12px" }}
                        className="cms-badge absolute bg-white/95 text-[#5D87FF] shadow-xs"
                      >
                        {item.category}
                      </div>
                      <div
                        style={{
                          bottom: "12px",
                          right: "12px",
                          padding: "4px 10px",
                        }}
                        className="absolute rounded-md bg-[#2A3547]/85 backdrop-blur-xs text-white text-[10px] font-mono font-semibold"
                      >
                        {item.filmStock}
                      </div>
                    </div>

                    <div className="cms-card-body">
                      <div>
                        <h3 className="text-[15px] font-bold text-[#2A3547] group-hover:text-[#5D87FF] transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <p
                          style={{ marginTop: "4px" }}
                          className="text-xs font-semibold text-[#5D87FF]"
                        >
                          By {item.photographer}
                        </p>
                        <p
                          style={{ marginTop: "10px" }}
                          className="text-xs text-[#7C8FAC] line-clamp-2 leading-relaxed min-h-[36px]"
                        >
                          {item.description}
                        </p>
                      </div>

                      <div
                        style={{ marginTop: "18px", paddingTop: "14px" }}
                        className="border-t border-[#EAEFF4] flex items-center justify-between gap-2"
                      >
                        <span
                          style={{ padding: "4px 8px" }}
                          className="font-mono text-[11px] text-[#5A6A85] bg-[#F4F7FE] rounded-md truncate max-w-[130px]"
                        >
                          {item.exif || item.location}
                        </span>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(item)}
                            className="cms-action-edit"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteItem(item._id || item.id || "")
                            }
                            className="cms-action-delete"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* ============================================================
              TAB 2: HERO CONTACT REEL (01A - 06F)
              ============================================================ */}
          {activeTab === "hero" && (
            <div className="flex flex-col gap-5">
              <div
                style={{ padding: "14px 20px" }}
                className="rounded-xl bg-[#ECF2FF] border border-[#D3E2FF] text-[#5D87FF] text-xs font-semibold flex items-center gap-3"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" d="M12 16v-4m0-4h.01" />
                </svg>
                <span>
                  These 6 vertical 35mm frames appear directly on the right side
                  of the camera aperture hero on the live website.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {heroReelList.map((item, idx) => (
                  <div
                    key={item._id || item.frameCode || idx}
                    className="cms-card"
                  >
                    <div className="relative aspect-[3/4] w-full bg-[#F1F5F9] overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="300px"
                        unoptimized
                      />
                      <div
                        style={{ top: "12px", left: "12px" }}
                        className="cms-badge absolute bg-[#5D87FF] text-white shadow-xs"
                      >
                        {item.frameCode}
                      </div>
                    </div>

                    <div className="cms-card-body">
                      <div>
                        <h3 className="text-sm font-bold text-[#2A3547] line-clamp-1">
                          {item.title}
                        </h3>
                        <p
                          style={{ marginTop: "4px" }}
                          className="font-mono text-[11px] text-[#7C8FAC]"
                        >
                          {item.exif}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(item)}
                        style={{ marginTop: "14px", width: "100%" }}
                        className="cms-action-edit justify-center"
                      >
                        Change Frame
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 3: PULL-IN CORRIDOR EXHIBITS (01 - 08)
              ============================================================ */}
          {activeTab === "pullin" && (
            <div className="flex flex-col gap-5">
              <div
                style={{ padding: "14px 20px" }}
                className="rounded-xl bg-[#ECF2FF] border border-[#D3E2FF] text-[#5D87FF] text-xs font-semibold flex items-center gap-3"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" d="M12 16v-4m0-4h.01" />
                </svg>
                <span>
                  The 8 3D perspective depth exhibits featured during the home
                  corridor scroll sequence.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {pullInList.map((item, idx) => (
                  <div key={item._id || item.code || idx} className="cms-card">
                    <div className="relative aspect-[16/10] w-full bg-[#F1F5F9] overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="400px"
                        unoptimized
                      />
                      <div
                        style={{ top: "12px", left: "12px" }}
                        className="cms-badge absolute bg-[#5D87FF] text-white shadow-xs"
                      >
                        {item.code}
                      </div>
                    </div>

                    <div className="cms-card-body">
                      <div>
                        <h3 className="text-[15px] font-bold text-[#2A3547]">
                          {item.title}
                        </h3>
                        <p
                          style={{ marginTop: "4px" }}
                          className="text-xs font-semibold text-[#5D87FF]"
                        >
                          {item.subTitle}
                        </p>
                        <p
                          style={{ marginTop: "8px" }}
                          className="text-xs text-[#7C8FAC] italic line-clamp-2"
                        >
                          &ldquo;{item.headline}&rdquo;
                        </p>
                      </div>

                      <div
                        style={{ marginTop: "16px", paddingTop: "14px" }}
                        className="border-t border-[#EAEFF4] flex items-center justify-between"
                      >
                        <span className="font-mono text-[11px] text-[#7C8FAC]">
                          {item.exif}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item)}
                          className="cms-action-edit"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 4: COMMITTEE ROSTER
              ============================================================ */}
          {activeTab === "committee" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {committeeList
                .filter((m) => {
                  if (!searchQuery) return true;
                  const q = searchQuery.toLowerCase();
                  return (
                    m.name.toLowerCase().includes(q) ||
                    m.role.toLowerCase().includes(q) ||
                    m.tier.toLowerCase().includes(q)
                  );
                })
                .map((m, idx) => (
                  <div key={m._id || idx} className="cms-card">
                    <div className="relative aspect-[4/5] w-full bg-[#F1F5F9] overflow-hidden">
                      <Image
                        src={m.img}
                        alt={m.name}
                        fill
                        className="object-cover"
                        sizes="300px"
                        unoptimized
                      />
                      <div
                        style={{ top: "12px", left: "12px" }}
                        className="cms-badge absolute bg-white/95 text-[#5D87FF] shadow-xs"
                      >
                        {m.tier}
                      </div>
                    </div>

                    <div className="cms-card-body">
                      <div>
                        <h3 className="text-[15px] font-bold text-[#2A3547] line-clamp-1">
                          {m.name}
                        </h3>
                        <p
                          style={{ marginTop: "4px" }}
                          className="text-xs font-semibold text-[#5D87FF]"
                        >
                          {m.role}
                        </p>
                        {m.dept && (
                          <p
                            style={{ marginTop: "4px" }}
                            className="text-[11px] text-[#7C8FAC] line-clamp-1"
                          >
                            {m.dept}
                          </p>
                        )}
                      </div>

                      <div
                        style={{ marginTop: "16px", paddingTop: "14px" }}
                        className="border-t border-[#EAEFF4] flex items-center justify-between gap-2"
                      >
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(m)}
                          className="cms-action-edit"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(m._id || "")}
                          className="cms-action-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* ============================================================
              TAB 5: ACTIVITIES & TIMELINE
              ============================================================ */}
          {activeTab === "activities" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activityList
                .filter((ev) => {
                  if (filterCategory !== "ALL" && ev.year !== filterCategory)
                    return false;
                  if (!searchQuery) return true;
                  const q = searchQuery.toLowerCase();
                  return (
                    ev.title.toLowerCase().includes(q) ||
                    ev.shortTitle.toLowerCase().includes(q) ||
                    ev.category.toLowerCase().includes(q) ||
                    ev.location.toLowerCase().includes(q)
                  );
                })
                .map((ev, idx) => (
                  <div key={ev._id || idx} className="cms-card">
                    <div className="relative aspect-[16/10] w-full bg-[#F1F5F9] overflow-hidden">
                      <Image
                        src={ev.img}
                        alt={ev.title}
                        fill
                        className="object-cover"
                        sizes="400px"
                        unoptimized
                      />
                      <div
                        style={{ top: "12px", left: "12px" }}
                        className="absolute flex items-center gap-2"
                      >
                        <span className="cms-badge bg-white/95 text-[#5D87FF] shadow-xs">
                          {ev.category} · {ev.year}
                        </span>
                        {ev.isUpcoming && (
                          <span className="cms-badge bg-[#E6FFFA] text-[#13DEB9] shadow-xs flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#13DEB9] animate-pulse" />
                            UPCOMING
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          bottom: "12px",
                          right: "12px",
                          padding: "4px 10px",
                        }}
                        className="absolute rounded-md bg-white/95 text-[11px] font-bold text-[#2A3547] shadow-xs"
                      >
                        {ev.date}
                      </div>
                    </div>

                    <div className="cms-card-body">
                      <div>
                        <span className="text-[10.5px] tracking-wider text-[#7C8FAC] uppercase font-bold block">
                          {ev.shortTitle}
                        </span>
                        <h3
                          style={{ marginTop: "4px" }}
                          className="text-[15px] font-bold text-[#2A3547]"
                        >
                          {ev.title}
                        </h3>
                        <p
                          style={{ marginTop: "4px" }}
                          className="text-xs font-semibold text-[#5D87FF]"
                        >
                          {ev.location}
                        </p>
                        <p
                          style={{ marginTop: "10px" }}
                          className="text-xs text-[#7C8FAC] line-clamp-2 leading-relaxed"
                        >
                          {ev.description}
                        </p>
                      </div>

                      <div
                        style={{ marginTop: "18px", paddingTop: "14px" }}
                        className="border-t border-[#EAEFF4] flex items-center justify-between"
                      >
                        <span className="font-mono text-[11px] text-[#7C8FAC]">
                          {ev.filmStock || ev.exif}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(ev)}
                            className="cms-action-edit"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(ev._id || "")}
                            className="cms-action-delete"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* ============================================================
              TAB 6: MOTION VIDEO REELS
              ============================================================ */}
          {activeTab === "reels" && (
            <div className="flex flex-col gap-5">
              <div
                style={{ padding: "14px 20px" }}
                className="rounded-xl bg-[#ECF2FF] border border-[#D3E2FF] text-[#5D87FF] text-xs font-semibold flex items-center gap-3"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" d="M12 16v-4m0-4h.01" />
                </svg>
                <span>
                  Vertical phone video reels featured in the &ldquo;Frames of
                  Moments&rdquo; section. Upload .mp4 or .webm files directly
                  from your computer.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {reelsList.map((reel, idx) => (
                  <div key={reel._id || idx} className="cms-card">
                    <div className="relative aspect-[9/16] w-full bg-[#0F172A] flex items-center justify-center overflow-hidden">
                      <video
                        src={reel.videoSrc}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                      <div
                        style={{ top: "12px", left: "12px" }}
                        className="cms-badge absolute bg-white/95 text-[#5D87FF] shadow-xs"
                      >
                        REEL #{idx + 1}
                      </div>
                    </div>

                    <div className="cms-card-body">
                      <div>
                        <p className="text-[10px] font-bold text-[#7C8FAC] uppercase">
                          Creator
                        </p>
                        <h3
                          style={{ marginTop: "2px" }}
                          className="text-sm font-bold text-[#2A3547] line-clamp-1"
                        >
                          {reel.photographer}
                        </h3>
                      </div>

                      <div
                        style={{ marginTop: "14px", paddingTop: "12px" }}
                        className="border-t border-[#EAEFF4] flex items-center justify-between gap-2"
                      >
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(reel)}
                          className="cms-action-edit"
                        >
                          Replace
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(reel._id || "")}
                          className="cms-action-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================
          MODAL DRAWER / DIALOG (Enterprise Clean Form)
          ============================================================ */}
      {isModalOpen && (
        <div
          style={{ padding: "20px" }}
          className="fixed inset-0 z-50 bg-[#1E293B]/50 backdrop-blur-xs flex items-center justify-center overflow-y-auto"
        >
          <div className="bg-white border border-[#EAEFF4] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div
              style={{ padding: "22px 28px" }}
              className="border-b border-[#EAEFF4] flex items-center justify-between bg-[#F8FAFC]"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5D87FF] block">
                  {modalMode === "create"
                    ? "Create New Record"
                    : "Update Existing Record"}
                </span>
                <h2
                  style={{ marginTop: "2px" }}
                  className="text-lg font-bold text-[#2A3547]"
                >
                  {activeTabMeta.label}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ width: "34px", height: "34px" }}
                className="rounded-lg bg-white hover:bg-slate-100 border border-[#DFE5EF] text-[#5A6A85] flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Form Body */}
            <form
              onSubmit={handleSaveItem}
              style={{ padding: "24px 28px" }}
              className="flex flex-col gap-5 overflow-y-auto flex-1 text-xs"
            >
              <div
                style={{ padding: "18px" }}
                className="rounded-xl bg-[#F8FAFC] border border-[#EAEFF4]"
              >
                <FileUploadZone
                  value={
                    activeTab === "reels"
                      ? editingItem.videoSrc || ""
                      : editingItem.src || editingItem.img || ""
                  }
                  onChange={(url) => {
                    if (activeTab === "reels") {
                      setEditingItem({ ...editingItem, videoSrc: url });
                    } else if (
                      activeTab === "activities" ||
                      activeTab === "committee"
                    ) {
                      setEditingItem({ ...editingItem, img: url });
                    } else {
                      setEditingItem({ ...editingItem, src: url });
                    }
                  }}
                  accept={activeTab === "reels" ? "video" : "image"}
                  label={
                    activeTab === "reels"
                      ? "Upload Video Reel (MP4 / WebM)"
                      : "Upload Photography / Artwork Frame"
                  }
                  helperText={
                    activeTab === "reels"
                      ? "Upload vertical video reel directly from your computer"
                      : "Upload high-res photography directly from your computer"
                  }
                />
              </div>

              {activeTab === "gallery" && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Frame Title
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.title || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            title: e.target.value,
                          })
                        }
                        placeholder="e.g. Monsoon Over Brahmaputra"
                        className="cms-form-input"
                      />
                    </div>
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Category
                      </label>
                      <select
                        value={editingItem.category || "DOCUMENTARY"}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            category: e.target.value,
                          })
                        }
                        className="cms-form-input"
                      >
                        {[
                          "DOCUMENTARY",
                          "PORTRAITURE",
                          "LANDSCAPE",
                          "ARCHITECTURE",
                          "STREET",
                          "EXPERIMENTAL",
                        ].map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Photographer Credit
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.photographer || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            photographer: e.target.value,
                          })
                        }
                        placeholder="e.g. Riky"
                        className="cms-form-input"
                      />
                    </div>
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Film Stock / Emulsion
                      </label>
                      <input
                        type="text"
                        value={editingItem.filmStock || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            filmStock: e.target.value,
                          })
                        }
                        placeholder="e.g. KODAK PORTRA 400"
                        className="cms-form-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        EXIF Specifications
                      </label>
                      <input
                        type="text"
                        value={editingItem.exif || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            exif: e.target.value,
                          })
                        }
                        placeholder="e.g. 35MM · F/2.0 · 1/1000S"
                        className="cms-form-input font-mono"
                      />
                    </div>
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        value={editingItem.location || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            location: e.target.value,
                          })
                        }
                        placeholder="e.g. Guwahati Riverfront"
                        className="cms-form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{ marginBottom: "6px" }}
                      className="block text-xs font-bold text-[#2A3547]"
                    >
                      Inspection Loupe Extended Description
                    </label>
                    <textarea
                      rows={3}
                      value={editingItem.description || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          description: e.target.value,
                        })
                      }
                      placeholder="Backstory, lighting technique, and artistic intention..."
                      className="cms-form-input"
                    />
                  </div>
                </div>
              )}

              {activeTab === "activities" && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Short Title (Card Header)
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.shortTitle || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            shortTitle: e.target.value,
                          })
                        }
                        placeholder="e.g. BRAHMAPUTRA 4.0"
                        className="cms-form-input font-bold"
                      />
                    </div>
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Collection Year
                      </label>
                      <select
                        value={editingItem.year || "2026"}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            year: e.target.value,
                          })
                        }
                        className="cms-form-input"
                      >
                        <option value="2026">WORKS &apos;26</option>
                        <option value="2025">WORKS &apos;25</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      style={{ marginBottom: "6px" }}
                      className="block text-xs font-bold text-[#2A3547]"
                    >
                      Full Event Title
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.title || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          title: e.target.value,
                        })
                      }
                      placeholder="e.g. Brahmaputra Heritage Photowalk 4.0"
                      className="cms-form-input"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Category
                      </label>
                      <select
                        value={editingItem.category || "PHOTOWALK"}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            category: e.target.value,
                          })
                        }
                        className="cms-form-input"
                      >
                        {[
                          "PHOTOWALK",
                          "WORKSHOP",
                          "EXHIBITION",
                          "COMPETITION",
                        ].map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Event Date
                      </label>
                      <input
                        type="text"
                        value={editingItem.date || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            date: e.target.value,
                          })
                        }
                        placeholder="NOV 14, 2026"
                        className="cms-form-input"
                      />
                    </div>
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        value={editingItem.location || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            location: e.target.value,
                          })
                        }
                        placeholder="GCU Media Lab"
                        className="cms-form-input"
                      />
                    </div>
                  </div>

                  <div
                    style={{ padding: "14px 18px" }}
                    className="rounded-xl bg-[#F8FAFC] border border-[#EAEFF4] flex items-center justify-between"
                  >
                    <div>
                      <span className="block text-xs font-bold text-[#2A3547]">
                        Live RSVP Status
                      </span>
                      <span className="block text-[11px] text-[#7C8FAC]">
                        Displays the pulsing green &ldquo;UPCOMING&rdquo; badge
                        across the timeline.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={Boolean(editingItem.isUpcoming)}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          isUpcoming: e.target.checked,
                        })
                      }
                      className="w-4 h-4 accent-[#5D87FF] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label
                      style={{ marginBottom: "6px" }}
                      className="block text-xs font-bold text-[#2A3547]"
                    >
                      Event Description
                    </label>
                    <textarea
                      rows={3}
                      value={editingItem.description || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          description: e.target.value,
                        })
                      }
                      placeholder="Details, gear requirements, and itinerary..."
                      className="cms-form-input"
                    />
                  </div>
                </div>
              )}

              {activeTab === "committee" && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.name || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            name: e.target.value,
                          })
                        }
                        placeholder="e.g. Dr. Sangeeta Das"
                        className="cms-form-input"
                      />
                    </div>
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Executive Role
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.role || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            role: e.target.value,
                          })
                        }
                        placeholder="e.g. Club Lead / Visual Director"
                        className="cms-form-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Chapter Tier
                      </label>
                      <select
                        value={editingItem.tier || "LEAD"}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            tier: e.target.value,
                          })
                        }
                        className="cms-form-input"
                      >
                        {["MENTOR", "LEAD", "CORE", "FOUNDER", "LEGACY"].map(
                          (t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Department
                      </label>
                      <input
                        type="text"
                        value={editingItem.dept || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            dept: e.target.value,
                          })
                        }
                        placeholder="e.g. Dept. of Computer Science"
                        className="cms-form-input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "hero" && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Frame Code
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.frameCode || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            frameCode: e.target.value,
                          })
                        }
                        placeholder="01A"
                        className="cms-form-input font-mono"
                      />
                    </div>
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Artwork Title
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.title || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            title: e.target.value,
                          })
                        }
                        placeholder="SILENT PEAKS"
                        className="cms-form-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      style={{ marginBottom: "6px" }}
                      className="block text-xs font-bold text-[#2A3547]"
                    >
                      EXIF Specifications
                    </label>
                    <input
                      type="text"
                      value={editingItem.exif || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, exif: e.target.value })
                      }
                      placeholder="85MM · F/1.4 · ISO 200"
                      className="cms-form-input font-mono"
                    />
                  </div>
                </div>
              )}

              {activeTab === "pullin" && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Exhibit Code
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.code || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            code: e.target.value,
                          })
                        }
                        placeholder="EXHIBIT // 01A"
                        className="cms-form-input font-mono"
                      />
                    </div>
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Exhibit Title
                      </label>
                      <input
                        type="text"
                        required
                        value={editingItem.title || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            title: e.target.value,
                          })
                        }
                        placeholder="STREET & SHADOWS"
                        className="cms-form-input"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        Subtitle / Location
                      </label>
                      <input
                        type="text"
                        value={editingItem.subTitle || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            subTitle: e.target.value,
                          })
                        }
                        placeholder="Guwahati Dusk"
                        className="cms-form-input"
                      />
                    </div>
                    <div>
                      <label
                        style={{ marginBottom: "6px" }}
                        className="block text-xs font-bold text-[#2A3547]"
                      >
                        EXIF Specs
                      </label>
                      <input
                        type="text"
                        value={editingItem.exif || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            exif: e.target.value,
                          })
                        }
                        placeholder="f/2.8 · 1/500s · ISO 400"
                        className="cms-form-input font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      style={{ marginBottom: "6px" }}
                      className="block text-xs font-bold text-[#2A3547]"
                    >
                      Headline Text
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.headline || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          headline: e.target.value,
                        })
                      }
                      placeholder="Moments Suspended in Light"
                      className="cms-form-input"
                    />
                  </div>
                </div>
              )}

              {activeTab === "reels" && (
                <div>
                  <label
                    style={{ marginBottom: "6px" }}
                    className="block text-xs font-bold text-[#2A3547]"
                  >
                    Photographer / Creator Credit
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.photographer || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        photographer: e.target.value,
                      })
                    }
                    placeholder="e.g. Aman Baha"
                    className="cms-form-input"
                  />
                </div>
              )}

              <div
                style={{ paddingTop: "18px", marginTop: "6px" }}
                className="border-t border-[#EAEFF4] flex items-center justify-end gap-3"
              >
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="cms-action-edit"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingItem}
                  className="cms-primary-btn"
                >
                  {savingItem && (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  )}
                  <span>
                    {modalMode === "create" ? "Create Record" : "Save Changes"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Status Toast Alert */}
      {statusToast && (
        <div
          style={{ padding: "14px 20px" }}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl text-xs font-bold shadow-xl ${
            statusToast.type === "success"
              ? "bg-[#E6FFFA] border border-[#13DEB9]/40 text-[#0F766E]"
              : "bg-[#FDEDE8] border border-[#FA896B]/40 text-[#C2410C]"
          }`}
        >
          <span>{statusToast.text}</span>
        </div>
      )}
    </div>
  );
}
