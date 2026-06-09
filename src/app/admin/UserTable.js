"use client";
import React from "react";
import { useSession } from "@/lib/useSession";

export default function UserTable({ users }) {
  const session = useSession();
  const [error, setError] = React.useState("");

  async function handleDelete(id) {
    if (!confirm("Kullanıcı silinsin mi?")) return;
    setError("");
    const res = await fetch(`/api/admin/user?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      window.location.reload();
    } else {
      const data = await res.json();
      setError(data.error || "Kullanıcı silinemedi.");
    }
  }

  async function handleRole(id, role) {
    setError("");
    const res = await fetch(`/api/admin/user`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role }),
    });
    if (res.ok) {
      window.location.reload();
    } else {
      const data = await res.json();
      setError(data.error || "Rol güncellenemedi.");
    }
  }

  return (
    <div className="overflow-x-auto w-full">
      {error && (
        <div className="mb-4 text-center text-red-600 font-semibold bg-red-50 border border-red-200 rounded-xl py-2 px-4">
          {error}
        </div>
      )}
      <table className="w-full text-left border-collapse mb-6 rounded-2xl shadow-lg bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <thead>
          <tr className="bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800">
            <th className="p-4 text-center">ID</th>
            <th className="p-4 text-center">Ad Soyad</th>
            <th className="p-4 text-center">E-posta</th>
            <th className="p-4 text-center">Rol</th>
            <th className="p-4 text-center">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b last:border-b-0 hover:bg-pink-100 transition group">
              <td className="p-4 text-center font-semibold text-purple-700">{u.id}</td>
              <td className="p-4 text-center font-semibold text-pink-700 group-hover:text-purple-700">{u.name}</td>
              <td className="p-4 text-center text-gray-700">{u.email}</td>
              <td className="p-4 text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${u.role === "ADMIN" ? "bg-purple-200 text-purple-800" : "bg-pink-200 text-pink-800"}`}>
                  {u.role === "ADMIN" ? "Yönetici" : "Kullanıcı"}
                </span>
              </td>
              <td className="p-4 flex flex-wrap gap-2 justify-center items-center">
                {session?.id !== u.id && (
                  <button onClick={() => handleDelete(u.id)} className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-xl font-bold shadow hover:scale-105 hover:shadow-xl transition flex items-center gap-2">
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg>
                    Sil
                  </button>
                )}
                {u.role === "USER" && (
                  <button onClick={() => handleRole(u.id, "ADMIN")}
                    className="px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-xl font-bold shadow hover:scale-105 hover:shadow-xl transition flex items-center gap-2">
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' /></svg>
                    Yönetici Yap
                  </button>
                )}
                {u.role === "ADMIN" && session?.id !== u.id && (
                  <button onClick={() => handleRole(u.id, "USER")}
                    className="px-4 py-2 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-xl font-bold shadow hover:scale-105 hover:shadow-xl transition flex items-center gap-2">
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' /></svg>
                    Kullanıcı Yap
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
