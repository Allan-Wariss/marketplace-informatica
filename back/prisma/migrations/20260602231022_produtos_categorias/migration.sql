/*
  Warnings:

  - Added the required column `categoria_id` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produtos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vendedor_id" TEXT NOT NULL,
    "categoria_id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    CONSTRAINT "produtos_vendedor_id_fkey" FOREIGN KEY ("vendedor_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produtos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("id", "vendedor_id") SELECT "id", "vendedor_id" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
