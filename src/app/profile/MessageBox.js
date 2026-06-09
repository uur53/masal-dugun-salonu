"use client";
import { useEffect, useState } from "react";

export default function MessageBox({ users, currentUserId, isAdmin }) {
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMessages();
  }, [isAdmin]);

  const loadMessages = () => {
    fetch(isAdmin ? "/api/message?all=1" : "/api/message")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId, content }),
    });
    if (res.ok) {
      setContent("");
      loadMessages();
    } else {
      setError("Mesaj gönderilemedi.");
    }
    setLoading(false);
  };

  const handleDelete = async (messageId) => {
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/message?id=${messageId}`, { method: "DELETE" });
    if (res.ok) {
      loadMessages();
    } else {
      const data = await res.json();
      setError(data.error || "Mesaj silinemedi.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white via-pink-50 to-purple-100 rounded-3xl shadow-2xl p-8 mt-8 border border-purple-200/60 backdrop-blur-md">
      <h2 className="text-3xl font-extrabold text-purple-700 mb-6 text-center tracking-tight drop-shadow-lg flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8zm-2 0V7m0 8l-7-5-7 5" /></svg>
        Mesajlarım
      </h2>
      <form onSubmit={handleSend} className="flex flex-col gap-4 mb-8 bg-white/80 rounded-2xl p-6 shadow-md border border-pink-100">
        <label className="font-semibold text-purple-700">Kime:</label>
        <select value={receiverId} onChange={e => setReceiverId(e.target.value)} required className="px-4 py-2 border rounded bg-white text-gray-900 focus:ring-2 focus:ring-pink-300">
          <option value="">Kullanıcı seçin</option>
          {users.filter(u => u.id !== currentUserId).map(u => (
            <option key={u.id} value={u.id} className="bg-white text-gray-900">{u.name}</option>
          ))}
        </select>
        <label className="font-semibold text-purple-700">Mesaj</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} required className="px-4 py-2 border rounded min-h-[60px] bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-300" placeholder="Mesajınızı yazın..." />
        <button type="submit" disabled={loading} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-xl font-bold mt-2 shadow-lg hover:scale-105 transition disabled:opacity-60">
          {loading ? "Gönderiliyor..." : "Gönder"}
        </button>
        {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
      </form>
      <div className="max-h-96 overflow-y-auto flex flex-col gap-2 pb-2">
        {messages.length === 0 ? (
          <div className="text-gray-500 text-center">Hiç mesaj yok.</div>
        ) : (
          messages.map(m => (
            <div
              key={m.id}
              className={`mb-1 p-4 rounded-2xl shadow-md flex flex-col border-2 relative group transition-all duration-200 ${m.senderId === currentUserId
                ? "bg-gradient-to-r from-purple-200/80 to-pink-100/80 text-right ml-16 border-purple-300"
                : "bg-gradient-to-l from-pink-200/80 to-purple-100/80 text-left mr-16 border-pink-300"}`}
            >
              <div className="text-xs text-gray-600 mb-1 font-semibold flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-pink-400"></span>
                {m.senderId === currentUserId ? "Ben" : m.sender.name} → {m.receiverId === currentUserId ? "Ben" : m.receiver.name}
              </div>
              <div className="text-base text-gray-900 font-medium break-words whitespace-pre-line">{m.content}</div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-gray-400 italic">
                  {typeof window === "undefined"
                    ? new Date(m.createdAt).toISOString().replace("T", " ").slice(0, 16)
                    : new Date(m.createdAt).toLocaleString()}
                </div>
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => handleDelete(m.id)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Sil
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
