"use client";
import { rupiah } from "@/lib/orders";
import { useAdminData } from "@/lib/admin";

export default function AdminPermintaanPage() {
  const { requests, loaded } = useAdminData();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Permintaan Kustom</h1>
      <p className="mt-1 text-ink">Permintaan rencana perjalanan dari form di halaman Jelajah.</p>

      {loaded && requests.length === 0 && (
        <p className="mt-6 rounded-2xl border border-dashed border-slate-300 py-12 text-center text-ink">Belum ada permintaan kustom.</p>
      )}

      <ul className="mt-6 grid gap-4 lg:grid-cols-2">
        {requests.map((r, i) => (
          <li key={r.userId + r.createdAt + i} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
            <p className="text-xs text-ink">
              {r.userName} · {new Date(r.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
            </p>
            <h2 className="mt-1 font-display text-lg font-bold">{r.tujuan}</h2>
            <dl className="mt-3 grid grid-cols-[110px_1fr] gap-y-2 text-sm">
              <dt className="text-ink">Jumlah orang</dt><dd className="text-navy">{r.jumlah}</dd>
              <dt className="text-ink">Tanggal</dt>
              <dd className="text-navy">{r.tanggal ? new Date(r.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}</dd>
              <dt className="text-ink">Budget</dt><dd className="text-navy">{rupiah(Number(r.budget) || 0)}</dd>
              <dt className="text-ink">Catatan</dt><dd className="text-navy">{r.catatan || "-"}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
