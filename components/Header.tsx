"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import Logo from "./Logo";
import { navItems } from "./nav";

export default function Header() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button aria-label="Menu" className="text-navy md:hidden"><Menu className="h-6 w-6" /></button>
          <Link href="/"><Logo /></Link>
        </div>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map(({ href, label }) => {
            const active = href === "/" ? path === "/" : path.startsWith(href);
            return (
              <Link key={href} href={href}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${active ? "bg-sun text-sun-deep" : "text-navy hover:bg-chip/60"}`}>
                {label}
              </Link>
            );
          })}
        </nav>
        <button aria-label="Cari" className="text-navy"><Search className="h-6 w-6" /></button>
      </div>
    </header>
  );
}
