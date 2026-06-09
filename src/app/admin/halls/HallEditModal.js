"use client";
import React, { useState } from "react";

export default function HallEditModal({ hall, onClose, onSave }) {
  const [form, setForm] = useState({
    name: hall.name,
    capacity: hall.capacity,
    description: hall.description,
    images: hall.images ? hall.images.map((img) => img.url) : [],
    price: hall.price || 0,
    features: hall.features || ""
  });
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = async (e) => {
    setUploading(true);
    const files = Array.from(e.target.files);
    const data = new FormData();
    files.forEach((file) => data.append("file", file));
    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    setForm({ ...form, images: [...form.images, ...result.urls] });
    setUploading(false);
  };
  const removeImage = (i) => {
    setForm({ ...form, images: form.images.filter((_, idx) => idx !== i) });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.capacity || !form.description || form.price === undefined) {
      setError("Tüm alanlar zorunlu.");
      return;
    }
    await onSave({ ...form, id: hall.id, images: form.images, price: Number(form.price), features: form.features });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Salon Düzenle</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="name" type="text" placeholder="Salon Adı" value={form.name} onChange={handleChange} required className="px-4 py-2 border rounded text-gray-900 placeholder-gray-500" />
          <input name="capacity" type="number" placeholder="Kapasite" value={form.capacity} onChange={handleChange} required className="px-4 py-2 border rounded text-gray-900 placeholder-gray-500" />
          <input name="price" type="number" placeholder="Fiyat (₺)" value={form.price} onChange={handleChange} required min="0" className="px-4 py-2 border rounded text-gray-900 placeholder-gray-500" />
          <textarea name="description" placeholder="Açıklama" value={form.description} onChange={handleChange} required className="px-4 py-2 border rounded text-gray-900 placeholder-gray-500" />
          <textarea name="features" placeholder="Salon Özellikleri (virgülle ayırın: Klima, Otopark, ... )" value={form.features} onChange={handleChange} className="px-4 py-2 border rounded text-gray-900 placeholder-gray-500" />
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-purple-700">Salon Fotoğrafları</label>
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="mb-2 text-gray-900 file:text-gray-900 file:bg-purple-100 file:border file:border-purple-300 file:rounded file:px-3 file:py-1" />
            {uploading && <div className="text-sm text-gray-500">Yükleniyor...</div>}
            <div className="flex flex-wrap gap-2">
              {form.images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} alt="Salon" className="w-20 h-14 object-cover rounded border" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
                </div>
              ))}
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex gap-2 mt-2">
            <button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded font-bold">Kaydet</button>
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded font-bold">İptal</button>
          </div>
        </form>
      </div>
    </div>
  );
}
