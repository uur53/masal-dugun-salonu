-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hall" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Hall" ("capacity", "description", "id", "name") SELECT "capacity", "description", "id", "name" FROM "Hall";
DROP TABLE "Hall";
ALTER TABLE "new_Hall" RENAME TO "Hall";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
