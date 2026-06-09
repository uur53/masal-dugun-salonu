const { execSync } = require("child_process");

const port = process.env.PORT || "3000";

try {
  console.log("Veritabani migration calistiriliyor...");
  execSync("npx prisma migrate deploy", { stdio: "inherit" });
} catch (error) {
  console.error("Migration hatasi:", error.message);
  process.exit(1);
}

try {
  console.log("Seed calistiriliyor...");
  execSync("node prisma/seed.js", { stdio: "inherit" });
} catch (error) {
  console.warn("Seed atlandi:", error.message);
}

console.log(`Next.js baslatiliyor: 0.0.0.0:${port}`);
execSync(`npx next start -H 0.0.0.0 -p ${port}`, { stdio: "inherit" });
