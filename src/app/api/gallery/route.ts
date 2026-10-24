// src/app/api/gallery/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { GalleryFrame } from "@/models/GalleryFrame";

// 25 Default Frames fallback matching gallery/page.tsx
const DEFAULT_GALLERY = [
  { id: "g-01", title: "Monsoon Over Brahmaputra", category: "DOCUMENTARY", photographer: "Riky", location: "Brahmaputra Riverfront", filmStock: "KODAK TRI-X 400", exif: "35MM · F/2.0", src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=85", description: "Golden-hour riverfront documentation capturing ferry silhouettes." },
  { id: "g-02", title: "Chiaroscuro Gaze", category: "PORTRAITURE", photographer: "Pratyashi P. Das", location: "GCU Studio Lab", filmStock: "KODAK PORTRA 800", exif: "85MM · F/1.4", src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1400&q=85", description: "High-contrast Xenon strobe portrait exploring deep tonal gradients." },
  { id: "g-03", title: "Himalayan Alpenglow", category: "LANDSCAPE", photographer: "Akash Boro", location: "Eastern Himalayan Ridge", filmStock: "FUJIFILM VELVIA 50", exif: "70MM · F/4.0", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85", description: "Dawn mountain exposure capturing atmospheric cloud compression." },
  { id: "g-04", title: "Brutalist Geometry", category: "ARCHITECTURE", photographer: "Aparna Mishra", location: "GCU Campus Complex", filmStock: "ILFORD HP5 PLUS", exif: "24MM · F/8.0", src: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1400&q=85", description: "Monochrome architectural study dissecting concrete planes." },
  { id: "g-05", title: "Midnight Neon Drift", category: "STREET", photographer: "Tiku Sarkar", location: "Paltan Bazaar By-lanes", filmStock: "CINESTILL 800T", exif: "50MM · F/1.4", src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1400&q=85", description: "Ambient night capture harnessing the red halation of Cinestill." },
  { id: "g-06", title: "Optics & Refraction", category: "EXPERIMENTAL", photographer: "Bituparna", location: "GCU Optics Clinic", filmStock: "KODAK EKTAR 100", exif: "105MM · F/2.8", src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1400&q=85", description: "Extreme close-up examining manual lens aperture blades." },
  { id: "g-07", title: "Silent Peaks At Dawn", category: "LANDSCAPE", photographer: "Arjun Talukdar", location: "Kamrup Foothills", filmStock: "FUJIFILM PROVIA 100F", exif: "85MM · F/1.4", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85", description: "Minimalist alpine silhouette at first light with atmospheric haze." },
  { id: "g-08", title: "Golden Horizon Ferry", category: "DOCUMENTARY", photographer: "Priyanka Kalita", location: "Umananda Ghat", filmStock: "KODAK GOLD 200", exif: "35MM · F/2.0", src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=85", description: "Commuters boarding the wooden river ferry in golden twilight." },
  { id: "g-09", title: "Urban Solitude", category: "STREET", photographer: "Nayan Jyoti", location: "Panbazar Commercial Zone", filmStock: "ILFORD DELTA 3200", exif: "50MM · F/1.8", src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=85", description: "Quiet contemplative moment amidst evening monsoon traffic." },
  { id: "g-10", title: "Studio Xenon Strobe", category: "PORTRAITURE", photographer: "Meghna Barman", location: "GCU Creative Studio", filmStock: "KODAK PORTRA 400", exif: "85MM · F/2.8", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=85", description: "Crisp architectural studio portrait with razor-sharp catchlights." },
  { id: "g-11", title: "Cantilever Shadows", category: "ARCHITECTURE", photographer: "Debashish Roy", location: "GCU Auditorium Wing", filmStock: "KODAK TRI-X 400", exif: "28MM · F/11", src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=85", description: "Geometric play of shadow and light dissecting the concrete louvers." },
  { id: "g-12", title: "Lens Flare Dispersion", category: "EXPERIMENTAL", photographer: "Kunal Saikia", location: "Darkroom Studio 02", filmStock: "CINESTILL 50D", exif: "50MM · F/1.2", src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=85", description: "Prismatic spectral dispersion captured with an uncoated prime lens." },
  { id: "g-13", title: "The Tea Garden Mist", category: "LANDSCAPE", photographer: "Manash Pratim", location: "Upper Assam Estates", filmStock: "FUJIFILM VELVIA 50", exif: "24MM · F/5.6", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=85", description: "Rolling emerald hills of the tea estates caught in the fog." },
  { id: "g-14", title: "Festival of Colors", category: "DOCUMENTARY", photographer: "Sohaib Hussain", location: "GCU Main Courtyard", filmStock: "KODAK EKTAR 100", exif: "35MM · F/2.8", src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&q=85", description: "Vibrant explosion of gulal captured at high shutter speeds." },
  { id: "g-15", title: "Symmetry in Motion", category: "ARCHITECTURE", photographer: "Hiya Das", location: "Library Spiral Staircase", filmStock: "ILFORD HP5 PLUS", exif: "16MM · F/4.0", src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=85", description: "A vertiginous top-down perspective of the brutalist spiral staircase." },
  { id: "g-16", title: "Midnight Rain Reflections", category: "STREET", photographer: "Imran Farhat", location: "GS Road, Guwahati", filmStock: "CINESTILL 800T", exif: "50MM · F/1.4", src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1200&q=85", description: "Cinematic puddle reflection capturing headlights and neon signs." },
  { id: "g-17", title: "Analog Chemistry", category: "EXPERIMENTAL", photographer: "Rupankar", location: "Darkroom Studio 01", filmStock: "ILFORD MULTIGRADE", exif: "50MM · F/4.0", src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=85", description: "Silver particles developing in fixer under safe-light red." },
  { id: "g-18", title: "Monsoon Silhouette", category: "PORTRAITURE", photographer: "Sneha Kalita", location: "GCU Campus Corridors", filmStock: "KODAK GOLD 200", exif: "50MM · F/2.0", src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=85", description: "A quiet moment framed by the brutalist campus architecture." },
  { id: "g-19", title: "Market Chaos", category: "DOCUMENTARY", photographer: "Riky", location: "Fancy Bazaar", filmStock: "KODAK PORTRA 400", exif: "35MM · F/5.6", src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=85", description: "The beautiful, overwhelming chaos of the Sunday morning market." },
  { id: "g-20", title: "Glacial Melt", category: "LANDSCAPE", photographer: "Akash Boro", location: "Tawang Valley", filmStock: "FUJIFILM PROVIA", exif: "16MM · F/8.0", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85", description: "High altitude rivers carving through the rocky moraine." },
  { id: "g-21", title: "Neon Rain", category: "STREET", photographer: "Tiku Sarkar", location: "Christian Basti", filmStock: "CINESTILL 800T", exif: "85MM · F/1.4", src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&q=85", description: "A lone figure illuminated by the glow of a pharmacy sign in the rain." },
  { id: "g-22", title: "Concrete Ribs", category: "ARCHITECTURE", photographer: "Debashish Roy", location: "Admin Block", filmStock: "ILFORD HP5 PLUS", exif: "24MM · F/8.0", src: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=85", description: "The skeletal structure of the unfinished new academic wing." },
  { id: "g-23", title: "Abstract Motion", category: "EXPERIMENTAL", photographer: "Bituparna", location: "Highway 37", filmStock: "KODAK EKTAR", exif: "50MM · 2S", src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=85", description: "Intentional camera movement (ICM) creating a canvas of light streaks." },
  { id: "g-24", title: "Valley of the Sun", category: "LANDSCAPE", photographer: "Arjun Talukdar", location: "Meghalaya Border", filmStock: "FUJIFILM VELVIA 50", exif: "35MM · F/11", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85", description: "The sun piercing through the dense canopy of the living root bridges." },
  { id: "g-25", title: "Final Exposure", category: "DOCUMENTARY", photographer: "ShutterScape Archive", location: "Assam, India", filmStock: "VARIOUS EMULSIONS", exif: "VARIOUS", src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=85", description: "The culmination of a year of storytelling through the lens." },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const conn = await connectDB();
    if (!conn) {
      const filtered =
        category && category !== "ALL"
          ? DEFAULT_GALLERY.filter((it) => it.category === category)
          : DEFAULT_GALLERY;
      return NextResponse.json({ success: true, data: filtered, source: "fallback" });
    }

    const query: Record<string, unknown> = {};
    if (category && category !== "ALL") {
      query.category = category;
    }

    const items = await GalleryFrame.find(query).sort({ order: 1 });
    if (!items || items.length === 0) {
      const filtered =
        category && category !== "ALL"
          ? DEFAULT_GALLERY.filter((it) => it.category === category)
          : DEFAULT_GALLERY;
      return NextResponse.json({ success: true, data: filtered, source: "default" });
    }

    return NextResponse.json({ success: true, data: items, source: "database" });
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json({ success: true, data: DEFAULT_GALLERY, source: "fallback" });
  }
}

export async function POST(request: Request) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ error: "Database not connected" }, { status: 503 });
    }

    const body = await request.json();
    const count = await GalleryFrame.countDocuments();
    const newFrame = await GalleryFrame.create({
      ...body,
      order: body.order || count + 1,
    });

    return NextResponse.json({ success: true, data: newFrame }, { status: 201 });
  } catch (error) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json({ error: "Failed to create gallery frame" }, { status: 500 });
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
      return NextResponse.json({ error: "Frame ID is required" }, { status: 400 });
    }

    const updated = await GalleryFrame.findByIdAndUpdate(targetId, updates, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT /api/gallery error:", error);
    return NextResponse.json({ error: "Failed to update gallery frame" }, { status: 500 });
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
      return NextResponse.json({ error: "Frame ID is required" }, { status: 400 });
    }

    await GalleryFrame.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Frame deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/gallery error:", error);
    return NextResponse.json({ error: "Failed to delete gallery frame" }, { status: 500 });
  }
}
