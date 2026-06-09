// salonlara özellikler ekler.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.hall.updateMany({
    data: { features: "Klima, Otopark, Ses Sistemi, Sahne, Işıklandırma" },
    where: { features: null },
  });
  
  // await prisma.hall.update({ where: { id: 2 }, data: { features: "Bahçe, Teras, DJ" } });
  console.log("Salon özellikleri eklendi.");
}

main().finally(() => prisma.$disconnect());
