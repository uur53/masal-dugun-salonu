import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/session";

const prisma = new PrismaClient();

export async function DELETE(req) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return Response.json({ error: "Yetkisiz işlem" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  if (!id) return Response.json({ error: "Geçersiz ID" }, { status: 400 });
  if (session.id === id) {
    return Response.json({ error: "Kendi hesabınızı silemezsiniz." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return Response.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });

  try {
    await prisma.$transaction([
      prisma.message.deleteMany({
        where: { OR: [{ senderId: id }, { receiverId: id }] },
      }),
      prisma.notification.deleteMany({ where: { userId: id } }),
      prisma.review.deleteMany({ where: { userId: id } }),
      prisma.reservation.deleteMany({ where: { userId: id } }),
      prisma.user.delete({ where: { id } }),
    ]);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Kullanıcı silinemedi." }, { status: 400 });
  }
}

export async function PATCH(req) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return Response.json({ error: "Yetkisiz işlem" }, { status: 403 });
  }

  const { id, role } = await req.json();
  if (!id || !role) return Response.json({ error: "Eksik bilgi" }, { status: 400 });
  if (session.id === id && role !== "ADMIN") {
    return Response.json({ error: "Kendi yönetici yetkinizi kaldıramazsınız." }, { status: 400 });
  }

  await prisma.user.update({ where: { id }, data: { role } });
  return Response.json({ success: true });
}
