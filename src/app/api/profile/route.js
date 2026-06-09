import { getSession, setSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PATCH(req) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Giriş gerekli" }, { status: 401 });
  const { name, email, password } = await req.json();
  if (!name || !email) return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
  const prisma = new PrismaClient();
  try {
    let data = { name, email };
    if (password && password.length > 0) {
      const hashed = await bcrypt.hash(password, 10);
      data.password = hashed;
    }
    const updatedUser = await prisma.user.update({
      where: { id: session.id },
      data,
    });
    await setSession(updatedUser); // Session'ı güncelle
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Güncelleme hatası" }, { status: 500 });
  }
}
