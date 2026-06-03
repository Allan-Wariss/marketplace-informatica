-- CreateTable
CREATE TABLE "carrinhos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuario_id" TEXT NOT NULL,
    CONSTRAINT "carrinhos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "carrinho_itens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "carrinho_id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "carrinho_itens_carrinho_id_fkey" FOREIGN KEY ("carrinho_id") REFERENCES "carrinhos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "carrinho_itens_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "carrinhos_usuario_id_key" ON "carrinhos"("usuario_id");
