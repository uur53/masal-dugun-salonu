import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import UserTable from "./UserTable";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function AdminPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/auth/login");

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
    orderBy: { id: "asc" },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-white">
      <div className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-pink-200 backdrop-blur-md animate-fade-in text-gray-800 relative">
        <h2 className="text-4xl font-extrabold text-pink-600 mb-8 text-center drop-shadow-lg tracking-tight flex items-center justify-center gap-3">
          <svg xmlns='http://www.w3.org/2000/svg' className='w-10 h-10 text-purple-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' /></svg>
          Admin Paneli
        </h2>
        <div className="flex flex-col md:flex-row gap-6 mb-8 justify-center items-center">
          <Link href="/admin/halls" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-xl text-center shadow-lg hover:scale-105 hover:shadow-2xl transition border-2 border-pink-200 flex-1">Salon Yönetimi</Link>
          <Link href="/admin/reservations" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-xl text-center shadow-lg hover:scale-105 hover:shadow-2xl transition border-2 border-purple-200 flex-1">Rezervasyonlar</Link>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-purple-700 text-center tracking-wide">Kullanıcılar</h3>
        <UserTable users={users} />
      </div>
    </div>
  );
}
