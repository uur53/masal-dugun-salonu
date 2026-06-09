// Bu script aytaç salonuna ait tüm rezervasyonları siler.
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Tüm salonları çekip ismi 'aytaç' olanı bul
  const halls = await prisma.hall.findMany();
  const hall = halls.find(h => h.name.toLowerCase().includes('aytaç'));
  if (!hall) {
    console.log('Aytaç salonu bulunamadı.');
    return;
  }
  const deleted = await prisma.reservation.deleteMany({ where: { hallId: hall.id } });
  console.log(`Silinen rezervasyon sayısı: ${deleted.count}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
