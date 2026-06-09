import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/session";
const prisma = new PrismaClient();

async function sendNotification(userId, message) {
  await prisma.notification.create({ data: { userId, message } });
}

export async function GET(req) {
  // Tüm rezervasyonları admin için getir
  const reservations = await prisma.reservation.findMany({
    include: {
      user: true,
      hall: true,
      event: true,
    },
    orderBy: { date: "desc" },
  });
  return Response.json(reservations);
}

export async function POST(req) {
  // Kullanıcı rezervasyon oluşturur
  const session = await getSession();
  const { hallId, date, time, phone, status } = await req.json();
  if (!session || !session.id) {
    return Response.json({ error: "Rezervasyon için giriş yapmalısınız." }, { status: 401 });
  }
  if (!hallId || !date || !time || !phone) {
    return Response.json({ error: "Eksik bilgi" }, { status: 400 });
  }
  // Aynı salona aynı gün ve saatte rezervasyon var mı kontrolü
  const exists = await prisma.reservation.findFirst({
    where: {
      hallId: Number(hallId),
      date: new Date(date),
      time,
    },
  });
  if (exists) {
    return Response.json({ error: "Bu tarih ve saatte bu salon için zaten rezervasyon var." }, { status: 409 });
  }
  const reservation = await prisma.reservation.create({
    data: {
      userId: Number(session.id),
      hallId: Number(hallId),
      date: new Date(date),
      time,
      phone,
      status: status || "beklemede",
    },
  });
  // Bildirim: Rezervasyon talebiniz alındı
  await sendNotification(session.id, `Rezervasyon talebiniz alındı. Onay bekliyor: ${date} ${time}`);
  return Response.json({ success: true, reservation });
}

export async function PATCH(req) {
  // Admin rezervasyon durumunu günceller
  const { id, status } = await req.json();
  if (!id || !status) {
    return Response.json({ error: "Eksik bilgi" }, { status: 400 });
  }
  const updated = await prisma.reservation.update({
    where: { id: Number(id) },
    data: { status },
    include: { user: true, hall: true },
  });
  // Bildirim: Onay/iptal
  if (status === "onaylandı") {
    await sendNotification(updated.userId, `Rezervasyonunuz onaylandı: ${updated.hall.name} - ${updated.date.toLocaleDateString()} ${updated.time}`);
  } else if (status === "iptal edildi") {
    await sendNotification(updated.userId, `Rezervasyonunuz iptal edildi: ${updated.hall.name} - ${updated.date.toLocaleDateString()} ${updated.time}`);
  }
  return Response.json({ success: true });
}

export async function DELETE(req) {
  // Kullanıcı veya admin rezervasyon siler
  const session = await getSession();
  let id;
  if (req.method === "DELETE") {
    try {
      const body = await req.json();
      id = Number(body.id);
    } catch {
      // fallback: url parametresinden al
      const { searchParams } = new URL(req.url);
      id = Number(searchParams.get("id"));
    }
  }
  if (!id) return Response.json({ error: "Geçersiz ID" }, { status: 400 });
  // Sadece kendi rezervasyonunu silebilsin veya admin ise silebilsin
  const reservation = await prisma.reservation.findUnique({ where: { id } });
  if (!reservation) return Response.json({ error: "Rezervasyon bulunamadı" }, { status: 404 });
  if (!session || (session.role !== "ADMIN" && reservation.userId !== session.id)) {
    return Response.json({ error: "Yetkisiz işlem" }, { status: 403 });
  }
  await prisma.reservation.delete({ where: { id } });
  return Response.json({ success: true });
}
