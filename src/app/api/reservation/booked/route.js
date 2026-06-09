import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const hallId = Number(searchParams.get("hallId"));
  const date = searchParams.get("date");
  if (!hallId) return Response.json([]);
  let where = { hallId };
  if (date) where.date = new Date(date);
  // Tüm statüler gelsin, sadece status, time ve date dön
  const reservations = await prisma.reservation.findMany({
    where,
    select: { time: true, date: true, status: true },
  });
  return Response.json(reservations);
}
