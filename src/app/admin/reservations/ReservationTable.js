"use client";
import React, { useState } from "react";

export default function ReservationTable({ reservations }) {
  const [list, setList] = useState(reservations);
  const [loadingId, setLoadingId] = useState(null);

  const handleAction = async (id, status) => {
    setLoadingId(id + status);
    await fetch("/api/reservation", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setList(list.map(r => r.id === id ? { ...r, status } : r));
    setLoadingId(null);
  };

  const handleDelete = async (id) => {
    setLoadingId(id + "delete");
    await fetch("/api/reservation", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setList(list.filter(r => r.id !== id));
    setLoadingId(null);
  };

  return (
    <div className="mt-8 w-full flex justify-center">
      <table className="w-[95%] max-w-4xl mx-auto bg-white border-0 rounded-2xl shadow-2xl overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800">
            <th className="px-6 py-4 text-lg font-bold rounded-tl-2xl tracking-wide text-center">Kullanıcı</th>
            <th className="px-6 py-4 text-lg font-bold tracking-wide text-center">Salon</th>
            <th className="px-6 py-4 text-lg font-bold tracking-wide text-center">Tarih</th>
            <th className="px-6 py-4 text-lg font-bold tracking-wide text-center">Saat</th>
            <th className="px-6 py-4 text-lg font-bold tracking-wide text-center">Durum</th>
            <th className="px-6 py-4 text-lg font-bold tracking-wide flex items-center gap-2 justify-center text-center">
              <svg xmlns='http://www.w3.org/2000/svg' className='inline w-5 h-5 text-pink-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm12-12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' /></svg>
              Telefon
            </th>
            <th className="px-6 py-4 text-lg font-bold rounded-tr-2xl tracking-wide text-center">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r, i) => (
            <tr key={r.id} className={`transition-all ${i % 2 === 0 ? "bg-white" : "bg-gradient-to-r from-purple-50 to-pink-50"} hover:bg-pink-100 group border-b border-purple-100 last:border-b-0`}>
              <td className="px-6 py-4 font-semibold text-purple-900 text-base group-hover:text-pink-700 transition whitespace-nowrap text-center">{r.user?.name}</td>
              <td className="px-6 py-4 font-semibold text-pink-700 text-base group-hover:text-purple-700 transition whitespace-nowrap text-center">{r.hall?.name}</td>
              <td className="px-6 py-4 font-semibold text-gray-700 text-base whitespace-nowrap text-center">{new Date(r.date).toLocaleDateString("tr-TR")}</td>
              <td className="px-6 py-4 font-semibold text-gray-700 text-base whitespace-nowrap text-center">{r.time}</td>
              <td className="px-6 py-4 font-bold text-base whitespace-nowrap text-center">
                {r.status === "beklemede" && <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full shadow font-semibold tracking-wide animate-pulse">Beklemede</span>}
                {r.status === "onaylandı" && <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full shadow font-semibold tracking-wide">Onaylandı</span>}
                {r.status === "iptal edildi" && <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full shadow font-semibold tracking-wide line-through">İptal Edildi</span>}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-700 text-base flex items-center gap-2 whitespace-nowrap justify-center text-center">
                <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-pink-500 mr-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm12-12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' /></svg>
                <span className="tracking-wider text-pink-700 font-mono text-base">{r.phone}</span>
              </td>
              <td className="px-6 py-4 flex gap-2 justify-center whitespace-nowrap text-center">
                {r.status === "beklemede" && (
                  <>
                    <button
                      onClick={() => handleAction(r.id, "onaylandı")}
                      disabled={loadingId === r.id + "onaylandı"}
                      className="bg-gradient-to-r from-green-400 to-green-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg hover:scale-105 hover:shadow-xl transition disabled:opacity-60 border-2 border-green-200"
                    >
                      {loadingId === r.id + "onaylandı" ? "Onaylanıyor..." : "Onayla"}
                    </button>
                    <button
                      onClick={() => handleAction(r.id, "iptal edildi")}
                      disabled={loadingId === r.id + "iptal edildi"}
                      className="bg-gradient-to-r from-red-400 to-red-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg hover:scale-105 hover:shadow-xl transition disabled:opacity-60 border-2 border-red-200"
                    >
                      {loadingId === r.id + "iptal edildi" ? "İptal..." : "İptal Et"}
                    </button>
                  </>
                )}
                {r.status === "iptal edildi" && (
                  <button
                    onClick={() => handleDelete(r.id)}
                    disabled={loadingId === r.id + "delete"}
                    className="bg-gradient-to-r from-gray-300 to-red-200 text-red-700 px-5 py-2 rounded-xl font-bold text-sm shadow-lg hover:scale-105 hover:shadow-xl transition disabled:opacity-60 border-2 border-red-200 flex items-center gap-2"
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg>
                    {loadingId === r.id + "delete" ? "Siliniyor..." : "Sil"}
                  </button>
                )}
                {r.status === "onaylandı" && (
                  <button
                    onClick={() => handleDelete(r.id)}
                    disabled={loadingId === r.id + "delete"}
                    className="bg-gradient-to-r from-gray-300 to-red-200 text-red-700 px-5 py-2 rounded-xl font-bold text-sm shadow-lg hover:scale-105 hover:shadow-xl transition disabled:opacity-60 border-2 border-red-200 flex items-center gap-2"
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg>
                    {loadingId === r.id + "delete" ? "Siliniyor..." : "Sil"}
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
