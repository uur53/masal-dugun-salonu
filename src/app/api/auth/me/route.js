import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Giriş yok" }, { status: 401 });
  return Response.json({ id: session.id, name: session.name, role: session.role });
}
