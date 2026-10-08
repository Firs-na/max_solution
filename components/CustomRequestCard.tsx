"use client";
import { useState } from "react";
import { Sparkles, Send, CircleCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";

const empty = { tujuan: "", jumlah: "", tanggal: "", budget: "", catatan: "" };
type Form = typeof empty;

const inputCls =
  "mt-2 w-full rounded-lg border border-slate-300 bg-surface px-3 py-3 text-navy outline-none focus:ring-2 focus:ring-navy";

export default function CustomRequestCard() {
  const { user } = useAuth();
  const [form, setForm] = useState<Form>(empty);
  const [sent, setSent] = useState(false);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSent(false);
    setForm({ ...form, [k]: e.target.value });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const key = `ms_requests_${user?.id ?? "tamu"}`;
      const list = JSON.parse(localStorage.getItem(key) ?? "[]");
      list.push({ ...form, createdAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(list));
    } catch {}
    setForm(empty);
    setSent(true);
  };

  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue-400 text-white">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold">Rencana Sesuai Kemauan Anda</h3>
          <p className="mt-1 text-ink">Ceritakan perjalanan yang Anda inginkan, kurator kami akan menyesuaikannya.</p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="tujuan" className="text-sm text-ink">Tujuan</label>
          <input id="tujuan" required value={form.tujuan} onChange={set("tujuan")} placeholder="Contoh: Benteng Rotterdam" className={inputCls} />
        </div>
        <div>
          <label htmlFor="jumlah" className="text-sm text-ink">Jumlah Orang</label>
          <input id="jumlah" required type="number" min={1} value={form.jumlah} onChange={set("jumlah")} className={inputCls} />
        </div>
        <div>
          <label htmlFor="tanggal" className="text-sm text-ink">Tanggal</label>
          <input id="tanggal" required type="date" value={form.tanggal} onChange={set("tanggal")} className={inputCls} />
        </div>
        <div>
          <label htmlFor="budget" className="text-sm text-ink">Budget (Rp)</label>
          <input id="budget" required type="number" min={0} step={50000} value={form.budget} onChange={set("budget")} className={inputCls} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="catatan" className="text-sm text-ink">Catatan</label>
          <textarea id="catatan" rows={3} value={form.catatan} onChange={set("catatan")} className={inputCls} />
        </div>

        <div className="flex flex-wrap items-center gap-4 md:col-span-2">
          <button type="submit" className="flex items-center gap-2 rounded-lg bg-sun px-6 py-3 font-medium text-sun-deep">
            <Send className="h-4 w-4" /> Kirim Permintaan
          </button>
          {sent && (
            <p role="status" className="flex items-center gap-2 text-sm text-green-700">
              <CircleCheck className="h-5 w-5" /> Permintaan terkirim.
            </p>
          )}
        </div>
      </form>
    </article>
  );
}
