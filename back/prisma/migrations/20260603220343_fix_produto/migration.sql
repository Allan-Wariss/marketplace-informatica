/*
  Warnings:

  - You are about to drop the column `status` on the `pedidos` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comprador_id" TEXT NOT NULL,
    "carrinho_id" TEXT NOT NULL,
    "finalizado" BOOLEAN NOT NULL DEFAULT false,
    "data_compra" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_total" DECIMAL NOT NULL,
    CONSTRAINT "pedidos_comprador_id_fkey" FOREIGN KEY ("comprador_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedidos_carrinho_id_fkey" FOREIGN KEY ("carrinho_id") REFERENCES "carrinhos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pedidos" ("carrinho_id", "comprador_id", "data_compra", "id", "valor_total") SELECT "carrinho_id", "comprador_id", "data_compra", "id", "valor_total" FROM "pedidos";
DROP TABLE "pedidos";
ALTER TABLE "new_pedidos" RENAME TO "pedidos";
CREATE UNIQUE INDEX "pedidos_carrinho_id_key" ON "pedidos"("carrinho_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
