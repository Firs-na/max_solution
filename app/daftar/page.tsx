"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Sparkle } from "lucide-react";
import Field from "@/components/Field";
import { useAuth } from "@/lib/auth";

export default function DaftarPage() {
  const router = useRouter();
  const { user, ready, register } = useAuth();
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && user) router.replace(user.role === "admin" ? "/admin" : "/");
  }, [ready, user, router]);

  const clear = () => setError("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return setError("Konfirmasi kata sandi tidak sama.");
    const r = register({ name, identifier, password });
    if (!r.ok) return setError(r.error);
    router.replace("/");
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-blue-50 via-surface to-orange-50 p-4">
      <form onSubmit={submit} className="w-full max-w-md overflow-hidden rounded-2xl border-t-4 border-t-navy bg-white p-6 shadow-xl md:p-10">
        <Sparkle className="mx-auto h-8 w-8 fill-blue-600 text-blue-600" />
        <h1 className="mt-6 text-center font-display text-3xl font-bold text-navy">Buat Akun</h1>
        <p className="mx-auto mt-2 max-w-xs text-center text-ink">Daftar untuk mulai merencanakan perjalanan Anda bersama Max Solution.</p>

        <div className="mt-8 space-y-5">
          <Field id="name" label="Nama Lengkap" icon={<User className="h-5 w-5" />}
            value={name} onChange={(v) => { setName(v); clear(); }} autoComplete="name" />
          <Field id="id" label="Email atau Nomor Telepon" icon={<Mail className="h-5 w-5" />}
            value={identifier} onChange={(v) => { setIdentifier(v); clear(); }} autoComplete="username" />
          <Field id="pw" label="Kata Sandi" icon={<Lock className="h-5 w-5" />} type="password"
            value={password} onChange={(v) => { setPassword(v); clear(); }} autoComplete="new-password" />
          <Field id="pw2" label="Konfirmasi Kata Sandi" icon={<Lock className="h-5 w-5" />} type="password"
            value={confirm} onChange={(v) => { setConfirm(v); clear(); }} autoComplete="new-password" />
        </div>

        {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}

        <button type="submit" className="mt-6 w-full rounded-lg bg-navy py-3.5 font-display text-white shadow-md">Daftar Sekarang</button>

        <p className="mt-8 text-center text-sm text-ink">
          Sudah punya akun? <Link href="/login" className="font-medium text-sun-deep">Masuk</Link>
        </p>
      </form>
    </div>
  );
}
