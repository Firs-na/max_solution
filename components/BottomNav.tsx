"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./nav";

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 h-[68px] border-t border-slate-200 bg-white md:hidden">
      <ul className="flex h-full items-center justify-around px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <li key={href}>
              <Link href={href}
                className={`flex min-w-[68px] flex-col items-center gap-0.5 rounded-full px-4 py-1.5 text-xs font-semibold ${active ? "bg-sun text-sun-deep" : "text-ink"}`}>
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
