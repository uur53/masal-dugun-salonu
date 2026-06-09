"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReservationForm({ hallId }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [booked, setBooked] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) setIsLoggedIn(false);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  useEffect(() => {
    if (!date) return;
    fetch(`/api/reservation/booked?hallId=${hallId}&date=${date}`)
      .then((res) => res.json())
      .then((data) => setBooked(data));
  }, [hallId, date]);

  useEffect(() => {
    fetch(`/api/reservation/booked?hallId=${hallId}`)
      .then((res) => res.json())
      .then((data) => {
        // Sadece 19:00 dolu olan günleri al
        const dates = data
          .filter((b) => b.time === "19:00")
          .map((b) => new Date(b.date).toISOString().slice(0, 10));
        setBookedDates(dates);
      });
  }, [hallId]);

  const isTimeBooked = (t) => booked.some((b) => b.time === t);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hallId, date, time, phone }),
      });
      if (res.ok) {
        setMessage("Rezervasyon talebiniz alındı.");
        setDate("");
        setTime("");
        setPhone("");
      } else {
        let data = null;
        try {
          data = await res.json();
        } catch {
          data = { error: "Sunucu hatası veya beklenmeyen cevap." };
        }
        setMessage(data.error || "Bir hata oluştu.");
      }
    } catch (err) {
      setMessage("Ağ veya sunucu hatası.");
    }
    setLoading(false);
  };

  // Seçili saat doluysa otomatik olarak time'ı sıfırla
  useEffect(() => {
    if (time && isTimeBooked(time)) setTime("");
  }, [date, booked]);

  // Seçili günün 19:00'u doluysa date'i sıfırla
  useEffect(() => {
    if (date && isTimeBooked("19:00")) setDate("");
  }, [date, booked]);

  if (!isLoggedIn) {
    return (
      <div className="text-center text-pink-700 font-semibold mt-4">
        Rezervasyon için giriş yapmalısınız.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 items-center mt-4"
    >
      <label className="font-semibold text-purple-700">
        Rezervasyon Tarihi
      </label>
      <DatePicker
        selected={date ? new Date(date) : null}
        onChange={(d) => setDate(d ? d.toISOString().slice(0, 10) : "")}
        minDate={new Date()}
        dateFormat="dd.MM.yyyy"
        placeholderText="Tarih seçin"
        className="px-4 py-2 border rounded text-gray-900 placeholder-gray-500 w-full text-center"
        excludeDates={bookedDates.map((d) => new Date(d))}
        calendarClassName="bg-white rounded-xl shadow-lg border border-pink-200"
        dayClassName={(d) =>
          bookedDates.includes(d.toISOString().slice(0, 10))
            ? "!bg-red-200 !text-red-700 font-bold !line-through"
            : undefined
        }
        highlightDates={bookedDates.map((d) => ({
          "react-datepicker__day--highlighted-custom-1": new Date(d),
        }))}
        filterDate={(d) => !bookedDates.includes(d.toISOString().slice(0, 10))}
      />
      <style>
        {`.react-datepicker__day--highlighted-custom-1 { background: #fecaca !important; color: #b91c1c !important; border-radius: 50% !important; font-weight: bold; text-decoration: line-through; }`}
      </style>
      {bookedDates.includes(date) && (
        <div className="text-red-600 text-sm font-bold mt-1">
          Bu gün dolu, başka bir gün seçin.
        </div>
      )}
      <label className="font-semibold text-purple-700">Saat</label>
      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
        className="px-4 py-2 border rounded text-gray-900 placeholder-gray-500"
        disabled={!date || isTimeBooked("19:00")}
      >
        <option value="">Saat seçin</option>
        <option value="19:00">19:00</option>
      </select>
      <label className="font-semibold text-purple-700">Telefon Numarası</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        pattern="[0-9]{10,15}"
        placeholder="5XXXXXXXXX"
        className="px-4 py-2 border rounded text-gray-900 placeholder-gray-500 w-full text-center"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded font-bold mt-2 disabled:opacity-60"
      >
        {loading ? "Gönderiliyor..." : "Rezervasyon Yap"}
      </button>
      {message && (
        <div className="text-center text-pink-700 font-semibold mt-2">
          {message}
        </div>
      )}
    </form>
  );
}
