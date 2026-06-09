import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import MessageBox from "../../profile/MessageBox";

export default async function AdminMessagesPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/auth/login");

  const prisma = new PrismaClient();
  // Tüm kullanıcıları çek, sadece id ve name yeterli
  const users = await prisma.user.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-200 p-6">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Tüm Kullanıcı Mesajları</h1>
        <MessageBox users={users} currentUserId={session.id} isAdmin={true} />
      </div>
    </div>
  );
}
