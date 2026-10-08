"use client";
import { useCallback, useEffect, useState } from "react";

export const BASE_PRICE = 125000;
export const PACKAGE_TITLE = "Outing Class Sejarah Benteng Rotterdam";
export const MIN_PESERTA = 15;

export type Addon = { id: string; label: string; desc: string; price: number; per: "orang" | "paket" };

export const addons: Addon[] = [
  { id: "bus", label: "Memakai bus Max Solution", desc: "Antar-jemput rombongan dari dan ke lokasi.", price: 1500000, per: "paket" },
  { id: "dokumentasi", label: "Dokumentasi foto & video", desc: "Fotografer dan videografer selama kegiatan.", price: 750000, per: "paket" },
  { id: "pemandu", label: "Pemandu tambahan", desc: "Satu pemandu ekstra untuk kelompok besar.", price: 300000, per: "paket" },
  { id: "snack", label: "Snack & minuman tambahan", desc: "Camilan dan minuman di sela kegiatan.", price: 15000, per: "orang" },
  { id: "sertifikat", label: "Sertifikat untuk peserta", desc: "Sertifikat kehadiran tercetak untuk tiap peserta.", price: 10000, per: "orang" },
  { id: "kaos", label: "Kaos seragam peserta", desc: "Kaos bertema kegiatan untuk tiap peserta.", price: 45000, per: "orang" },
  { id: "asuransi", label: "Asuransi perjalanan", desc: "Perlindungan peserta selama kegiatan berlangsung.", price: 8000, per: "orang" },
];

export const ORDER_STATUSES = ["Menunggu Konfirmasi", "Dikonfirmasi", "Selesai", "Dibatalkan"] as const;

export const statusStyle: Record<string, string> = {
  "Menunggu Konfirmasi": "bg-sun/70 text-sun-deep",
  Dikonfirmasi: "bg-blue-100 text-blue-800",
  Selesai: "bg-green-100 text-green-800",
  Dibatalkan: "bg-red-100 text-red-800",
};

export const rupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

export const addonCost = (a: Addon, jumlah: number) => (a.per === "orang" ? a.price * jumlah : a.price);

export const calcTotal = (jumlah: number, ids: string[]) =>
  BASE_PRICE * jumlah + addons.filter((a) => ids.includes(a.id)).reduce((s, a) => s + addonCost(a, jumlah), 0);

export type Order = {
  id: string;
  createdAt: string;
  nama: string;
  telepon: string;
  instansi: string;
  jumlah: number;
  addons: string[];
  catatan: string;
  total: number;
  status: string;
};
export type NewOrder = Pick<Order, "nama" | "telepon" | "instansi" | "jumlah" | "addons" | "catatan">;

export function useOrders(userId: string | undefined) {
  const key = userId ? `ms_orders_${userId}` : null;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!key) return;
    try {
      const raw = localStorage.getItem(key);
      setOrders(raw ? JSON.parse(raw) : []);
    } catch {}
    setLoaded(true);
  }, [key]);

  // Sinkron saat admin mengubah status di tab lain
  useEffect(() => {
    if (!key) return;
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try { setOrders(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  const add = useCallback(
    (data: NewOrder): Order | null => {
      if (!key) return null;
      const order: Order = {
        ...data,
        id: "MS-" + Date.now().toString(36).toUpperCase(),
        createdAt: new Date().toISOString(),
        status: "Menunggu Konfirmasi",
        total: calcTotal(data.jumlah, data.addons),
      };
      let list: Order[] = [];
      try { list = JSON.parse(localStorage.getItem(key) ?? "[]"); } catch {}
      list = [order, ...list];
      try { localStorage.setItem(key, JSON.stringify(list)); } catch {}
      setOrders(list);
      return order;
    },
    [key]
  );

  return { orders, loaded, add };
}
