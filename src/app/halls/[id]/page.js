import { PrismaClient } from "@prisma/client";
import HallImages from "../HallImages";
import Image from "next/image";
import ReviewSection from "./ReviewSection";
import HallReservationCalendar from "./HallReservationCalendar";

const prisma = new PrismaClient();

export default async function HallDetailPage(props) {
  const params = await props.params;
  const hall = await prisma.hall.findUnique({
    where: { id: Number(params.id) },
    include: { images: true },
  });
  if (!hall) return <div>Salon bulunamadı.</div>;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-200 p-6 relative overflow-hidden">
      {/* Dekoratif arka plan */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      </div>
      <div className="bg-white/90 p-12 rounded-3xl shadow-2xl w-full max-w-3xl border border-pink-100 backdrop-blur-md animate-fade-in z-10 flex flex-col items-center">
        <HallImages images={hall.images} />
        <h2 className="text-4xl font-extrabold text-pink-700 mb-4 text-center drop-shadow-lg tracking-tight flex items-center justify-center gap-3">
          <svg xmlns='http://www.w3.org/2000/svg' className='w-10 h-10 text-purple-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' /></svg>
          {hall.name}
        </h2>
        <div className="flex flex-wrap gap-4 justify-center mb-6 w-full">
          <span className="bg-purple-100 text-purple-700 px-6 py-2 rounded-full text-lg font-semibold shadow min-w-[120px] text-center flex items-center gap-2">
            <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 text-purple-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5' /></svg>
            Kapasite: {hall.capacity}
          </span>
          <span className="bg-pink-100 text-pink-700 px-6 py-2 rounded-full text-lg font-semibold shadow min-w-[120px] text-center flex items-center gap-2">
            <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 text-pink-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 7v7m0 0h4m-4 0H8' /></svg>
            Fiyat: {hall.price?.toLocaleString("tr-TR")} ₺
          </span>
        </div>
        <div className="text-gray-700 text-center mb-8 text-lg font-medium px-2">
          {hall.description}
        </div>
        {hall.features && (
          <div className="w-full mb-8 flex flex-col items-center">
            <div className="text-xl font-bold text-purple-700 mb-2 flex items-center gap-2">
              <svg xmlns='http://www.w3.org/2000/svg' className='w-7 h-7 text-pink-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.75 17L6 21m0 0l-3.75-4M6 21V3m12 18l3.75-4M18 21l-3.75-4M18 21V3' /></svg>
              Salon Özellikleri
            </div>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 rounded-xl shadow p-4 text-base text-gray-700 w-full text-center">
              {hall.features.split(",").map((f, i) => (
                <span key={i} className="inline-block bg-purple-100 text-purple-700 px-3 py-1 m-1 rounded-full font-semibold shadow-sm">{f.trim()}</span>
              ))}
            </div>
          </div>
        )}
        {/* <HallReservationCalendar hallId={hall.id} /> */}
        <ReviewSection hallId={hall.id} />
        {/* <ReservationForm hallId={hall.id} /> */}
      </div>
    </div>
  );
}
