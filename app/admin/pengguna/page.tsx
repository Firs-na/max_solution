"use client";
import { useAdminData } from "@/lib/admin";

export default function AdminPenggunaPage() {
  const { users, orders, requests, loaded } = useAdminData();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Pengguna</h1>
      <p className="mt-1 text-ink">Akun yang sudah terdaftar.</p>

      {loaded && users.length === 0 && (
        <p className="mt-6 rounded-2xl border border-dashed border-slate-300 py-12 text-center text-ink">Belum ada pengguna terdaftar.</p>
      )}

      {users.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-slate-100 text-ink">
              <tr>
                <th className="px-5 py-4 font-medium">Nama</th>
                <th className="px-5 py-4 font-medium">Email / Telepon</th>
                <th className="px-5 py-4 font-medium">Pesanan</th>
                <th className="px-5 py-4 font-medium">Permintaan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-navy">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="px-5 py-4 font-medium">{u.name}</td>
                  <td className="px-5 py-4">{u.identifier}</td>
                  <td className="px-5 py-4">{orders.filter((o) => o.userId === u.id).length}</td>
                  <td className="px-5 py-4">{requests.filter((r) => r.userId === u.id).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
