"use client";
import { useState } from "react";
import { addons, ORDER_STATUSES, PACKAGE_TITLE, rupiah, statusStyle } from "@/lib/orders";
import { updateOrderStatus, useAdminData } from "@/lib/admin";

export default function AdminPesananPage() {
  const { orders, loaded, reload } = useAdminData();
  const [filter, setFilter] = useState<string>("Semua");

  const list = filter === "Semua" ? orders : orders.filter((o) => o.status === filter);

  const ubah = (userId: string, orderId: string, status: string) => {
    updateOrderStatus(userId, orderId, status);
    reload();
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Pesanan</h1>
      <p className="mt-1 text-ink">Ubah status pesanan; perubahan langsung terlihat di menu Pesanan Saya milik pengguna.</p>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto">
        {["Semua", ...ORDER_STATUSES].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${filter === f ? "bg-navy text-white" : "bg-chip text-ink"}`}>
            {f}
          </button>
        ))}
      </div>

      {loaded && list.length === 0 && (
        <p className="mt-6 rounded-2xl border border-dashed border-slate-300 py-12 text-center text-ink">Tidak ada pesanan.</p>
      )}

      <ul className="mt-6 space-y-4">
        {list.map((o) => (
          <li key={o.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-ink">
                  {o.id} · {new Date(o.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <h2 className="mt-1 font-display text-lg font-bold">{PACKAGE_TITLE}</h2>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[o.status] ?? "bg-chip text-navy"}`}>{o.status}</span>
            </div>

            <dl className="mt-4 grid grid-cols-[120px_1fr] gap-y-2 text-sm">
              <dt className="text-ink">Akun</dt><dd className="text-navy">{o.userName}</dd>
              <dt className="text-ink">Pemesan</dt><dd className="text-navy">{o.nama}</dd>
              <dt className="text-ink">Telepon</dt><dd className="text-navy">{o.telepon}</dd>
              <dt className="text-ink">Instansi</dt><dd className="text-navy">{o.instansi}</dd>
              <dt className="text-ink">Peserta</dt><dd className="text-navy">{o.jumlah} orang</dd>
              <dt className="text-ink">Tambahan</dt>
              <dd className="text-navy">{o.addons.length ? addons.filter((a) => o.addons.includes(a.id)).map((a) => a.label).join(", ") : "Tidak ada"}</dd>
              {o.catatan && (<><dt className="text-ink">Catatan</dt><dd className="text-navy">{o.catatan}</dd></>)}
            </dl>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <p className="font-semibold text-navy">Total {rupiah(o.total)}</p>
              <label className="flex items-center gap-2 text-sm text-ink">
                Status
                <select value={o.status} onChange={(e) => ubah(o.userId, o.id, e.target.value)}
                  className="rounded-lg border border-slate-300 bg-surface px-3 py-2 text-navy outline-none focus:ring-2 focus:ring-navy">
                  {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
