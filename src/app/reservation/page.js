'use client';
import { useState, useEffect } from "react";
import ReservationForm from "../halls/[id]/ReservationForm";
import HallImages from "../halls/HallImages";
import HallReservationCalendar from "../halls/[id]/HallReservationCalendar";

export default function ReservationPage() {
  const [halls, setHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);

  useEffect(() => {
    fetch("/api/admin/hall")
      .then((res) => res.json())
      .then((data) => setHalls(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-white p-6 relative overflow-hidden">
      {/* Dekoratif arka plan */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      </div>
      <div className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-4xl border border-pink-100 backdrop-blur-md z-10 animate-fade-in flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-pink-600 mb-8 text-center drop-shadow-lg tracking-tight flex items-center justify-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Rezervasyon Yap
        </h2>
        {!selectedHall && (
          <>
            <p className="mb-6 text-lg text-gray-700 text-center">
              Lütfen rezervasyon yapmak istediğiniz salonu seçin:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full mb-8">
              {halls.map((h) => (
                <div
                  key={h.id}
                  className="bg-white/90 rounded-2xl shadow-xl border-2 border-purple-200 p-6 flex flex-col items-center group hover:shadow-2xl hover:border-pink-400 transition-all duration-300 relative overflow-hidden min-w-[260px] max-w-[340px] w-full cursor-pointer focus:ring-4 focus:ring-pink-200"
                  onClick={() => setSelectedHall(h)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedHall(h); }}
                >
                  <HallImages images={h.images} />
                  <h3 className="text-2xl font-bold text-pink-700 mb-2 text-center group-hover:text-purple-700 transition">
                    {h.name}
                  </h3>
                  <div className="flex items-center justify-center gap-3 mb-2 w-full">
                    <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-base font-semibold shadow min-w-[90px] text-center">
                      Kapasite: {h.capacity}
                    </span>
                    <span className="inline-block bg-pink-100 text-pink-700 px-4 py-1 rounded-full text-base font-semibold shadow min-w-[90px] text-center">
                      Fiyat: {h.price?.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                  <div className="text-gray-700 text-center mb-2 line-clamp-3 min-h-[40px] w-full text-base font-medium">
                    {h.description}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {selectedHall && (
          <div className="w-full max-w-lg mx-auto">
            <button
              onClick={() => setSelectedHall(null)}
              className="mb-6 px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full font-bold shadow hover:scale-105 hover:shadow-xl transition"
            >
              Salon Seçimini Değiştir
            </button>
            <ReservationForm hallId={selectedHall.id} />
            <HallReservationCalendar hallId={selectedHall.id} />
          </div>
        )}
      </div>
    </div>
  );
}
