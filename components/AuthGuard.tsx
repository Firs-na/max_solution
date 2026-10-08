"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

// Pelindung halaman pengguna. Admin diarahkan ke /admin.
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace("/login");
    else if (user.role === "admin") router.replace("/admin");
  }, [ready, user, router]);

  if (!ready || !user || user.role === "admin") {
    return <div className="grid min-h-screen place-items-center text-ink">Memuat...</div>;
  }
  return <>{children}</>;
}
