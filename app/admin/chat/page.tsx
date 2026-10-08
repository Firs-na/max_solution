"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, MessageSquare, Send } from "lucide-react";
import Photo from "@/components/Photo";
import { adminReply, useAdminData } from "@/lib/admin";

export default function AdminChatPage() {
  const { threads, loaded, reload } = useAdminData();
  const [sel, setSel] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const selected = threads.find((t) => t.key === sel) ?? null;
  const len = selected?.messages.length ?? 0;

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [sel, len]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !selected) return;
    adminReply(selected.userId, selected.curatorId, text);
    setDraft("");
    reload();
  };

  return (
    <div>
      <div className={selected ? "hidden md:block" : ""}>
        <h1 className="font-display text-3xl font-bold">Chat</h1>
        <p className="mt-1 text-ink">Balas pesan pengguna sebagai kurator.</p>
      </div>

      <div className="mt-6 md:grid md:grid-cols-[340px_1fr] md:gap-6">
        <section className={selected ? "hidden md:block" : ""}>
          {loaded && threads.length === 0 && (
            <p className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-ink">Belum ada pesan dari pengguna.</p>
          )}
          <ul className="space-y-3">
            {threads.map((t) => {
              const last = t.messages[t.messages.length - 1];
              return (
                <li key={t.key}>
                  <button onClick={() => setSel(t.key)}
                    className={`flex w-full items-center gap-3 rounded-xl border bg-white p-4 text-left shadow-sm ${sel === t.key ? "border-navy" : "border-slate-100"}`}>
                    <Photo gradient={t.gradient} className="h-12 w-12 shrink-0 rounded-full" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-display font-bold text-navy">{t.userName}</span>
                        {t.awaiting && <span className="shrink-0 rounded-full bg-sun-deep px-2 py-0.5 text-[10px] font-bold text-white">Perlu dibalas</span>}
                      </div>
                      <p className="text-xs text-ink">dengan {t.curatorName}</p>
                      <p className={`mt-1 truncate text-sm ${t.awaiting ? "font-semibold text-navy" : "text-ink"}`}>
                        {last.from === "them" ? "Anda: " : ""}{last.text}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={selected ? "" : "hidden md:block"}>
          {selected ? (
            <div className="flex h-[72vh] min-h-[420px] flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              <header className="flex items-center gap-3 border-b border-slate-100 p-4">
                <button onClick={() => setSel(null)} aria-label="Kembali" className="text-navy md:hidden">
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <div>
                  <p className="font-display font-bold text-navy">{selected.userName}</p>
                  <p className="text-xs text-ink">Percakapan dengan kurator {selected.curatorName}</p>
                </div>
              </header>

              <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto bg-surface p-4">
                {selected.messages.map((m) => (
                  <div key={m.id}
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${m.from === "them" ? "self-end rounded-br-sm bg-navy text-white" : "self-start rounded-bl-sm border border-slate-100 bg-white text-navy"}`}>
                    <p className="whitespace-pre-wrap break-words">{m.text}</p>
                    <p className={`mt-1 text-right text-[10px] ${m.from === "them" ? "text-blue-200" : "text-ink"}`}>{m.time}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={submit} className="flex items-center gap-3 border-t border-slate-100 p-3">
                <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={`Balas sebagai ${selected.curatorName}...`}
                  className="flex-1 rounded-full bg-surface px-5 py-3 text-navy outline-none focus:ring-2 focus:ring-navy" />
                <button type="submit" disabled={!draft.trim()} aria-label="Kirim"
                  className="grid h-11 w-11 place-items-center rounded-full bg-sun text-sun-deep disabled:opacity-40">
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          ) : (
            <div className="grid h-[72vh] min-h-[420px] place-items-center rounded-2xl border border-dashed border-slate-300 text-center text-ink">
              <div>
                <MessageSquare className="mx-auto h-10 w-10 text-slate-400" />
                <p className="mt-3">Pilih percakapan untuk membalas.</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
