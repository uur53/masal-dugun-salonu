"use client";
import { useEffect, useState } from "react";

export default function AdminReviewDeleteButton({ reviewId, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!confirm("Yorumu silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    setError("");
    const res = await fetch(`/api/review/admin?id=${reviewId}`, { method: "DELETE" });
    if (res.ok) {
      onDeleted();
    } else {
      const data = await res.json();
      setError(data.error || "Silinemedi.");
    }
    setLoading(false);
  };

  return (
    <>
      <button onClick={handleDelete} disabled={loading} className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">Sil</button>
      {error && <span className="text-xs text-red-500 ml-2">{error}</span>}
    </>
  );
}
