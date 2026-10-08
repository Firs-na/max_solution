// Placeholder foto: ganti dengan <Image /> / <img /> aslinya nanti.
export default function Photo({ gradient = "from-slate-600 to-slate-400", className = "" }: { gradient?: string; className?: string }) {
  return <div className={`bg-gradient-to-br ${gradient} ${className}`} role="img" aria-label="Foto placeholder" />;
}
