"use client";
import { useEffect, useState } from "react";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notification")
      .then(res => res.ok ? res.json() : { notifications: [] })
      .then(data => {
        setNotifications(data.notifications || []);
        setLoading(false);
      })
      .catch(() => {
        setNotifications([]);
        setLoading(false);
      });
  }, []);

  const handleRead = async (id) => {
    await fetch("/api/notification", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative inline-block">
      <button onClick={() => setOpen(!open)} className="relative focus:outline-none">
        <svg className="w-7 h-7 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-pink-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b font-bold text-purple-700">Bildirimler</div>
          {loading ? (
            <div className="p-4 text-gray-500">Yükleniyor...</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-gray-500">Hiç bildiriminiz yok.</div>
          ) : (
            notifications.map(n => (
              <div key={n.id} className={`p-4 border-b last:border-b-0 flex items-center gap-2 ${n.read ? "bg-gray-50" : "bg-pink-50"}`}>
                <span className="flex-1 text-sm text-gray-800">{n.message}</span>
                {!n.read && (
                  <button onClick={() => handleRead(n.id)} className="text-xs text-pink-600 font-bold hover:underline">Okundu</button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
