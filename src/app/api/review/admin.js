import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const prisma = new PrismaClient();

export async function DELETE(req) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 403 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id gerekli" }, { status: 400 });
  await prisma.review.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
