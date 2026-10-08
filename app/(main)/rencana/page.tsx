import Link from "next/link";
import { Timer, Users, Utensils, BadgeCheck, CircleCheck, ArrowRight, Download, MapPin, Headset } from "lucide-react";
import Photo from "@/components/Photo";
import { schedule, included } from "@/data/dummy";

const info = [
  { icon: Timer, label: "1 Hari Penuh" },
  { icon: Users, label: "Min. 15 Orang" },
  { icon: Utensils, label: "Coto Makassar" },
  { icon: BadgeCheck, label: "Pemandu Ahli" },
];

export default function RencanaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative -mx-4 overflow-hidden md:mx-0 md:mt-6 md:rounded-3xl">
        <Photo gradient="from-stone-600 via-stone-800 to-navy" className="absolute inset-0" />
        <div className="relative px-4 pb-16 pt-8 md:px-14 md:py-20">
          <span className="rounded bg-sun px-2 py-1 text-xs font-bold text-sun-deep">EDUKASI SEJARAH</span>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight text-white md:text-6xl">
            Outing Class Sejarah Benteng Rotterdam
          </h1>
          <p className="mt-3 max-w-lg text-blue-100">
            Menelusuri jejak Kerajaan Gowa-Tallo dan Arsitektur Kolonial Belanda di pusat kota Makassar.
          </p>
        </div>
      </section>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          {/* Info */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {info.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 rounded-xl bg-chip/70 px-3 py-4 text-center text-sm font-medium text-navy">
                <Icon className="h-5 w-5" />{label}
              </div>
            ))}
          </div>

          {/* Jadwal */}
          <h2 className="mt-10 font-display text-3xl font-bold">Jadwal Perjalanan</h2>
          <ol className="relative mt-6 space-y-6 border-l-2 border-chip pl-8">
            {schedule.map((s) => (
              <li key={s.time} className="relative">
                <span className={`absolute -left-[41px] top-6 grid h-5 w-5 place-items-center rounded-full ${s.food ? "bg-sun-deep" : "bg-navy"}`}>
                  {s.food && <Utensils className="h-3 w-3 text-white" />}
                </span>
                <article className={`rounded-xl bg-white p-5 shadow-sm ${s.food ? "border-2 border-sun" : "border border-slate-100"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-bold">{s.time} - {s.title}</h3>
                    <span className="shrink-0 rounded bg-sun/70 px-2 py-1 text-center text-[10px] font-bold text-sun-deep">{s.badge}</span>
                  </div>
                  <p className="mt-2 text-ink">{s.desc}</p>
                  {s.gradient && <Photo gradient={s.gradient} className="mt-4 h-44 w-full rounded-lg md:h-56" />}
                </article>
              </li>
            ))}
          </ol>

          {/* Termasuk */}
          <section className="mt-10 rounded-2xl bg-navy p-8">
            <h2 className="font-display text-3xl font-bold text-white">Apa Saja Yang Termasuk?</h2>
            <ul className="mt-6 space-y-5">
              {included.map((i) => (
                <li key={i.title} className="flex gap-3">
                  <CircleCheck className="mt-0.5 h-6 w-6 shrink-0 text-sun" />
                  <div>
                    <p className="font-medium text-white">{i.title}</p>
                    <p className="text-sm text-blue-300">{i.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold tracking-wide text-ink">MULAI DARI</p>
            <p className="mt-1 font-medium text-sun-deep">Rp 125.000/peserta</p>
            <Link href="/rencana/pesan" className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-sun-deep py-4 font-medium text-white">
              Pesan Sekarang <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-navy py-4 font-display font-medium text-navy">
              Unduh Brosur PDF <Download className="h-5 w-5" />
            </button>
            <hr className="my-6" />
            <h3 className="font-medium text-navy">Lokasi Kegiatan</h3>
            <div className="relative mt-3 grid h-40 place-items-center rounded-xl bg-slate-300">
              <MapPin className="h-8 w-8 text-navy" />
            </div>
            <p className="mt-3 flex gap-2 text-sm text-ink">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              Jl. Ujung Pandang, Bulo Gading, Kec. Ujung Pandang, Kota Makassar, Sulawesi Selatan.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-chip/70 p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-white"><Headset className="h-5 w-5" /></span>
            <div>
              <p className="font-medium text-navy">Butuh bantuan?</p>
              <p className="text-sm text-ink">Hubungi Konsultan Perjalanan kami.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
