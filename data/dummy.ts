export const user = {
  name: "Kenzie",
  email: "Kenzielee@gmail.com",
  tier: "Gold Member",
  tags: ["Petualang", "Fotografer"],
  stats: [
    { value: 12, label: "Perjalanan" },
    { value: 45, label: "Review" },
    { value: 8, label: "Wishlist" },
  ],
};

export const features = [
  { title: "Wisata Sejarah", desc: "Menelusuri jejak kejayaan Kerajaan Gowa-Tallo dan Benteng Rotterdam.", icon: "landmark", tone: "navy" },
  { title: "Surga Kuliner", desc: "Petualangan rasa mulai dari Coto Makassar hingga Pisang Epe yang legendaris.", icon: "utensils", tone: "sun" },
] as const;

export const itineraries = [
  {
    id: "gowa-tallo",
    tags: ["Sejarah", "1 Hari"],
    title: "Jejak Kerajaan Gowa-Tallo",
    desc: "Telusuri kemegahan masa lalu di Museum Balla Lompoa dan kompleks...",
    price: "Rp 350.000",
    gradient: "from-stone-700 via-stone-500 to-emerald-700",
  },
  {
    id: "pantai-losari",
    tags: ["Kuliner", "Malam Hari"],
    title: "Tur Kuliner Pantai Losari",
    desc: "Eksplorasi cita rasa autentik di sepanjang garis pantai ikonik...",
    price: "Rp 275.000",
    gradient: "from-slate-900 via-amber-700 to-orange-400",
  },
];

export type Message = {
  id: number;
  name: string;
  time: string;
  preview: string;
  unread: number;
  online: boolean;
  typing?: boolean;
  category: "itinerary" | "umum";
  gradient: string;
};

export const messages: Message[] = [
  { id: 1, name: "Jonathan", time: "10:34 AM", preview: "Ada yang bisa saya bar", unread: 2, online: true, category: "umum", gradient: "from-sky-300 to-amber-400" },
  { id: 2, name: "Salsabila", time: "10:34 AM", preview: "", unread: 0, online: false, category: "umum", gradient: "from-rose-200 to-stone-400" },
  { id: 3, name: "Farel", time: "Selasa", preview: "Sama-sama! Saya akan terus", unread: 0, online: false, category: "umum", gradient: "from-slate-700 to-slate-400" },
];

export const schedule = [
  { time: "08:00", title: "Berkumpul & Briefing", badge: "Pintu Utama", desc: "Peserta berkumpul di gerbang utama Fort Rotterdam. Pembagian modul edukasi dan pengenalan singkat mengenai tata tertib kunjungan.", gradient: null },
  { time: "09:00", title: "Sesi Edukasi Sejarah", badge: "Bastion Bone", desc: "Menjelajahi struktur benteng yang menyerupai penyu. Penjelasan detail mengenai fungsi militer benteng dan sejarah peralihan kekuasaan dari Kerajaan Gowa ke VOC.", gradient: "from-amber-700 to-stone-500" },
  { time: "11:00", title: "Kunjungan Museum La Galigo", badge: "Inside Fort", desc: "Mengamati artefak prasejarah, pakaian adat, dan naskah kuno Bugis-Makassar. Sesi tanya jawab interaktif dengan kurator museum.", gradient: null },
  { time: "12:30", title: "Makan Siang Khas Makassar", badge: "Kuliner Lokal", desc: "Menikmati hidangan ikonik Coto Makassar dengan ketupat. Sajian rempah yang kaya rasa memberikan pengalaman gastronomi yang tak terlupakan.", gradient: "from-orange-700 to-amber-300", food: true },
] as { time: string; title: string; badge: string; desc: string; gradient: string | null; food?: boolean }[];

export const included = [
  { title: "Tiket Masuk Terusan", desc: "Akses penuh ke Benteng dan Museum La Galigo." },
  { title: "Pemandu Wisata Profesional", desc: "Berpengalaman dalam narasi sejarah budaya." },
  { title: "Makan Siang (Menu Coto)", desc: "Termasuk minuman dan hidangan pelengkap." },
];

export type ChatMsg = { id: number; from: "me" | "them"; text: string; time: string };
export type ChatState = Record<number, { messages: ChatMsg[]; unread: number }>;

// Isi awal chat per kontak (key = id kontak di `messages`)
export const seedChats: ChatState = {
  1: {
    unread: 2,
    messages: [
      { id: 1, from: "them", text: "Halo, selamat datang di Max Solution!", time: "10:33 AM" },
      { id: 2, from: "them", text: "Ada yang bisa saya bantu terkait rencana perjalanan Anda?", time: "10:34 AM" },
    ],
  },
  2: {
    unread: 0,
    messages: [{ id: 1, from: "them", text: "Halo! Saya Salsabila, kurator perjalanan Anda.", time: "10:34 AM" }],
  },
  3: {
    unread: 0,
    messages: [
      { id: 1, from: "them", text: "Halo kak, selamat pagi!", time: "Selasa" },
      { id: 2, from: "me", text: "Pagi juga, Kak Farel!", time: "Selasa" },
      { id: 3, from: "them", text: "Gimana kabarnya? Sudah siap untuk perjalanan ke Makassar?", time: "Selasa" },
      { id: 4, from: "me", text: "Kabar baik, Kak. Sudah nggak sabar nih!", time: "Selasa" },
      { id: 5, from: "them", text: "Bagus! Kalau ada yang mau ditanyakan soal itinerary, kabari saja ya.", time: "Selasa" },
      { id: 6, from: "me", text: "Siap, Kak. Terima kasih atas bantuannya!", time: "Selasa" },
      { id: 7, from: "them", text: "Sama-sama! Saya akan terus membantu rencana perjalanan Anda.", time: "Selasa" },
    ],
  },};
