"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ClipboardList, Sparkles, Users, MessageSquare, LogOut } from "lucide-react";
import AdminGuard from "@/components/AdminGuard";
import Logo from "@/components/Logo";
import { useAuth } from "@/lib/auth";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pesanan", label: "Pesanan", icon: ClipboardList },
  { href: "/admin/permintaan", label: "Permintaan Kustom", icon: Sparkles },
  { href: "/admin/pengguna", label: "Pengguna", icon: Users },
  { href: "/admin/chat", label: "Chat", icon: MessageSquare },
];

function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const keluar = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">Admin</span>
          </div>
          <button onClick={keluar} className="flex items-center gap-2 text-sm font-medium text-red-700">
            <LogOut className="h-4 w-4" /> Keluar
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
        <nav className="no-scrollbar flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-3 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:w-64 md:shrink-0 md:flex-col md:border-b-0 md:border-r md:py-6">
          {items.map(({ href, label, icon: Icon }) => {
            const active = href === "/admin" ? path === "/admin" : path.startsWith(href);
            return (
              <Link key={href} href={href}
                className={`flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-sm font-semibold md:rounded-lg ${active ? "bg-sun text-sun-deep" : "text-navy hover:bg-chip/60"}`}>
                <Icon className="h-4 w-4" /> {label}
              </Link>
            );
          })}
        </nav>
        <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <Shell>{children}</Shell>
    </AdminGuard>
  );
}
