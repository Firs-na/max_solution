"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Sparkle } from "lucide-react";
import Field from "@/components/Field";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { user, ready, login } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && user) router.replace(user.role === "admin" ? "/admin" : "/");
  }, [ready, user, router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = login(identifier, password);
    if (!r.ok) return setError(r.error);
    router.replace(r.role === "admin" ? "/admin" : "/");
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-blue-50 via-surface to-orange-50 p-4">
      <form onSubmit={submit} className="w-full max-w-md overflow-hidden rounded-2xl border-t-4 border-t-navy bg-white p-6 shadow-xl md:p-10">
        <Sparkle className="mx-auto h-8 w-8 fill-blue-600 text-blue-600" />
        <h1 className="mt-6 text-center font-display text-3xl font-bold text-navy">Selamat Datang</h1>
        <p className="mx-auto mt-2 max-w-xs text-center text-ink">Masuk ke akun Max Solution Anda untuk memulai petualangan baru.</p>

        <div className="mt-8 space-y-5">
          <Field id="id" label="Email atau Nomor Telepon" icon={<Mail className="h-5 w-5" />}
            value={identifier} onChange={(v) => { setIdentifier(v); setError(""); }} autoComplete="username" />
          <Field id="pw" label="Kata Sandi" icon={<Lock className="h-5 w-5" />} type={show ? "text" : "password"}
            value={password} onChange={(v) => { setPassword(v); setError(""); }} autoComplete="current-password"
            labelRight={<a href="#" className="font-medium text-sun-deep">Lupa Kata Sandi?</a>}
            right={
              <button type="button" onClick={() => setShow(!show)} aria-label="Tampilkan kata sandi" className="text-slate-500">
                {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            } />
        </div>

        {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}

        <button type="submit" className="mt-6 w-full rounded-lg bg-navy py-3.5 font-display text-white shadow-md">Masuk Sekarang</button>

        <div className="my-8 flex items-center gap-4 text-sm text-slate-300">
          <hr className="flex-1" /> Atau masuk dengan <hr className="flex-1" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button type="button" className="flex items-center justify-center gap-3 rounded-lg border border-slate-300 bg-surface py-3 font-display text-navy">
            <span className="h-5 w-5 rounded bg-slate-600" /> Google
          </button>
          <button type="button" className="flex items-center justify-center gap-3 rounded-lg border border-slate-300 bg-surface py-3 font-display text-navy">
            <span className="h-5 w-5 rounded bg-blue-600" /> Facebook
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-ink">
          Belum punya akun? <Link href="/daftar" className="font-medium text-sun-deep">Daftar Sekarang</Link>
        </p>
      </form>
    </div>
  );
}
