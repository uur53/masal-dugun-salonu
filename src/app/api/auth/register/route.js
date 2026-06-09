import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return Response.json({ error: "Tüm alanlar zorunlu." }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return Response.json({ error: "Bu e-posta ile kayıtlı kullanıcı var." }, { status: 400 });
    }
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: "USER",
      },
    });
    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
