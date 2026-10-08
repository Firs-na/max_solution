"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CircleCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { addons, addonCost, BASE_PRICE, calcTotal, MIN_PESERTA, PACKAGE_TITLE, rupiah, useOrders, type Order } from "@/lib/orders";

const inputCls =
  "mt-2 w-full rounded-lg border border-slate-300 bg-surface px-3 py-3 text-navy outline-none focus:ring-2 focus:ring-navy";

export default function FormPesananPage() {
  const { user } = useAuth();
  const { add } = useOrders(user?.id);

  const [nama, setNama] = useState(user?.name ?? "");
  const [telepon, setTelepon] = useState("");
  const [instansi, setInstansi] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [pilihan, setPilihan] = useState<string[]>([]);
  const [catatan, setCatatan] = useState("");
  const [done, setDone] = useState<Order | null>(null);

  const n = Number(jumlah) >= MIN_PESERTA ? Number(jumlah) : 0;
  const total = calcTotal(n, pilihan);

  const toggle = (id: string) =>
    setPilihan((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!n) return;
    const order = add({ nama: nama.trim(), telepon: telepon.trim(), instansi: instansi.trim(), jumlah: n, addons: pilihan, catatan: catatan.trim() });
    if (order) setDone(order);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-lg pt-12 text-center">
        <CircleCheck className="mx-auto h-14 w-14 text-green-600" />
        <h1 className="mt-4 font-display text-3xl font-bold">Pesanan Terkirim</h1>
        <p className="mt-2 text-ink">
          Nomor pesanan <span className="font-semibold text-navy">{done.id}</span>. Tim kami akan menghubungi Anda untuk konfirmasi.
        </p>
        <p className="mt-4 text-lg text-navy">Total: <span className="font-semibold">{rupiah(done.total)}</span></p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/profil/pesanan" className="rounded-lg bg-navy px-6 py-3 font-medium text-white">Lihat Pesanan Saya</Link>
          <Link href="/" className="rounded-lg border-2 border-navy px-6 py-3 font-medium text-navy">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl pt-8">
      <Link href="/rencana" className="inline-flex items-center gap-2 text-sm font-medium text-navy">
        <ArrowLeft className="h-4 w-4" /> Kembali ke detail
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">Form Pesanan</h1>
      <p className="mt-1 text-ink">{PACKAGE_TITLE}</p>

      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <div>
            <label htmlFor="nama" className="text-sm text-ink">Nama</label>
            <input id="nama" required value={nama} onChange={(e) => setNama(e.target.value)} autoComplete="name" className={inputCls} />
          </div>
          <div>
            <label htmlFor="telepon" className="text-sm text-ink">Nomor Telepon</label>
            <input id="telepon" required type="tel" inputMode="tel" pattern="\+?[0-9\s\-]{8,16}" title="Masukkan nomor telepon yang valid"
              value={telepon} onChange={(e) => setTelepon(e.target.value)} autoComplete="tel" className={inputCls} />
          </div>
          <div>
            <label htmlFor="instansi" className="text-sm text-ink">Nama Instansi</label>
            <input id="instansi" required value={instansi} onChange={(e) => setInstansi(e.target.value)} placeholder="Contoh: SMA Negeri 1 Makassar" className={inputCls} />
          </div>
          <div>
            <label htmlFor="jumlah" className="text-sm text-ink">Jumlah Peserta (minimal {MIN_PESERTA} orang)</label>
            <input id="jumlah" required type="number" min={MIN_PESERTA} value={jumlah} onChange={(e) => setJumlah(e.target.value)} className={inputCls} />
          </div>

          <fieldset>
            <legend className="text-sm text-ink">Tambahan</legend>
            <ul className="mt-2 space-y-3">
              {addons.map((a) => {
                const on = pilihan.includes(a.id);
                return (
                  <li key={a.id}>
                    <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${on ? "border-navy bg-chip/50" : "border-slate-200"}`}>
                      <input type="checkbox" checked={on} onChange={() => toggle(a.id)} className="mt-1 h-4 w-4 accent-navy" />
                      <span className="flex-1">
                        <span className="block font-medium text-navy">{a.label}</span>
                        <span className="block text-sm text-ink">{a.desc}</span>
                      </span>
                      <span className="shrink-0 text-right text-sm font-medium text-sun-deep">
                        {rupiah(a.price)}
                        <span className="block text-xs font-normal text-ink">{a.per === "orang" ? "/peserta" : "/paket"}</span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          <div>
            <label htmlFor="catatan" className="text-sm text-ink">Catatan Tambahan</label>
            <textarea id="catatan" rows={4} value={catatan} onChange={(e) => setCatatan(e.target.value)} className={inputCls} />
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-bold">Ringkasan Biaya</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-ink">{rupiah(BASE_PRICE)} × {n || 0} peserta</dt>
              <dd className="text-navy">{rupiah(BASE_PRICE * n)}</dd>
            </div>
            {addons.filter((a) => pilihan.includes(a.id)).map((a) => (
              <div key={a.id} className="flex justify-between gap-3">
                <dt className="text-ink">{a.label}</dt>
                <dd className="text-navy">{rupiah(addonCost(a, n))}</dd>
              </div>
            ))}
          </dl>
          <hr className="my-4" />
          <div className="flex justify-between font-semibold text-navy">
            <span>Total</span>
            <span>{rupiah(total)}</span>
          </div>
          <button type="submit" disabled={!n} className="mt-6 w-full rounded-lg bg-sun-deep py-4 font-medium text-white disabled:opacity-40">
            Kirim Pesanan
          </button>
          {!n && <p className="mt-2 text-xs text-ink">Isi jumlah peserta (minimal {MIN_PESERTA}) untuk menghitung total.</p>}
        </aside>
      </form>
    </div>
  );
}
