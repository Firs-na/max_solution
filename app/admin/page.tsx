"use client";
import Link from "next/link";
import { useAdminData } from "@/lib/admin";
import { PACKAGE_TITLE, rupiah, statusStyle } from "@/lib/orders";

export default function AdminDashboard() {
  const { users, orders, requests, threads, loaded } = useAdminData();

  const waiting = orders.filter((o) => o.status === "Menunggu Konfirmasi").length;
  const revenue = orders.filter((o) => o.status === "Dikonfirmasi" || o.status === "Selesai").reduce((s, o) => s + o.total, 0);
  const awaitingChat = threads.filter((t) => t.awaiting).length;

  const stats = [
    { label: "Total Pengguna", value: String(users.length), href: "/admin/pengguna" },
    { label: "Total Pesanan", value: String(orders.length), href: "/admin/pesanan" },
    { label: "Menunggu Konfirmasi", value: String(waiting), href: "/admin/pesanan" },
    { label: "Pendapatan (Dikonfirmasi + Selesai)", value: rupiah(revenue), href: "/admin/pesanan" },
    { label: "Permintaan Kustom", value: String(requests.length), href: "/admin/permintaan" },
    { label: "Chat Menunggu Balasan", value: String(awaitingChat), href: "/admin/chat" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      <p className="mt-1 text-ink">Ringkasan aktivitas Max Solution.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-ink">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-navy">{loaded ? s.value : "–"}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">Pesanan Terbaru</h2>
        <Link href="/admin/pesanan" className="text-sm font-medium text-sun-deep">Kelola semua</Link>
      </div>

      {loaded && orders.length === 0 && (
        <p className="mt-4 rounded-2xl border border-dashed border-slate-300 py-10 text-center text-ink">Belum ada pesanan masuk.</p>
      )}

      <ul className="mt-4 space-y-3">
        {orders.slice(0, 5).map((o) => (
          <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div>
              <p className="font-medium text-navy">{o.instansi} · {o.jumlah} peserta</p>
              <p className="text-xs text-ink">{o.id} · {o.userName} · {PACKAGE_TITLE}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-navy">{rupiah(o.total)}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[o.status] ?? "bg-chip text-navy"}`}>{o.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
