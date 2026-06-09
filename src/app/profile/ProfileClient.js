"use client";
import { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";
import LogoutButton from "@/app/components/LogoutButton";
import UserReservationTable from "./UserReservationTable";
import Image from "next/image";

export default function ProfileClient({ session, reservations }) {
  const [user, setUser] = useState({ name: session.name, email: session.email });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-200 p-6 relative overflow-hidden">
      {/* Dekoratif arka plan */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      </div>
      <div className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-purple-100 backdrop-blur-md animate-fade-in z-10 flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center shadow-lg mb-4">
            <Image src="/window.svg" width={60} height={60} alt="Avatar" className="rounded-full" />
          </div>
          <h2 className="text-4xl font-extrabold text-pink-600 mb-2 text-center drop-shadow-lg tracking-tight flex items-center justify-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Profilim
          </h2>
        </div>
        <ProfileEditForm name={user.name} email={user.email} onSave={setUser} />
        <div className="mb-4 text-lg text-gray-700 w-full flex items-center gap-2">
          <span className="font-bold text-purple-700 min-w-[90px]">Ad Soyad:</span>{" "}
          <span className="font-semibold">{user.name}</span>
        </div>
        <div className="mb-4 text-lg text-gray-700 w-full flex items-center gap-2">
          <span className="font-bold text-purple-700 min-w-[90px]">E-posta:</span>{" "}
          <span className="font-semibold">{user.email}</span>
        </div>
        {/* Rol sadece admin ise gösterilsin */}
        {/*
        <div className="mb-4 text-lg text-gray-700 w-full flex items-center gap-2">
          <span className="font-bold text-purple-700 min-w-[90px]">Rol:</span>{" "}
          <span className="font-semibold">Kullanıcı</span>
        </div>
        */}
        <LogoutButton />
        <h3 className="text-2xl font-bold mt-10 mb-4 text-purple-700 text-center tracking-wide">Rezervasyonlarım</h3>
        <UserReservationTable reservations={reservations} />
        {/* Mesaj kutusu kaldırıldı */}
      </div>
    </div>
  );
}
