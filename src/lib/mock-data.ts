import { Category, Comment, Report, StatusUpdate, Urgency, User } from "./types";

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const CITIES = [
  { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Delhi", lat: 28.6139, lng: 77.209 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
];

const AREAS_BY_CITY: Record<string, string[]> = {
  Bengaluru: ["Indiranagar", "Koramangala", "Whitefield", "HSR Layout", "Jayanagar", "MG Road"],
  Mumbai: ["Bandra", "Andheri", "Powai", "Lower Parel", "Dadar", "Colaba"],
  Delhi: ["Connaught Place", "Saket", "Karol Bagh", "Dwarka", "Vasant Kunj", "Rohini"],
  Chennai: ["T. Nagar", "Adyar", "Velachery", "Anna Nagar", "Mylapore", "Guindy"],
};

const FIRST_NAMES = [
  "Aanya", "Aarav", "Aditi", "Arjun", "Ira", "Kabir", "Mira", "Nikhil",
  "Pooja", "Rahul", "Rhea", "Rohan", "Sana", "Siddharth", "Tara", "Vikram",
  "Isha", "Karan", "Meera", "Raj", "Zoya", "Yash", "Priya", "Dev",
];
const LAST_NAMES = [
  "Sharma", "Iyer", "Patel", "Kumar", "Singh", "Rao", "Khan", "Desai",
  "Mehta", "Reddy", "Das", "Nair", "Chopra", "Malhotra", "Joshi", "Banerjee",
];

const TITLES_BY_CATEGORY: Record<Category, string[]> = {
  roads: [
    "Massive pothole on main road causing accidents",
    "Broken traffic signal at junction",
    "Road markings faded at school zone",
    "Damaged speed breaker near hospital",
    "Manhole cover missing on arterial road",
    "Collapsed footpath after rains",
  ],
  water: [
    "Major water pipe leak wasting thousands of litres",
    "Drain overflowing onto street during commute hours",
    "No water supply for 3 days in our area",
    "Sewage backup near residential complex",
    "Blocked stormwater drain causing flooding",
    "Contaminated tap water in the neighbourhood",
  ],
  garbage: [
    "Garbage bin overflowing for a week",
    "Illegal dumping in vacant plot",
    "Missed scheduled waste pickup",
    "Dead animal lying on roadside",
    "Construction debris blocking walkway",
    "Recycling bins not collected",
  ],
  electricity: [
    "Street lights not working for past month",
    "Exposed electrical wires posing danger",
    "Frequent power cuts in our area",
    "Transformer making loud buzzing noise",
    "Dangling cable near school entrance",
    "Streetlight pole leaning dangerously",
  ],
  parks: [
    "Fallen tree blocking park entrance",
    "Broken playground equipment",
    "Dying trees need urgent attention",
    "Park lights out since last week",
    "Vandalism at community park",
    "Public fountain not working",
  ],
  safety: [
    "Dark unlit stretch near women's hostel",
    "Dangerous open manhole at intersection",
    "Stray dogs pack causing fear in area",
    "Broken pavement hazardous for elderly",
    "Unsafe construction site with no barriers",
    "Vandalised bus stop shelter",
  ],
};

const DESCRIPTIONS_BY_CATEGORY: Record<Category, string[]> = {
  roads: [
    "The pothole is deep enough to damage vehicles. Already seen two bikes skid here this week. Water collects and makes it invisible in rain. Needs urgent patching.",
    "Traffic signal has been flashing red in all directions for 4 days. Rush hour is chaos. People are crossing dangerously. Please fix before a major accident.",
    "Road lacks any visible markings near the school. Kids cross here daily and drivers don't slow down. Zebra crossing is essential.",
  ],
  water: [
    "Water has been gushing from a broken pipe since Monday. Entire side of the road is wet and the waste is shocking. Please send the BWSSB team.",
    "The drain near our apartment block has been overflowing with sewage for 5 days. Stench is unbearable and mosquitoes are breeding. Health hazard.",
    "No water in our building since Tuesday. 60 families affected. Tankers charging 3x rates. Please restore supply.",
  ],
  garbage: [
    "Garbage truck hasn't come this whole week. Bins are overflowing, dogs are spreading trash, and the smell is unbearable. Please restore service immediately.",
    "Someone has been dumping construction debris in the empty plot every night. It's blocking the walkway and attracting pests. Need CCTV action.",
  ],
  electricity: [
    "Street lights on our entire lane have been dark for over a month. Women don't feel safe walking home after 7pm. Multiple complaints logged already.",
    "Naked electrical wires hanging at chest height near the kids' park. Someone is going to get electrocuted. Please cover them now.",
  ],
  parks: [
    "A large tree fell during the rains and is blocking the main entrance to Cubbon-side park. Kids can't get to the playground. Been 3 days now.",
    "The swing set in the community park is broken with sharp metal exposed. Kids have been hurt. Please repair or remove urgently.",
  ],
  safety: [
    "The stretch between the metro station and the hostel is completely unlit after 8pm. Several incidents reported. Need street lights urgently.",
    "Open manhole at the main intersection, no warning cones. A scooter already fell in last night. Needs immediate cover and barricade.",
  ],
};

const DEPARTMENTS: Record<Category, string> = {
  roads: "BBMP Roads Division",
  water: "BWSSB Water & Sewerage",
  garbage: "BBMP Solid Waste Management",
  electricity: "BESCOM Electricity Board",
  parks: "BBMP Horticulture",
  safety: "BBMP Public Safety Cell",
};

const OFFICERS = [
  "Insp. Ramesh Kumar",
  "Officer Anjali Menon",
  "Engr. Suresh Babu",
  "Supr. Farah Siddiqui",
  "Dir. Vivek Shah",
  "Coord. Deepa Nair",
];

const PHOTO_POOL = [
  "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80",
  "https://images.unsplash.com/photo-1589762738974-f9a4c30f7e11?w=800&q=80",
  "https://images.unsplash.com/photo-1495556650867-99590cea3657?w=800&q=80",
  "https://images.unsplash.com/photo-1600189261867-8e2b2c1da5f2?w=800&q=80",
  "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800&q=80",
  "https://images.unsplash.com/photo-1473646590311-c48e1bc77b44?w=800&q=80",
  "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=800&q=80",
  "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80",
];

const AVATAR_POOL = Array.from({ length: 16 }).map(
  (_, i) => `https://i.pravatar.cc/150?img=${i + 1}`
);

function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeUser(role: User["role"] = "citizen"): User {
  const first = pick(FIRST_NAMES);
  const last = pick(LAST_NAMES);
  return {
    id: uid("usr"),
    email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    full_name: `${first} ${last}`,
    avatar_url: pick(AVATAR_POOL),
    role,
    city: pick(CITIES).name,
    reports_count: Math.floor(randomBetween(0, 24)),
    upvotes_given: Math.floor(randomBetween(0, 140)),
    created_at: new Date(Date.now() - randomBetween(7, 400) * 24 * 3600 * 1000).toISOString(),
  };
}

function makeReport(user: User, cityOverride?: { name: string; lat: number; lng: number }): Report {
  const cat = pick(["roads", "water", "garbage", "electricity", "parks", "safety"] as Category[]);
  const urgency = pick(["low", "medium", "high", "critical"] as Urgency[]);
  const statusPool = ["submitted", "under_review", "in_progress", "resolved", "in_progress", "under_review"] as const;
  const status = pick(statusPool as unknown as Report["status"][]);
  const city = cityOverride ?? pick(CITIES);
  const area = pick(AREAS_BY_CITY[city.name] ?? ["Central"]);
  const createdAt = new Date(Date.now() - randomBetween(0.2, 40) * 24 * 3600 * 1000);
  const resolvedAt =
    status === "resolved"
      ? new Date(createdAt.getTime() + randomBetween(1, 20) * 24 * 3600 * 1000).toISOString()
      : undefined;

  const hasPhoto = Math.random() > 0.2;
  const photos = hasPhoto
    ? Array.from({ length: Math.random() > 0.7 ? 2 : 1 }).map(() => pick(PHOTO_POOL))
    : [];

  const urgencyWeight = { low: 5, medium: 20, high: 50, critical: 100 }[urgency];
  const upvotes = Math.floor(randomBetween(0, 900));

  return {
    id: uid("rpt"),
    user_id: user.id,
    title: pick(TITLES_BY_CATEGORY[cat]),
    description: pick(DESCRIPTIONS_BY_CATEGORY[cat]),
    category: cat,
    urgency,
    status,
    latitude: city.lat + randomBetween(-0.08, 0.08),
    longitude: city.lng + randomBetween(-0.08, 0.08),
    address: `${Math.floor(randomBetween(1, 200))}, ${area}, ${city.name}`,
    area,
    city: city.name,
    department: DEPARTMENTS[cat],
    assigned_officer: status !== "submitted" ? pick(OFFICERS) : undefined,
    upvote_count: upvotes,
    comment_count: Math.floor(randomBetween(0, 40)),
    view_count: Math.floor(randomBetween(upvotes, upvotes * 6 + 40)),
    priority_score: upvotes * 1.5 + urgencyWeight,
    is_featured: Math.random() > 0.9,
    created_at: createdAt.toISOString(),
    updated_at: new Date(createdAt.getTime() + randomBetween(1, 40) * 3600 * 1000).toISOString(),
    resolved_at: resolvedAt,
    photos,
  };
}

function seedUsers(n: number): User[] {
  return Array.from({ length: n }).map(() => makeUser());
}

function seedReports(users: User[], n: number): Report[] {
  return Array.from({ length: n }).map(() => makeReport(pick(users)));
}

const CURRENT_USER: User = {
  id: "usr_demo",
  email: "demo@civicfix.app",
  full_name: "David Mendes",
  avatar_url: "https://i.pravatar.cc/150?img=12",
  role: "citizen",
  city: "Bengaluru",
  bio: "Citizen of Bengaluru. Building a cleaner city one report at a time.",
  reports_count: 8,
  upvotes_given: 47,
  created_at: new Date(Date.now() - 120 * 24 * 3600 * 1000).toISOString(),
};

const ADMIN_USER: User = {
  id: "usr_admin",
  email: "admin@civicfix.app",
  full_name: "Officer Pramila Rao",
  avatar_url: "https://i.pravatar.cc/150?img=30",
  role: "admin",
  city: "Bengaluru",
  reports_count: 0,
  upvotes_given: 0,
  created_at: new Date(Date.now() - 365 * 24 * 3600 * 1000).toISOString(),
};

const USERS = [CURRENT_USER, ADMIN_USER, ...seedUsers(20)];
const REPORTS = seedReports(USERS, 48);

// Ensure the current user owns a few reports
REPORTS.slice(0, 6).forEach((r) => {
  r.user_id = CURRENT_USER.id;
});

function seedComments(reports: Report[], users: User[]): Comment[] {
  const out: Comment[] = [];
  reports.forEach((r) => {
    const n = Math.min(r.comment_count, 6);
    for (let i = 0; i < n; i++) {
      const u = pick(users);
      const isOfficial = Math.random() > 0.7;
      out.push({
        id: uid("cmt"),
        report_id: r.id,
        user_id: isOfficial ? ADMIN_USER.id : u.id,
        user_name: isOfficial ? "Municipal Officer" : u.full_name,
        user_avatar: isOfficial ? ADMIN_USER.avatar_url : u.avatar_url,
        text: isOfficial
          ? "Thank you for reporting. Our field team has been notified and will inspect within 48 hours."
          : pick([
              "Same issue at my street too. This needs action.",
              "I drive past this every day, it's getting dangerous.",
              "Upvoted. Let's keep pushing this.",
              "Any update on this? Been a week.",
              "Great that someone raised this.",
              "We need more people to upvote so authorities notice.",
            ]),
        is_official: isOfficial,
        created_at: new Date(
          new Date(r.created_at).getTime() + randomBetween(1, 72) * 3600 * 1000
        ).toISOString(),
      });
    }
  });
  return out;
}

function seedStatusUpdates(reports: Report[]): StatusUpdate[] {
  const out: StatusUpdate[] = [];
  reports.forEach((r) => {
    const createdAt = new Date(r.created_at).getTime();
    out.push({
      id: uid("su"),
      report_id: r.id,
      old_status: null,
      new_status: "submitted",
      created_at: r.created_at,
    });
    if (["under_review", "in_progress", "resolved"].includes(r.status)) {
      out.push({
        id: uid("su"),
        report_id: r.id,
        old_status: "submitted",
        new_status: "under_review",
        admin_note: "Received and assigned to department.",
        admin_name: "Municipal Control Room",
        created_at: new Date(createdAt + 6 * 3600 * 1000).toISOString(),
      });
    }
    if (["in_progress", "resolved"].includes(r.status)) {
      out.push({
        id: uid("su"),
        report_id: r.id,
        old_status: "under_review",
        new_status: "in_progress",
        admin_note: `Assigned to ${r.assigned_officer ?? "field team"}. Work in progress.`,
        admin_name: "Department Head",
        created_at: new Date(createdAt + 28 * 3600 * 1000).toISOString(),
      });
    }
    if (r.status === "resolved" && r.resolved_at) {
      out.push({
        id: uid("su"),
        report_id: r.id,
        old_status: "in_progress",
        new_status: "resolved",
        admin_note: "Work completed and verified by local officer.",
        admin_name: r.assigned_officer ?? "Municipal Officer",
        created_at: r.resolved_at,
      });
    }
  });
  return out;
}

const COMMENTS = seedComments(REPORTS, USERS);
const STATUS_UPDATES = seedStatusUpdates(REPORTS);

export const MOCK = {
  currentUser: CURRENT_USER,
  adminUser: ADMIN_USER,
  users: USERS,
  reports: REPORTS,
  comments: COMMENTS,
  statusUpdates: STATUS_UPDATES,
  cities: CITIES,
  areasByCity: AREAS_BY_CITY,
  photoPool: PHOTO_POOL,
  avatarPool: AVATAR_POOL,
};
