"use client";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/useSession";

export default function HallReservationCalendar({ hallId }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    fetch(`/api/hall/reservations?hallId=${hallId}`)
      .then((res) => res.json())
      .then((data) => {
        setReservations(data.reservations || []);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setReservations([]);
        alert("Takvim verisi alınamadı: " + err.message);
      });
  }, [hallId]);

  return (
    <div className="w-full my-8">
      <h3 className="text-xl font-bold text-purple-700 mb-3">Rezervasyon Takvimi</h3>
      {loading ? (
        <div className="text-gray-500">Yükleniyor...</div>
      ) : reservations.length === 0 ? (
        <div className="text-gray-500">Bu salona ait son 1 yılda rezervasyon yok.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-purple-200 rounded-xl bg-white shadow-md">
            <thead>
              <tr className="bg-purple-200 text-purple-800">
                <th className="px-3 py-2 font-semibold">Tarih</th>
                <th className="px-3 py-2 font-semibold">Saat</th>
                <th className="px-3 py-2 font-semibold">Durum</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r, i) => (
                <tr key={r.id || r.date + r.time} className={
                  `border-b last:border-b-0 ` +
                  (i % 2 === 0 ? "bg-purple-50" : "bg-white")
                }>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-800 font-medium">{new Date(r.date).toLocaleDateString()}</td>
                  <td className="px-3 py-2 text-gray-800 font-medium">{r.time}</td>
                  <td className="px-3 py-2">
                    <span className={
                      r.status === "approved" ? "text-green-700 font-bold" :
                      r.status === "pending" ? "text-yellow-700 font-bold" :
                      r.status === "rejected" ? "text-red-700 font-bold" :
                      "text-gray-700 font-bold"
                    }>
                      {r.status ? "Dolu" : "-"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
