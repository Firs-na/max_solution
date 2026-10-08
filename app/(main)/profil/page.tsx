"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, User, ShoppingBag, Banknote, Heart, Settings, CircleHelp, LogOut } from "lucide-react";
import Photo from "@/components/Photo";
import { user as profile } from "@/data/dummy";
import { useAuth } from "@/lib/auth";

const account = [
  { label: "Edit Profil", icon: User },
  { label: "Pesanan Saya", icon: ShoppingBag, href: "/profil/pesanan" },
  { label: "Metode Pembayaran", icon: Banknote },
] as { label: string; icon: typeof User; href?: string }[];
const prefs = [
  { label: "Wishlist", icon: Heart },
  { label: "Pengaturan", icon: Settings },
  { label: "Pusat Bantuan", icon: CircleHelp },
];

function Group({ title, items }: { title: string; items: typeof account }) {
  const cls = "flex w-full items-center gap-4 py-5 text-left text-navy";
  return (
    <section className="mt-8">
      <h2 className="px-2 text-sm font-medium tracking-widest text-ink">{title}</h2>
      <ul className="mt-3 divide-y divide-slate-100 rounded-2xl bg-white px-6 shadow-sm">
        {items.map(({ label, icon: Icon, href }) => {
          const inner = (
            <>
              <Icon className="h-5 w-5" />
              <span className="flex-1">{label}</span>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </>
          );
          return (
            <li key={label}>
              {href ? <Link href={href} className={cls}>{inner}</Link> : <button className={cls}>{inner}</button>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function ProfilPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const keluar = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div className="mx-auto max-w-2xl pt-10">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <Photo gradient="from-blue-100 to-white" className="h-32 w-32 rounded-full ring-4 ring-blue-100 shadow-lg" />
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sun px-3 py-1 text-[11px] font-bold text-sun-deep">
            {profile.tier.toUpperCase()}
          </span>
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">{user?.name}</h1>
        <p className="mt-1 text-ink">{user?.identifier}</p>
        <div className="mt-3 flex gap-2 text-xs">
          <span className="rounded-full bg-navy-soft px-4 py-1.5 text-white">{profile.tags[0]}</span>
          <span className="rounded-full bg-chip px-4 py-1.5 text-navy">{profile.tags[1]}</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {profile.stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-white py-5 text-center shadow-sm">
            <p className="text-lg text-navy">{s.value}</p>
            <p className="text-xs text-ink">{s.label}</p>
          </div>
        ))}
      </div>

      <Group title="AKUN SAYA" items={account} />
      <Group title="PREFERENSI" items={prefs} />

      <button onClick={keluar} className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-red-200 bg-white py-5 font-medium text-red-700">
        <LogOut className="h-5 w-5" /> Keluar
      </button>
    </div>
  );
}
