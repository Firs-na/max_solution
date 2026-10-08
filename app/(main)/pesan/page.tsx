"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import Photo from "@/components/Photo";
import { messages as contacts } from "@/data/dummy";
import { useAuth } from "@/lib/auth";
import { useChats } from "@/lib/chats";

const filters = ["Semua", "Belum Dibaca", "Itinerary"] as const;
type Filter = (typeof filters)[number];

export default function PesanPage() {
  const { user } = useAuth();
  const { chats, send, markRead } = useChats(user?.id);
  const [active, setActive] = useState<Filter>("Semua");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const selected = contacts.find((c) => c.id === selectedId) ?? null;
  const room = selectedId ? chats[selectedId] : undefined;
  const roomLen = room?.messages.length ?? 0;

  // Kunci scroll halaman di belakang saat chat terbuka
  useEffect(() => {
    if (!selectedId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedId]);

  useEffect(() => {
    if (selectedId) markRead(selectedId);
  }, [selectedId, markRead, roomLen]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [selectedId, roomLen]);

  const rows = contacts
    .map((c) => {
      const st = chats[c.id] ?? { messages: [], unread: 0 };
      return { c, unread: st.unread, last: st.messages[st.messages.length - 1] };
    })
    .filter(({ c, unread }) =>
      active === "Semua" ? true : active === "Belum Dibaca" ? unread > 0 : c.category === "itinerary"
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !selectedId) return;
    send(selectedId, text);
    setDraft("");
  };

  /* ---------- Chat full screen ---------- */
  if (selected) {
    return (
      <div className="fixed inset-x-0 top-0 bottom-[68px] z-40 flex flex-col bg-white md:top-16 md:bottom-0">
        <header className="border-b border-slate-100">
          <div className="mx-auto flex w-full max-w-3xl items-center gap-3 p-4">
            <button onClick={() => { setSelectedId(null); setDraft(""); }} aria-label="Kembali" className="text-navy">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="relative">
              <Photo gradient={selected.gradient} className="h-10 w-10 rounded-full" />
              {selected.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />}
            </div>
            <div>
              <p className="font-display font-bold text-navy">{selected.name}</p>
              <p className="text-xs text-ink">{selected.online ? "Online" : "Offline"}</p>
            </div>
          </div>
        </header>

        <div ref={listRef} className="flex-1 overflow-y-auto bg-surface">
          <div className="mx-auto flex max-w-3xl flex-col gap-3 p-4">
            {room?.messages.map((m) => (
              <div key={m.id}
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${m.from === "me" ? "self-end rounded-br-sm bg-navy text-white" : "self-start rounded-bl-sm border border-slate-100 bg-white text-navy"}`}>
                <p className="whitespace-pre-wrap break-words">{m.text}</p>
                <p className={`mt-1 text-right text-[10px] ${m.from === "me" ? "text-blue-200" : "text-ink"}`}>{m.time}</p>
              </div>
            ))}
            {roomLen === 0 && <p className="py-10 text-center text-sm text-ink">Mulai percakapan dengan {selected.name}.</p>}
          </div>
        </div>

        <form onSubmit={submit} className="border-t border-slate-100 bg-white">
          <div className="mx-auto flex max-w-3xl items-center gap-3 p-3">
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Tulis pesan..."
              className="flex-1 rounded-full bg-surface px-5 py-3 text-navy outline-none focus:ring-2 focus:ring-navy" />
            <button type="submit" disabled={!draft.trim()} aria-label="Kirim"
              className="grid h-11 w-11 place-items-center rounded-full bg-sun text-sun-deep disabled:opacity-40">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  /* ---------- Daftar chat ---------- */
  return (
    <div className="mx-auto max-w-3xl pt-8">
      <h1 className="text-4xl font-bold text-navy">Pesan</h1>
      <p className="mt-2 max-w-xs text-lg text-ink md:max-w-none">Terhubung dengan kurator rencana perjalanan profesional Anda</p>

      <div className="no-scrollbar -mx-4 mt-6 flex gap-3 overflow-x-auto px-4">
        {filters.map((f) => (
          <button key={f} onClick={() => setActive(f)}
            className={`min-w-[100px] shrink-0 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${active === f ? "bg-navy-soft text-blue-300" : "bg-chip text-ink"}`}>
            {f}
          </button>
        ))}
      </div>

      <ul className="mt-6 space-y-3">
        {rows.map(({ c, unread, last }) => (
          <li key={c.id}>
            <button onClick={() => setSelectedId(c.id)}
              className="flex w-full items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 text-left shadow-sm">
              <div className="relative shrink-0">
                <Photo gradient={c.gradient} className={`h-14 w-14 rounded-full ${unread ? "ring-2 ring-sun" : ""}`} />
                {c.online && <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-green-500" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display font-bold text-navy">{c.name}</span>
                  <span className={`text-xs font-semibold ${unread ? "text-sun-deep" : "text-navy"}`}>{last?.time}</span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <p className={`truncate ${unread ? "font-bold text-navy" : "text-ink"}`}>
                    {last ? `${last.from === "me" ? "Anda: " : ""}${last.text}` : "Belum ada pesan"}
                  </p>
                  {unread > 0 && (
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sun-deep text-xs font-bold text-white">{unread}</span>
                  )}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
