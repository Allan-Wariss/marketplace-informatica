import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CarrinhoService {
  constructor(private readonly prisma: PrismaService) {}

  private async recalcularTotal(carrinho_id: string): Promise<void> {
    const itens = await this.prisma.carrinhoItem.findMany({
      where: { carrinho_id },
      include: { produto: true },
    });

    const total = itens.reduce((acc, item) => {
      return acc + Number(item.produto.preco) * item.quantidade;
    }, 0);

    await this.prisma.carrinho.update({
      where: { id: carrinho_id },
      data: { valor_total: total },
    });
  }

  private async obterOuCriarCarrinho(usuario_id: string) {
    let carrinho = await this.prisma.carrinho.findFirst({
      where: { usuario_id, pedido: { is: null } },
    });

    if (!carrinho) {
      carrinho = await this.prisma.carrinho.create({
        data: { id: randomUUID(), usuario_id, valor_total: 0 },
      });
    }

    return carrinho;
  }

  async getCarrinho(usuario_id: string) {
    const carrinho = await this.prisma.carrinho.findFirst({
      where: { usuario_id, pedido: { is: null } },
      include: {
        itens: {
          include: {
            produto: { select: { id: true, titulo: true, preco: true, disponivel: true } },
          },
        },
      },
    });

    if (!carrinho) {
      return { mensagem: 'Carrinho vazio', itens: [], valor_total: 0 };
    }

    return carrinho;
  }

  async addItem(usuario_id: string, addItemDto: AddItemDto) {
    const produto = await this.prisma.product.findFirst({ where: { id: addItemDto.produto_id } });

    if (!produto) {
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }

    if (!produto.disponivel) {
      throw new HttpException('Produto indisponível!', HttpStatus.BAD_REQUEST);
    }

    if (produto.vendedor_id === usuario_id) {
      throw new HttpException('Você não pode comprar o seu próprio produto!', HttpStatus.FORBIDDEN);
    }

    const carrinho = await this.obterOuCriarCarrinho(usuario_id);

    const itemExistente = await this.prisma.carrinhoItem.findFirst({
      where: { carrinho_id: carrinho.id, produto_id: addItemDto.produto_id },
    });

    if (itemExistente) {
      // Produto único — cada anúncio representa uma unidade; não incrementa
      throw new HttpException('Este produto já está no seu carrinho!', HttpStatus.BAD_REQUEST);
    } else {
      await this.prisma.carrinhoItem.create({
        data: {
          id: randomUUID(),
          carrinho_id: carrinho.id,
          produto_id: addItemDto.produto_id,
          quantidade: addItemDto.quantidade ?? 1,
        },
      });
    }

    await this.recalcularTotal(carrinho.id);
    return this.getCarrinho(usuario_id);
  }

  async updateItem(usuario_id: string, itemId: string, updateItemDto: UpdateItemDto) {
    const item = await this.prisma.carrinhoItem.findFirst({ where: { id: itemId } });

    if (!item) {
      throw new HttpException('Item não encontrado no carrinho!', HttpStatus.NOT_FOUND);
    }

    const carrinho = await this.prisma.carrinho.findFirst({ where: { id: item.carrinho_id } });

    if (!carrinho || carrinho.usuario_id !== usuario_id) {
      throw new HttpException('Sem permissão para alterar este item!', HttpStatus.FORBIDDEN);
    }

    if (updateItemDto.quantidade <= 0) {
      throw new HttpException('Quantidade deve ser maior que zero!', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.carrinhoItem.update({
      where: { id: itemId },
      data: { quantidade: updateItemDto.quantidade },
    });

    await this.recalcularTotal(carrinho.id);
    return this.getCarrinho(usuario_id);
  }

  async removeItem(usuario_id: string, itemId: string) {
    const item = await this.prisma.carrinhoItem.findFirst({ where: { id: itemId } });

    if (!item) {
      throw new HttpException('Item não encontrado no carrinho!', HttpStatus.NOT_FOUND);
    }

    const carrinho = await this.prisma.carrinho.findFirst({ where: { id: item.carrinho_id } });

    if (!carrinho || carrinho.usuario_id !== usuario_id) {
      throw new HttpException('Sem permissão para remover este item!', HttpStatus.FORBIDDEN);
    }

    await this.prisma.carrinhoItem.delete({ where: { id: itemId } });
    await this.recalcularTotal(carrinho.id);
    return this.getCarrinho(usuario_id);
  }

  async limparCarrinho(usuario_id: string) {
    const carrinho = await this.prisma.carrinho.findFirst({
      where: { usuario_id, pedido: { is: null } },
    });

    if (!carrinho) {
      return { message: 'Carrinho já estava vazio.' };
    }

    await this.prisma.carrinhoItem.deleteMany({ where: { carrinho_id: carrinho.id } });
    await this.prisma.carrinho.update({
      where: { id: carrinho.id },
      data: { valor_total: 0 },
    });

    return { message: 'Carrinho limpo com sucesso!' };
  }
}
