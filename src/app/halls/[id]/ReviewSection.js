"use client";
import { useEffect, useState } from "react";
import AdminReviewDeleteButton from "./AdminReviewDeleteButton";
import { useSession } from "@/lib/useSession";

export default function ReviewSection({ hallId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const session = useSession();

  useEffect(() => {
    fetch(`/api/review?hallId=${hallId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews || []));
  }, [hallId, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hallId, rating, comment }),
    });
    if (res.ok) {
      setSuccess("Yorumunuz kaydedildi.");
      setComment("");
      setRating(5);
    } else {
      const data = await res.json();
      setError(data.error || "Bir hata oluştu.");
    }
    setLoading(false);
  };

  const avgRating = reviews.length ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <div className="w-full mt-8">
      <h3 className="text-2xl font-bold text-pink-700 mb-2">Yorumlar & Puanlar</h3>
      {avgRating && (
        <div className="mb-2 text-lg text-purple-700 font-semibold">Ortalama Puan: {avgRating} / 5 ⭐</div>
      )}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2 bg-white p-4 rounded-xl border border-pink-200">
        <label className="font-semibold text-purple-800">Puan:</label>
        <select value={rating} onChange={e => setRating(Number(e.target.value))} className="px-2 py-1 rounded border text-purple-900 bg-purple-50">
          {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Yorumunuz" required className="px-2 py-1 rounded border text-gray-900 bg-purple-50" />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button type="submit" disabled={loading} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded font-bold mt-2">Gönder</button>
      </form>
      <div className="space-y-4">
        {reviews.length === 0 && <div className="text-gray-500">Henüz yorum yok.</div>}
        {reviews.map((r) => (
          <div key={r.id} className="bg-purple-50 border border-purple-200 rounded-xl p-3 shadow flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-purple-900">{r.user?.name || "Kullanıcı"}</span>
              <span className="text-yellow-500">{"⭐".repeat(r.rating)}</span>
              <span className="text-gray-400 text-xs">{new Date(r.createdAt).toLocaleDateString()}</span>
              {session?.role === "ADMIN" && (
                <AdminReviewDeleteButton reviewId={r.id} onDeleted={() => setSuccess("Yorum silindi.")} />
              )}
            </div>
            <div className="text-gray-900">{r.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
