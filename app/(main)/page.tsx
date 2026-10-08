import Link from "next/link";
import { ArrowRight, ExternalLink, Landmark, Utensils } from "lucide-react";
import CustomRequestCard from "@/components/CustomRequestCard";
import Photo from "@/components/Photo";
import { features, itineraries } from "@/data/dummy";

const icons = { landmark: Landmark, utensils: Utensils };
const tones = { navy: "bg-navy text-white", sun: "bg-sun text-sun-deep" };

export default function JelajahPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative -mx-4 overflow-hidden md:mx-0 md:mt-6 md:rounded-3xl">
        <Photo gradient="from-navy via-indigo-900 to-orange-400" className="absolute inset-0" />
        <div className="relative px-4 pb-14 pt-10 md:px-14 md:pb-24 md:pt-20">
          <h1 className="max-w-xl font-display text-4xl font-bold leading-tight text-white md:text-6xl">
            Jelajahi Makassar: Kota Daeng
          </h1>
          <p className="mt-4 max-w-md text-base text-white/90 md:text-lg">
            Temukan keajaiban sejarah, kelezatan kuliner, dan petualangan edukatif di jantung Sulawesi Selatan.
          </p>
          <button className="mt-6 rounded-full bg-sun px-6 py-3 font-display text-sm font-bold text-sun-deep">
            Mulai Petualangan
          </button>
        </div>
      </section>

      {/* Fitur */}
      <section className="relative z-10 -mt-6 grid gap-4 md:mt-8 md:grid-cols-2">
        {features.map((f) => {
          const Icon = icons[f.icon];
          return (
            <article key={f.title} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <span className={`grid h-12 w-12 place-items-center rounded-full ${tones[f.tone]}`}><Icon className="h-5 w-5" /></span>
              <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 flex-1 text-ink">{f.desc}</p>
              <ArrowRight className="mt-4 self-end text-sun-deep" />
            </article>
          );
        })}
      </section>

      {/* Permintaan kustom */}
      <section className="mt-4">
        <CustomRequestCard />
      </section>

      {/* Itinerary populer */}
      <section className="mt-12">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold">Itinerary Populer</h2>
            <p className="mt-1 text-ink">Rencana perjalanan paling diminati oleh para petualang.</p>
          </div>
          <Link href="/rencana" className="flex shrink-0 items-center gap-1 text-right text-sm font-medium text-navy">
            Lihat Semua <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {itineraries.map((it) => (
            <article key={it.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              <Photo gradient={it.gradient} className="h-56 w-full md:h-64" />
              <div className="p-5">
                <div className="flex gap-2 text-xs font-semibold">
                  <span className={`rounded-full px-3 py-1 ${it.tags[0] === "Kuliner" ? "bg-orange-100 text-sun-deep" : "bg-chip text-navy"}`}>{it.tags[0]}</span>
                  <span className="rounded-full bg-chip px-3 py-1 text-navy">{it.tags[1]}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold">{it.title}</h3>
                <p className="mt-2 text-ink">{it.desc}</p>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-ink">Mulai dari</p>
                    <p className="font-medium text-sun-deep">{it.price}</p>
                  </div>
                  <Link href="/rencana" className="rounded-lg bg-navy px-8 py-2.5 text-sm font-medium text-white">Detail</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-3xl bg-navy p-8 md:p-14">
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-10">
          <div>
            <h2 className="font-display text-4xl font-bold text-white">Ingin Itinerary Kustom?</h2>
            <p className="mt-4 text-blue-200">Hubungi konsultan travel kami untuk merancang perjalanan yang sesuai dengan kebutuhan dan budget Anda.</p>
          </div>
          <div className="mt-6 space-y-3 md:mt-0">
            <input type="email" placeholder="Masukkan Email Anda"
              className="w-full rounded-full bg-white px-6 py-3.5 text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sun" />
            <button className="w-full rounded-full bg-sun py-3.5 font-medium text-sun-deep">Konsultasi Gratis</button>
          </div>
        </div>
      </section>
    </div>
  );
}
