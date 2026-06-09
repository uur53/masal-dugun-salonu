"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) setSuccess("Kayıt başarılı! Giriş yapabilirsiniz.");
    else setError(data.error || "Bir hata oluştu.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200">
      <form onSubmit={handleSubmit} className="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-pink-100 backdrop-blur-md animate-fade-in">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-6 text-center drop-shadow">Kayıt Ol</h2>
        <input name="name" type="text" placeholder="Ad Soyad" value={form.name} onChange={handleChange} required className="mb-4 w-full px-4 py-2 border border-pink-200 rounded-full focus:ring-2 focus:ring-pink-400 outline-none transition text-gray-900 placeholder-gray-500" />
        <input name="email" type="email" placeholder="E-posta" value={form.email} onChange={handleChange} required className="mb-4 w-full px-4 py-2 border border-purple-200 rounded-full focus:ring-2 focus:ring-purple-400 outline-none transition text-gray-900 placeholder-gray-500" />
        <input name="password" type="password" placeholder="Şifre" value={form.password} onChange={handleChange} required className="mb-4 w-full px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-pink-200 outline-none transition text-gray-900 placeholder-gray-500" />
        {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
        {success && <div className="text-green-600 mb-2 text-center">{success}</div>}
        <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded-full font-bold shadow-lg transition-all duration-200 mt-2">Kayıt Ol</button>
      </form>
    </div>
  );
}
