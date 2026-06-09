"use client";
import LogoutButton from "@/app/components/LogoutButton";
import Link from "next/link";
import NotificationBell from "./NotificationBell";

export default function MenuBar({ session }) {
  return (
    <nav className="w-full flex justify-end pr-8 py-4 bg-transparent z-50 sticky top-0">
      <div className="flex gap-3 px-4 py-1 bg-white/70 rounded-full border border-pink-100 backdrop-blur-md shadow-sm items-center">
        <NotificationBell />
        {!session && (
          <>
            <Link
              href="/auth/login"
              className="inline-flex items-center px-4 py-1.5 rounded-full font-medium text-pink-600 bg-pink-50 hover:bg-pink-100 transition border border-pink-100 text-base"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline align-middle mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12H3m0 0l4-4m-4 4l4 4m13-4a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Giriş Yap
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center px-4 py-1.5 rounded-full font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 transition border border-purple-100 text-base"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline align-middle mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Kayıt Ol
            </Link>
          </>
        )}
        {session && session.role === "USER" && (
          <>
            <Link
              href="/profile"
              className="inline-flex items-center px-4 py-1.5 rounded-full font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 transition border border-purple-100 text-base"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline align-middle mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Profilim
            </Link>
            <Link
              href="/profile/messages"
              className="inline-flex items-center px-4 py-1.5 rounded-full font-medium text-pink-700 bg-pink-50 hover:bg-pink-100 transition border border-pink-100 text-base"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline align-middle mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8zm-2 0V7m0 8l-7-5-7 5"
                />
              </svg>
              Mesajlar
            </Link>
            <LogoutButton />
          </>
        )}
        {session && session.role === "ADMIN" && (
          <>
            <Link
              href="/admin"
              className="inline-flex items-center px-4 py-1.5 rounded-full font-medium text-pink-700 bg-pink-50 hover:bg-pink-100 transition border border-pink-100 text-base"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline align-middle mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-4 4h4m-2 0v4m0 0h-2a2 2 0 01-2-2v-2a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2z"
                />
              </svg>
              Admin Paneli
            </Link>
            <Link
              href="/admin/messages"
              className="inline-flex items-center px-4 py-1.5 rounded-full font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 transition border border-purple-100 text-base"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline align-middle mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8zm-2 0V7m0 8l-7-5-7 5"
                />
              </svg>
              Mesajlar
            </Link>
            <LogoutButton />
          </>
        )}
      </div>
    </nav>
  );
}
