import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const hallId = searchParams.get("hallId");
  if (!hallId) return NextResponse.json({ error: "hallId gerekli" }, { status: 400 });
  // Son 1 yılın rezervasyonlarını getir
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  const reservations = await prisma.reservation.findMany({
    where: {
      hallId: Number(hallId),
      date: { gte: oneYearAgo },
    },
    select: {
      id: true,
      date: true,
      time: true,
      status: true,
      user: { select: { name: true } },
    },
    orderBy: { date: "asc" },
  });
  return NextResponse.json({ reservations });
}
