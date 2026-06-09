import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import HallManager from "./HallManager";

const prisma = new PrismaClient();

export default async function AdminHallsPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/auth/login");

  const halls = await prisma.hall.findMany({ orderBy: { id: "asc" } });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-200 p-6 relative overflow-hidden">
      {/* Dekoratif arka plan */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      </div>
      <div className="bg-white/90 p-12 rounded-3xl shadow-2xl w-full max-w-3xl border border-pink-100 backdrop-blur-md animate-fade-in z-10 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-pink-600 mb-8 text-center drop-shadow-lg tracking-tight flex items-center justify-center gap-3">
          <svg xmlns='http://www.w3.org/2000/svg' className='w-10 h-10 text-purple-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' /></svg>
          Salon Yönetimi
        </h2>
        <h3 className="text-2xl font-bold mb-6 text-purple-700 text-center tracking-wide">Salonlar</h3>
        <HallManager halls={halls} />
      </div>
    </div>
  );
}
