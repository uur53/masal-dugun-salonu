import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const prisma = new PrismaClient();

export async function POST(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Giriş yapmalısınız." }, { status: 401 });
  const { hallId, rating, comment } = await req.json();
  if (!hallId || !rating || !comment) {
    return NextResponse.json({ error: "Tüm alanlar zorunlu." }, { status: 400 });
  }
  const review = await prisma.review.create({
    data: {
      userId: session.id,
      hallId: Number(hallId),
      rating: Number(rating),
      comment,
    },
  });
  return NextResponse.json({ success: true, review });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const hallId = searchParams.get("hallId");
  if (!hallId) return NextResponse.json({ error: "hallId gerekli" }, { status: 400 });
  const reviews = await prisma.review.findMany({
    where: { hallId: Number(hallId) },
    include: { user: { select: { name: true, id: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ reviews });
}
