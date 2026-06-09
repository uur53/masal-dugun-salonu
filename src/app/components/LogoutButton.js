"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async (e) => {
    e.preventDefault();
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/"); // Ana sayfaya yönlendir
    window.location.reload(); // Tam sayfa yenileme ile menüdeki session bilgisini kesin güncelle
  };
  return (
    <button
      onClick={handleLogout}
      className="relative inline-flex items-center px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 shadow-md hover:from-pink-600 hover:to-purple-600 hover:scale-105 transition-all duration-200 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 ml-2"
    >
      <span className="mr-2">
        <svg
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="inline align-middle"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7"
          />
        </svg>
      </span>
      Çıkış Yap
    </button>
  );
}
