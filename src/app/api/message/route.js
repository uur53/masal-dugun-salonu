import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Kullanıcının mesajları (gelen ve giden) veya admin ise tüm mesajlar
export async function GET(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Giriş gerekli" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const showAll = searchParams.get("all") === "1" && session.role === "ADMIN";
  let messages;
  if (showAll) {
    messages = await prisma.message.findMany({
      include: {
        sender: { select: { id: true, name: true } },
        receiver: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } else {
    messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: session.id },
          { receiverId: session.id }
        ]
      },
      include: {
        sender: { select: { id: true, name: true } },
        receiver: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }
  return NextResponse.json({ messages });
}

// POST: Yeni mesaj gönder
export async function POST(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Giriş gerekli" }, { status: 401 });
  const { receiverId, content } = await req.json();
  if (!receiverId || !content) return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
  await prisma.message.create({
    data: {
      senderId: session.id,
      receiverId: Number(receiverId), // String gelen receiverId'yi Int'e çevir
      content,
    }
  });
  // Mesaj gönderildikten sonra bildirim oluştur
  await prisma.notification.create({
    data: {
      userId: Number(receiverId),
      message: `Yeni bir mesajınız var!`,
      read: false,
    }
  });
  return NextResponse.json({ success: true });
}

// DELETE: Admin mesaj siler
export async function DELETE(req) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Yetkisiz işlem" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  let id = Number(searchParams.get("id"));
  if (!id) {
    try {
      const body = await req.json();
      id = Number(body.id);
    } catch {
      // url parametresinden alınamadı
    }
  }
  if (!id) return NextResponse.json({ error: "Geçersiz ID" }, { status: 400 });

  const message = await prisma.message.findUnique({ where: { id } });
  if (!message) return NextResponse.json({ error: "Mesaj bulunamadı" }, { status: 404 });

  await prisma.message.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
