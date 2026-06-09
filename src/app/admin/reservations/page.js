import ReservationTable from "./ReservationTable";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    include: { user: true, hall: true }, // phone alanı Reservation modelinde mevcut
    orderBy: { date: "desc" },
  });
  return (
    <div className="p-8 max-w-4xl mx-auto rounded-3xl shadow-2xl bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <h2 className="text-3xl font-bold mb-6 text-pink-700">Rezervasyonlar</h2>
      <ReservationTable reservations={reservations} />
    </div>
  );
}
