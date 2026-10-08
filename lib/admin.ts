"use client";
import { useCallback, useEffect, useState } from "react";
import { seedChats, messages as curators, type ChatMsg, type ChatState } from "@/data/dummy";
import type { Order } from "./orders";

export type AdminUser = { id: string; name: string; identifier: string };
export type CustomRequest = { tujuan: string; jumlah: string; tanggal: string; budget: string; catatan: string; createdAt: string };
export type AdminOrder = Order & { userId: string; userName: string };
export type AdminRequest = CustomRequest & { userId: string; userName: string };
export type Thread = {
  key: string;
  userId: string;
  userName: string;
  curatorId: number;
  curatorName: string;
  gradient: string;
  messages: ChatMsg[];
  awaiting: boolean; // pesan terakhir dari pengguna, belum dibalas
};

type AdminData = { users: AdminUser[]; orders: AdminOrder[]; requests: AdminRequest[]; threads: Thread[] };
const EMPTY: AdminData = { users: [], orders: [], requests: [], threads: [] };

const readJSON = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const chatKey = (userId: string) => `ms_chats_v2_${userId}`;
const orderKey = (userId: string) => `ms_orders_${userId}`;
const nowTime = () => new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

function loadAll(): AdminData {
  const stored = readJSON<(AdminUser & { password?: string })[]>("ms_users", []);
  const users: AdminUser[] = stored.map((u) => ({ id: u.id, name: u.name, identifier: u.identifier }));
  const orders: AdminOrder[] = [];
  const requests: AdminRequest[] = [];
  const threads: Thread[] = [];

  for (const u of users) {
    readJSON<Order[]>(orderKey(u.id), []).forEach((o) => orders.push({ ...o, userId: u.id, userName: u.name }));
    readJSON<CustomRequest[]>(`ms_requests_${u.id}`, []).forEach((r) => requests.push({ ...r, userId: u.id, userName: u.name }));

    const state = readJSON<ChatState | null>(chatKey(u.id), null);
    if (!state) continue;
    for (const [k, room] of Object.entries(state)) {
      const curatorId = Number(k);
      const seedLen = seedChats[curatorId]?.messages.length ?? 0;
      // Hanya percakapan yang sudah ditulis pengguna / dibalas admin
      if (room.messages.length <= seedLen) continue;
      const c = curators.find((x) => x.id === curatorId);
      const last = room.messages[room.messages.length - 1];
      threads.push({
        key: `${u.id}:${curatorId}`,
        userId: u.id,
        userName: u.name,
        curatorId,
        curatorName: c?.name ?? `Kurator ${curatorId}`,
        gradient: c?.gradient ?? "from-slate-600 to-slate-400",
        messages: room.messages,
        awaiting: last?.from === "me",
      });
    }
  }

  orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  requests.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  threads.sort((a, b) => Number(b.awaiting) - Number(a.awaiting));
  return { users, orders, requests, threads };
}

export function useAdminData() {
  const [data, setData] = useState<AdminData>(EMPTY);
  const [loaded, setLoaded] = useState(false);

  const reload = useCallback(() => {
    setData(loadAll());
    setLoaded(true);
  }, []);

  useEffect(() => {
    reload();
    window.addEventListener("storage", reload);
    window.addEventListener("focus", reload);
    return () => {
      window.removeEventListener("storage", reload);
      window.removeEventListener("focus", reload);
    };
  }, [reload]);

  return { ...data, loaded, reload };
}

export function updateOrderStatus(userId: string, orderId: string, status: string) {
  try {
    const list = readJSON<Order[]>(orderKey(userId), []);
    localStorage.setItem(orderKey(userId), JSON.stringify(list.map((o) => (o.id === orderId ? { ...o, status } : o))));
  } catch {}
}

// Admin membalas sebagai kurator (from: "them"); pengguna mendapat penanda belum dibaca.
export function adminReply(userId: string, curatorId: number, text: string) {
  try {
    const state = readJSON<ChatState>(chatKey(userId), seedChats);
    const room = state[curatorId] ?? { messages: [], unread: 0 };
    const nextId = room.messages.reduce((m, x) => Math.max(m, x.id), 0) + 1;
    const next: ChatState = {
      ...state,
      [curatorId]: {
        unread: room.unread + 1,
        messages: [...room.messages, { id: nextId, from: "them", text, time: nowTime() }],
      },
    };
    localStorage.setItem(chatKey(userId), JSON.stringify(next));
  } catch {}
}
