"use client";
import { useCallback, useEffect, useState } from "react";
import { seedChats, type ChatState } from "@/data/dummy";

export function useChats(userId: string | undefined) {
  const [chats, setChats] = useState<ChatState>(seedChats);
  const [loaded, setLoaded] = useState(false);
  const key = userId ? `ms_chats_v2_${userId}` : null;

  useEffect(() => {
    if (!key) return;
    try {
      const raw = localStorage.getItem(key);
      if (raw) setChats(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, [key]);

  useEffect(() => {
    if (!key || !loaded) return;
    try { localStorage.setItem(key, JSON.stringify(chats)); } catch {}
  }, [chats, key, loaded]);

  // Sinkron saat admin membalas dari tab lain
  useEffect(() => {
    if (!key) return;
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try { setChats(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  const send = useCallback((id: number, text: string) => {
    const time = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    setChats((prev) => {
      const cur = prev[id] ?? { messages: [], unread: 0 };
      const nextId = cur.messages.reduce((m, x) => Math.max(m, x.id), 0) + 1;
      return { ...prev, [id]: { ...cur, messages: [...cur.messages, { id: nextId, from: "me", text, time }] } };
    });
  }, []);

  const markRead = useCallback((id: number) => {
    setChats((prev) => {
      const cur = prev[id];
      if (!cur || cur.unread === 0) return prev;
      return { ...prev, [id]: { ...cur, unread: 0 } };
    });
  }, []);

  return { chats, send, markRead };
}
