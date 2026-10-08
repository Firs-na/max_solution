"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

// Pelindung halaman admin. Hanya role "admin" yang boleh masuk.
export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace("/login");
    else if (user.role !== "admin") router.replace("/");
  }, [ready, user, router]);

  if (!ready || !user || user.role !== "admin") {
    return <div className="grid min-h-screen place-items-center text-ink">Memuat...</div>;
  }
  return <>{children}</>;
}
