// src/app/api/committee/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { CommitteeMember } from "@/models/CommitteeMember";

// Default Committee Roster matching about/page.tsx
const DEFAULT_COMMITTEE = [
  // Chapter 02: Faculty Mentors
  { name: "Dr. Sangeeta Das", role: "Coordinator", dept: "Dept. of Mechanical Engineering", tier: "MENTOR", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800", order: 1 },
  { name: "Dr. Barsha Chhetri", role: "Co-Coordinator", dept: "Assistant Professor & Head (i/c) Dept. of Education", tier: "MENTOR", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800", order: 2 },
  // Chapter 03: Executive Leads
  { name: "Uttama Purkayastha", role: "PRESIDENT", dept: "Executive Board", tier: "LEAD", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800", order: 3 },
  { name: "Ikhyt De Neog", role: "VICE-PRESIDENT", dept: "Executive Board", tier: "LEAD", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800", order: 4 },
  { name: "Richita Sarma", role: "SECRETARY", dept: "Executive Board", tier: "LEAD", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800", order: 5 },
  // Chapter 04: Core Committee
  { name: "Sohaib Hussain", role: "Core Committee", dept: "Photography Lead", tier: "CORE", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600", order: 6 },
  { name: "Mahadananda Dutta", role: "Core Committee", dept: "Darkroom Specialist", tier: "CORE", img: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=600", order: 7 },
  { name: "Manash Pratim Sarma", role: "Core Committee", dept: "Logistics Lead", tier: "CORE", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600", order: 8 },
  { name: "Mubina Ahmed", role: "Core Committee", dept: "Documentation", tier: "CORE", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600", order: 9 },
  { name: "Pratyush B. Choudhury", role: "Core Committee", dept: "Archival Curator", tier: "CORE", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600", order: 10 },
  { name: "Hiya Das", role: "Core Committee", dept: "Visual Design", tier: "CORE", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600", order: 11 },
  // Chapter 05: Founders
  { name: "Dheemaan Deka", role: "Founding Visionary", dept: "Founders Council", tier: "FOUNDER", img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=800", order: 12 },
  { name: "Subhrajyoti Goswami", role: "Founding Visionary", dept: "Founders Council", tier: "FOUNDER", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800", order: 13 },
  // Chapter 06: Legacy Torchbearers
  { name: "Riky", role: "Legacy Lead", dept: "Alumni Council", tier: "LEGACY", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800", order: 14 },
  { name: "Pratyashi P. Das", role: "Legacy Lead", dept: "Alumni Council", tier: "LEGACY", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800", order: 15 },
  { name: "Akash Boro", role: "Legacy Lead", dept: "Alumni Council", tier: "LEGACY", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800", order: 16 },
  { name: "Aparna Mishra", role: "Legacy Lead", dept: "Alumni Council", tier: "LEGACY", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800", order: 17 },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tier = searchParams.get("tier");

    const conn = await connectDB();
    if (!conn) {
      const filtered = tier ? DEFAULT_COMMITTEE.filter((m) => m.tier === tier) : DEFAULT_COMMITTEE;
      return NextResponse.json({ success: true, data: filtered, source: "fallback" });
    }

    const query: Record<string, unknown> = {};
    if (tier) query.tier = tier;

    const items = await CommitteeMember.find(query).sort({ order: 1 });
    if (!items || items.length === 0) {
      const filtered = tier ? DEFAULT_COMMITTEE.filter((m) => m.tier === tier) : DEFAULT_COMMITTEE;
      return NextResponse.json({ success: true, data: filtered, source: "default" });
    }

    return NextResponse.json({ success: true, data: items, source: "database" });
  } catch (error) {
    console.error("GET /api/committee error:", error);
    return NextResponse.json({ success: true, data: DEFAULT_COMMITTEE, source: "fallback" });
  }
}

export async function POST(request: Request) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    const body = await request.json();
    const count = await CommitteeMember.countDocuments();
    const newMember = await CommitteeMember.create({
      ...body,
      order: body.order || count + 1,
    });

    return NextResponse.json({ success: true, data: newMember }, { status: 201 });
  } catch (error) {
    console.error("POST /api/committee error:", error);
    return NextResponse.json({ error: "Failed to add committee member" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    const body = await request.json();
    const { id, _id, ...updates } = body;
    const targetId = id || _id;

    if (!targetId) {
      return NextResponse.json({ error: "Member ID is required" }, { status: 400 });
    }

    const updated = await CommitteeMember.findByIdAndUpdate(targetId, updates, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT /api/committee error:", error);
    return NextResponse.json({ error: "Failed to update committee member" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Member ID is required" }, { status: 400 });
    }

    await CommitteeMember.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/committee error:", error);
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 });
  }
}
