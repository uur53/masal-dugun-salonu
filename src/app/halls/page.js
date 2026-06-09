import HallImages from "./HallImages";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function HallsPage() {
  const halls = await prisma.hall.findMany({
    orderBy: { id: "asc" },
    include: { images: true },
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-200 p-6 relative overflow-hidden">
      {/* Dekoratif arka plan */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      </div>
      <div className="bg-white/90 p-12 rounded-3xl shadow-2xl w-full max-w-7xl border border-pink-100 backdrop-blur-md animate-fade-in z-10">
        <h2 className="text-5xl font-extrabold text-pink-600 mb-12 text-center drop-shadow tracking-tight uppercase flex items-center justify-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Salonlarımız
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {halls.map((h) => (
            <Link key={h.id} href={`/halls/${h.id}`} className="no-underline">
              <div
                className="bg-white/90 rounded-2xl shadow-xl border-2 border-purple-200 p-8 flex flex-col items-center group hover:shadow-2xl hover:border-pink-400 transition-all duration-300 relative overflow-hidden min-w-[320px] max-w-[400px] w-full cursor-pointer focus:ring-4 focus:ring-pink-200"
              >
                <HallImages images={h.images} />
                <h3 className="text-3xl font-bold text-pink-700 mb-3 text-center group-hover:text-purple-700 transition">
                  {h.name}
                </h3>
                <div className="flex items-center justify-center gap-4 mb-3 w-full">
                  <span className="inline-block bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-lg font-semibold shadow min-w-[120px] text-center">
                    Kapasite: {h.capacity}
                  </span>
                  <span className="inline-block bg-pink-100 text-pink-700 px-5 py-2 rounded-full text-lg font-semibold shadow min-w-[120px] text-center">
                    Fiyat: {h.price?.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
                <div className="text-gray-700 text-center mb-4 line-clamp-3 min-h-[60px] w-full text-base font-medium">
                  {h.description}
                </div>
                {h.features && (
                  <div className="mb-3 w-full flex flex-col items-center">
                    <div className="text-base font-bold text-purple-700 mb-1 flex items-center gap-2">
                      <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-pink-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.75 17L6 21m0 0l-3.75-4M6 21V3m12 18l3.75-4M18 21l-3.75-4M18 21V3' /></svg>
                      Salon Özellikleri
                    </div>
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 rounded-xl shadow p-2 text-sm text-gray-700 w-full text-center">
                      {h.features.split(",").map((f, i) => (
                        <span key={i} className="inline-block bg-purple-100 text-purple-700 px-2 py-1 m-1 rounded-full font-semibold shadow-sm">{f.trim()}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="absolute -top-10 right-0 w-32 h-32 bg-pink-100 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-all duration-300 z-0" />
                <div className="absolute -bottom-10 left-0 w-32 h-32 bg-purple-100 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-all duration-300 z-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
