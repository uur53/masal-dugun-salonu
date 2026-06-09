const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@masal.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@masal.com",
      password: hashed,
      role: "ADMIN",
    },
  });
  console.log("Varsayilan admin: admin@masal.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
