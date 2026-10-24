export interface Member {
  id: string;
  name: string;
  role: string;
  category: "faculty" | "behind_the_lens" | "core" | "founders" | "torchbearers";
  categoryLabel: string;
  department?: string;
  bio?: string;
  quote?: string;
  imageUrl: string;
  order: number;
  socials?: {
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
}

export const INITIAL_MEMBERS: Member[] = [
  // ==========================================
  // 1. THE TEACHERS WHO GUIDE US (2 Faculty Advisors)
  // ==========================================
  {
    id: "fac-1",
    name: "Dr. Ananya Sharma",
    role: "Faculty Advisor & Mentor",
    department: "Department of Visual Arts & Communication",
    category: "faculty",
    categoryLabel: "The Teachers Who Guide Us",
    bio: "Pioneering visual storytelling and mentoring generations of student creators across university disciplines.",
    quote: "Photography is not about the camera in your hand; it is the courage to see what others walk past.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    order: 1,
    socials: { email: "ananya.sharma@gcuniversity.ac.in" },
  },
  {
    id: "fac-2",
    name: "Prof. Rajesh Baruah",
    role: "Faculty Coordinator",
    department: "Department of Computer Science & Media",
    category: "faculty",
    categoryLabel: "The Teachers Who Guide Us",
    bio: "Supporting student initiatives, technical workshops, and creative freedom since ShutterScape's inception.",
    quote: "Every frame captured on campus is a piece of living history preserved forever.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
    order: 2,
    socials: { email: "rajesh.baruah@gcuniversity.ac.in" },
  },

  // ==========================================
  // 2. MEET THE 3 PEOPLE BEHIND THE LENS (3 Lead Photographers)
  // ==========================================
  {
    id: "btl-1",
    name: "Arjun Talukdar",
    role: "Director of Photography",
    category: "behind_the_lens",
    categoryLabel: "Meet the 3 People Behind the Lens",
    bio: "Specializing in documentary street photography and cinematic night frames across Assam.",
    quote: "Chasing ambient shadows and quiet moments in loud spaces.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    order: 1,
    socials: { instagram: "https://instagram.com" },
  },
  {
    id: "btl-2",
    name: "Priyanka Roy",
    role: "Lead Portrait & Editorial Artist",
    category: "behind_the_lens",
    categoryLabel: "Meet the 3 People Behind the Lens",
    bio: "Crafting editorial aesthetics, light diffusion studies, and raw human emotions through prime lenses.",
    quote: "Light behaves differently when you treat it with patience.",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
    order: 2,
    socials: { instagram: "https://instagram.com" },
  },
  {
    id: "btl-3",
    name: "Debashish Nath",
    role: "Lead Wildlife & Landscape Explorer",
    category: "behind_the_lens",
    categoryLabel: "Meet the 3 People Behind the Lens",
    bio: "Expedition storyteller documenting northeast wilderness, Brahmaputra dawns, and macro textures.",
    quote: "The best landscapes are the ones that test your endurance before they offer the shot.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    order: 3,
    socials: { instagram: "https://instagram.com" },
  },

  // ==========================================
  // 3. CORE 6 MEMBERS (The Core Committee)
  // ==========================================
  {
    id: "core-1",
    name: "Sneha Goswami",
    role: "President",
    category: "core",
    categoryLabel: "Core 6 Members",
    bio: "Steering club vision, exhibitions, and university collaborations.",
    quote: "Creating an open darkroom where anyone with curiosity belongs.",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80",
    order: 1,
    socials: { instagram: "https://instagram.com" },
  },
  {
    id: "core-2",
    name: "Karan Deka",
    role: "Vice President & Operations",
    category: "core",
    categoryLabel: "Core 6 Members",
    bio: "Managing photowalk expeditions, permissions, and club logistics.",
    quote: "Great shoots succeed long before the camera shutter clicks.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    order: 2,
    socials: { instagram: "https://instagram.com" },
  },
  {
    id: "core-3",
    name: "Rhea Kashyap",
    role: "Head of Curation & Exhibitions",
    category: "core",
    categoryLabel: "Core 6 Members",
    bio: "Curating print galleries, annual showcases, and theme briefs.",
    quote: "Curating is editing life into an unforgettable sequence.",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
    order: 3,
    socials: { instagram: "https://instagram.com" },
  },
  {
    id: "core-4",
    name: "Vikram Bora",
    role: "Workshop & Technical Lead",
    category: "core",
    categoryLabel: "Core 6 Members",
    bio: "Conducting sensor mechanics, post-processing color grading, and lighting clinics.",
    quote: "Master your tools so they become transparent to your vision.",
    imageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80",
    order: 4,
    socials: { instagram: "https://instagram.com" },
  },
  {
    id: "core-5",
    name: "Tanya Saikia",
    role: "Public Relations & Social Head",
    category: "core",
    categoryLabel: "Core 6 Members",
    bio: "Connecting our frames with the university community and digital audiences worldwide.",
    quote: "Every photograph deserves an audience that feels its heartbeat.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    order: 5,
    socials: { instagram: "https://instagram.com" },
  },
  {
    id: "core-6",
    name: "Manash Kalita",
    role: "Finance & Equipment Steward",
    category: "core",
    categoryLabel: "Core 6 Members",
    bio: "Preserving club gear, studio lighting rigs, and sponsorship funding.",
    quote: "Guarding our resources so our creative vision never has to compromise.",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80",
    order: 6,
    socials: { instagram: "https://instagram.com" },
  },

  // ==========================================
  // 4. WHERE IT ALL STARTED (2 Founders)
  // ==========================================
  {
    id: "fnd-1",
    name: "Nilav Hazarika",
    role: "Founding Member (Class of 2023)",
    category: "founders",
    categoryLabel: "Where It All Started — The Pioneers",
    bio: "Drafted the founding charter of ShutterScape with a solitary DSLR and an ambition to unite campus artists.",
    quote: "We started with two cameras and a dream to prove that GCU has stories the world needs to witness.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
    order: 1,
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "fnd-2",
    name: "Abhinav Sarma",
    role: "Founding Member (Class of 2023)",
    category: "founders",
    categoryLabel: "Where It All Started — The Pioneers",
    bio: "Organized our first historic photowalk across the hills of Azara and established our aesthetic identity.",
    quote: "It wasn't about building a club; it was about building a family that looks at the world differently.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    order: 2,
    socials: { linkedin: "https://linkedin.com" },
  },

  // ==========================================
  // 5. THE 4 STUDENTS WHO CARRIED IT FORWARD (Legacy Torchbearers)
  // ==========================================
  {
    id: "tch-1",
    name: "Bishal Barman",
    role: "Senior Mentor & Ex-Vice President",
    category: "torchbearers",
    categoryLabel: "The 4 Students Who Carried It Forward",
    bio: "Scaled our flagship annual exhibition to state-level recognition and mentored incoming batches.",
    quote: "The legacy of a photographer is the photographers they inspire along the way.",
    imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&q=80",
    order: 1,
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "tch-2",
    name: "Ankita Medhi",
    role: "Senior Curator & Ex-Creative Head",
    category: "torchbearers",
    categoryLabel: "The 4 Students Who Carried It Forward",
    bio: "Introduced experimental darkroom editing workshops and established our online photo zine.",
    quote: "True craft is knowing when to let the image speak and when to stay silent.",
    imageUrl: "https://images.unsplash.com/photo-1534751516642-a171ed292022?w=800&q=80",
    order: 2,
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "tch-3",
    name: "Rupam Das",
    role: "Ex-Technical Lead",
    category: "torchbearers",
    categoryLabel: "The 4 Students Who Carried It Forward",
    bio: "Digitized our permanent photo archives and designed the lighting framework for all university galas.",
    quote: "Technical perfection is only a vehicle for artistic honesty.",
    imageUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&q=80",
    order: 3,
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "tch-4",
    name: "Jahnavi Choudhury",
    role: "Ex-Outreach & Photowalk Director",
    category: "torchbearers",
    categoryLabel: "The 4 Students Who Carried It Forward",
    bio: "Spearheaded outreach partnerships with wildlife reserves and urban heritage preservation groups.",
    quote: "Our cameras took us into communities and corners we would have never known.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    order: 4,
    socials: { linkedin: "https://linkedin.com" },
  },
];
