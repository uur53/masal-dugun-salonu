"use client";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Giriş başarılı! Yönlendiriliyorsunuz...");
      window.location.href = "/";
    } else {
      setError(data.error || "Bir hata oluştu.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200">
      <form onSubmit={handleSubmit} className="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-100 backdrop-blur-md animate-fade-in">
        <h2 className="text-3xl font-extrabold text-purple-600 mb-6 text-center drop-shadow">Giriş Yap</h2>
        <input name="email" type="email" placeholder="E-posta" value={form.email} onChange={handleChange} required className="mb-4 w-full px-4 py-2 border border-pink-200 rounded-full focus:ring-2 focus:ring-pink-400 outline-none transition text-gray-900 placeholder-gray-500" />
        <input name="password" type="password" placeholder="Şifre" value={form.password} onChange={handleChange} required className="mb-4 w-full px-4 py-2 border border-purple-200 rounded-full focus:ring-2 focus:ring-purple-400 outline-none transition text-gray-900 placeholder-gray-500" />
        {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
        {success && <div className="text-green-600 mb-2 text-center">{success}</div>}
        <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-2 rounded-full font-bold shadow-lg transition-all duration-200 mt-2">Giriş Yap</button>
      </form>
    </div>
  );
}
