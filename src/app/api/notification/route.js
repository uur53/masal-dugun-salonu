import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Kullanıcının bildirimlerini getir
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Giriş gerekli" }, { status: 401 });
  const notifications = await prisma.notification.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: "desc" },
    take: 30,
  });
  return NextResponse.json({ notifications });
}

// PATCH: Bildirimi okundu olarak işaretle
export async function PATCH(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Giriş gerekli" }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
  await prisma.notification.update({ where: { id }, data: { read: true } });
  return NextResponse.json({ success: true });
}

// POST: Bildirim ekle (admin veya sistem için)
export async function POST(req) {
  const { userId, message } = await req.json();
  if (!userId || !message) return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
  await prisma.notification.create({ data: { userId, message } });
  return NextResponse.json({ success: true });
}
