import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const halls = await prisma.hall.findMany({
    orderBy: { id: "asc" },
    include: { images: true },
  });
  return Response.json(halls);
}

export async function POST(req) {
  const { name, capacity, description, images, price } = await req.json();
  if (!name || !capacity || !description || price === undefined) {
    return Response.json({ error: "Tüm alanlar zorunlu." }, { status: 400 });
  }
  const hall = await prisma.hall.create({
    data: {
      name,
      capacity: Number(capacity),
      description,
      price: Number(price),
      images:
        images && Array.isArray(images)
          ? { create: images.filter(Boolean).map((url) => ({ url })) }
          : undefined,
    },
    include: { images: true },
  });
  return Response.json({ success: true, hall });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  if (!id) return Response.json({ error: "Geçersiz ID" }, { status: 400 });
  try {
    await prisma.hall.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (e) {
    return Response.json(
      { error: "Salon silinemedi. Önce bu salona ait rezervasyonları silmelisiniz." },
      { status: 400 }
    );
  }
}

export async function PATCH(req) {
  const { id, name, capacity, description, images, price } = await req.json();
  if (!id || !name || !capacity || !description || price === undefined) {
    return Response.json({ error: "Eksik bilgi" }, { status: 400 });
  }
  // Mevcut resimleri getir
  const existingImages = await prisma.hallImage.findMany({ where: { hallId: id } });
  const existingUrls = existingImages.map((img) => img.url);
  const newUrls = images.filter(Boolean);

  // Silinecek resimler (veritabanında olup formda olmayanlar)
  const toDelete = existingImages.filter((img) => !newUrls.includes(img.url));
  // Eklenecek resimler (formda olup veritabanında olmayanlar)
  const toAdd = newUrls.filter((url) => !existingUrls.includes(url));

  // Sadece silinmesi gerekenleri sil
  for (const img of toDelete) {
    await prisma.hallImage.delete({ where: { id: img.id } });
  }
  // Sadece eklenmesi gerekenleri ekle
  for (const url of toAdd) {
    await prisma.hallImage.create({ data: { url, hallId: id } });
  }

  await prisma.hall.update({
    where: { id },
    data: {
      name,
      capacity: Number(capacity),
      description,
      price: Number(price),
    },
  });
  return Response.json({ success: true });
}
