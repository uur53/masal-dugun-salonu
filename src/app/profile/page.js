import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const prisma = new PrismaClient();
  const reservations = await prisma.reservation.findMany({
    where: { userId: session.id },
    include: { hall: true },
    orderBy: { date: "desc" },
  });

  return <ProfileClient session={session} reservations={reservations} />;
}
