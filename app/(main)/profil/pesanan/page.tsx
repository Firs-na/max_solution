"use client";
import Link from "next/link";
import { ArrowLeft, PackageOpen } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { addons, PACKAGE_TITLE, rupiah, statusStyle, useOrders } from "@/lib/orders";

export default function PesananSayaPage() {
  const { user } = useAuth();
  const { orders, loaded } = useOrders(user?.id);

  return (
    <div className="mx-auto max-w-2xl pt-8">
      <Link href="/profil" className="inline-flex items-center gap-2 text-sm font-medium text-navy">
        <ArrowLeft className="h-4 w-4" /> Kembali ke profil
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold">Pesanan Saya</h1>

      {loaded && orders.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 py-14 text-center text-ink">
          <PackageOpen className="mx-auto h-10 w-10 text-slate-400" />
          <p className="mt-3">Belum ada pesanan.</p>
          <Link href="/rencana" className="mt-4 inline-block rounded-lg bg-navy px-6 py-3 font-medium text-white">Lihat Rencana</Link>
        </div>
      )}

      <ul className="mt-6 space-y-4">
        {orders.map((o) => (
          <li key={o.id} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-ink">
                  {o.id} · {new Date(o.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <h2 className="mt-1 font-display text-lg font-bold">{PACKAGE_TITLE}</h2>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[o.status] ?? "bg-chip text-navy"}`}>{o.status}</span>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
              <dt className="text-ink">Pemesan</dt><dd className="text-navy">{o.nama}</dd>
              <dt className="text-ink">Telepon</dt><dd className="text-navy">{o.telepon}</dd>
              <dt className="text-ink">Instansi</dt><dd className="text-navy">{o.instansi}</dd>
              <dt className="text-ink">Jumlah peserta</dt><dd className="text-navy">{o.jumlah} orang</dd>
              <dt className="text-ink">Tambahan</dt>
              <dd className="text-navy">
                {o.addons.length ? addons.filter((a) => o.addons.includes(a.id)).map((a) => a.label).join(", ") : "Tidak ada"}
              </dd>
              {o.catatan && (<><dt className="text-ink">Catatan</dt><dd className="text-navy">{o.catatan}</dd></>)}
            </dl>

            <div className="mt-4 flex justify-between border-t border-slate-100 pt-4 font-semibold text-navy">
              <span>Total</span><span>{rupiah(o.total)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
