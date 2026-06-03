-- CreateTable
CREATE TABLE "pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comprador_id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "data_compra" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_total" DECIMAL NOT NULL,
    CONSTRAINT "pedidos_comprador_id_fkey" FOREIGN KEY ("comprador_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "produtos_vendedor_id_fkey" FOREIGN KEY ("vendedor_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produtos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("categoria_id", "descricao", "id", "preco", "titulo", "vendedor_id") SELECT "categoria_id", "descricao", "id", "preco", "titulo", "vendedor_id" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
