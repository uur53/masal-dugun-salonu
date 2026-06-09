import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import MessageBox from "../MessageBox";

export default async function MessagesPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const prisma = new PrismaClient();
  // Tüm kullanıcılar sadece id ve name yeterli
  const users = await prisma.user.findMany({
    select: { id: true, name: true },
    where: { id: { not: session.id } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-200 p-6">
      <div className="w-full max-w-2xl mx-auto">
        <MessageBox users={users} currentUserId={session.id} />
      </div>
    </div>
  );
}
