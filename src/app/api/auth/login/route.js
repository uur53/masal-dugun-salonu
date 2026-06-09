import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import { setSession } from "@/lib/session";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return Response.json({ error: "Tüm alanlar zorunlu." }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return Response.json({ error: "Kullanıcı bulunamadı." }, { status: 400 });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return Response.json({ error: "Şifre hatalı." }, { status: 400 });
    }
    await setSession(user);
    return Response.json({ success: true, user: { id: user.id, name: user.name, role: user.role } });
  } catch (e) {
    return Response.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
