"use client";
import React, { useState } from "react";

export default function UserReservationTable({ reservations }) {
  const [list, setList] = useState(reservations);
  const [loadingId, setLoadingId] = useState(null);

  const handleCancel = async (id) => {
    if (!confirm("Rezervasyonu iptal etmek istediğinize emin misiniz?")) return;
    setLoadingId(id);
    const res = await fetch(`/api/reservation?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setList(list.filter(r => r.id !== id));
    }
    setLoadingId(null);
  };

  if (!list.length) return <div className="text-center text-gray-500 mt-4">Henüz rezervasyonunuz yok.</div>;
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border rounded-xl shadow">
        <thead>
          <tr className="bg-pink-100 text-pink-700">
            <th className="px-4 py-2">Salon</th>
            <th className="px-4 py-2">Tarih</th>
            <th className="px-4 py-2">Saat</th>
            <th className="px-4 py-2">Durum</th>
            <th className="px-4 py-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.id} className="border-b text-gray-900 hover:bg-purple-50 transition">
              <td className="px-4 py-2 font-semibold">{r.hall?.name}</td>
              <td className="px-4 py-2 font-semibold">{new Date(r.date).toLocaleDateString("tr-TR")}</td>
              <td className="px-4 py-2 font-semibold">{r.time}</td>
              <td className="px-4 py-2 font-bold text-pink-700 uppercase">{r.status}</td>
              <td className="px-4 py-2">
                {(r.status === "beklemede" || r.status === "onaylandı") && (
                  <button
                    onClick={() => handleCancel(r.id)}
                    disabled={loadingId === r.id}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-bold text-sm disabled:opacity-60"
                  >
                    {loadingId === r.id ? "İptal Ediliyor..." : "İptal Et"}
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
