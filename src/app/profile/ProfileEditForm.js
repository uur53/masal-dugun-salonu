"use client";
import { useState } from "react";

export default function ProfileEditForm({ name, email, onSave }) {
  const [form, setForm] = useState({ name, email, password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // Admin kendi rolünü değiştiremez
    if (typeof window !== "undefined" && window.sessionStorage) {
      const session = JSON.parse(window.sessionStorage.getItem("session") || "null");
      if (session && session.role === "ADMIN" && form.email !== email) {
        setMessage("Admin kendi rolünü veya e-postasını değiştiremez.");
        setLoading(false);
        return;
      }
    }
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage("Profil başarıyla güncellendi.");
      onSave && onSave(form);
    } else {
      setMessage("Bir hata oluştu.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto mb-6">
      <label className="font-semibold text-purple-700">Ad Soyad</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        className="px-4 py-2 border rounded text-gray-900 placeholder-gray-500"
      />
      <label className="font-semibold text-purple-700">E-posta</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        className="px-4 py-2 border rounded text-gray-900 placeholder-gray-500"
      />
      <label className="font-semibold text-purple-700">Yeni Şifre</label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        className="px-4 py-2 border rounded text-gray-900 placeholder-gray-500"
        placeholder="Şifreyi değiştirmek istemiyorsanız boş bırakın"
        autoComplete="new-password"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded font-bold mt-2 disabled:opacity-60"
      >
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>
      {message && <div className="text-center text-pink-700 font-semibold mt-2">{message}</div>}
    </form>
  );
}
