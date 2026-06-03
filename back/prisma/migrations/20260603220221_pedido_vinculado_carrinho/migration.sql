/*
  Warnings:

  - Added the required column `carrinho_id` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_carrinhos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuario_id" TEXT NOT NULL,
    "valor_total" DECIMAL NOT NULL DEFAULT 0,
    CONSTRAINT "carrinhos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_carrinhos" ("id", "usuario_id") SELECT "id", "usuario_id" FROM "carrinhos";
DROP TABLE "carrinhos";
ALTER TABLE "new_carrinhos" RENAME TO "carrinhos";
CREATE UNIQUE INDEX "carrinhos_usuario_id_key" ON "carrinhos"("usuario_id");
CREATE TABLE "new_pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comprador_id" TEXT NOT NULL,
    "carrinho_id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "data_compra" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_total" DECIMAL NOT NULL,
    CONSTRAINT "pedidos_comprador_id_fkey" FOREIGN KEY ("comprador_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedidos_carrinho_id_fkey" FOREIGN KEY ("carrinho_id") REFERENCES "carrinhos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pedidos" ("comprador_id", "data_compra", "id", "status", "valor_total") SELECT "comprador_id", "data_compra", "id", "status", "valor_total" FROM "pedidos";
DROP TABLE "pedidos";
ALTER TABLE "new_pedidos" RENAME TO "pedidos";
CREATE UNIQUE INDEX "pedidos_carrinho_id_key" ON "pedidos"("carrinho_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
