"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type StoredUser = { id: string; name: string; identifier: string; password: string };
export type Role = "admin" | "user";
export type SessionUser = { id: string; name: string; identifier: string; role: Role };
type Result = { ok: true; role: Role } | { ok: false; error: string };

type AuthCtx = {
  user: SessionUser | null;
  ready: boolean;
  register: (d: { name: string; identifier: string; password: string }) => Result;
  login: (identifier: string, password: string) => Result;
  logout: () => void;
};

const USERS_KEY = "ms_users";
const SESSION_KEY = "ms_session";

// Akun admin bawaan (hanya untuk demo frontend tanpa backend)
export const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: unknown) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

const norm = (s: string) => s.trim().toLowerCase().replace(/[\s-]/g, "");
const isEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s);
const isPhone = (s: string) => /^\+?\d{8,15}$/.test(s);

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = read<SessionUser | null>(SESSION_KEY, null);
    setUser(s ? { ...s, role: s.role ?? "user" } : null);
    setReady(true);
  }, []);

  const startSession = (s: SessionUser) => {
    write(SESSION_KEY, s);
    setUser(s);
  };

  const register: AuthCtx["register"] = useCallback(({ name, identifier, password }) => {
    const id = norm(identifier);
    if (!name.trim() || !id || !password) return { ok: false, error: "Semua kolom wajib diisi." };
    if (!isEmail(id) && !isPhone(id)) return { ok: false, error: "Masukkan email atau nomor telepon yang valid." };
    if (password.length < 6) return { ok: false, error: "Kata sandi minimal 6 karakter." };
    const users = read<StoredUser[]>(USERS_KEY, []);
    if (id === ADMIN_EMAIL || users.some((u) => u.identifier === id))
      return { ok: false, error: "Email/nomor telepon sudah terdaftar. Silakan masuk." };
    const created: StoredUser = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      name: name.trim(),
      identifier: id,
      password,
    };
    write(USERS_KEY, [...users, created]);
    startSession({ id: created.id, name: created.name, identifier: created.identifier, role: "user" });
    return { ok: true, role: "user" };
  }, []);

  const login: AuthCtx["login"] = useCallback((identifier, password) => {
    const id = norm(identifier);
    if (!id || !password) return { ok: false, error: "Isi email/nomor telepon dan kata sandi." };

    if (id === ADMIN_EMAIL) {
      if (password !== ADMIN_PASSWORD) return { ok: false, error: "Kata sandi salah." };
      startSession({ id: "admin", name: "Admin", identifier: ADMIN_EMAIL, role: "admin" });
      return { ok: true, role: "admin" };
    }

    const found = read<StoredUser[]>(USERS_KEY, []).find((u) => u.identifier === id);
    if (!found) return { ok: false, error: "Akun belum terdaftar. Silakan daftar terlebih dahulu." };
    if (found.password !== password) return { ok: false, error: "Kata sandi salah." };
    startSession({ id: found.id, name: found.name, identifier: found.identifier, role: "user" });
    return { ok: true, role: "user" };
  }, []);

  const logout = useCallback(() => {
    try { localStorage.removeItem(SESSION_KEY); } catch {}
    setUser(null);
  }, []);

  return <Ctx.Provider value={{ user, ready, register, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}
