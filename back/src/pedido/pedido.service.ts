import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class PedidoService {
  constructor(private readonly prisma: PrismaService) {}

  async criarPedido(usuario_id: string) {
    const carrinho = await this.prisma.carrinho.findFirst({
      where: { usuario_id },
      include: { itens: { include: { produto: true } } },
    });

    if (!carrinho) {
      throw new HttpException('Carrinho não encontrado!', HttpStatus.NOT_FOUND);
    }

    if (carrinho.itens.length === 0) {
      throw new HttpException('Carrinho está vazio!', HttpStatus.BAD_REQUEST);
    }

    const pedidoExistente = await this.prisma.pedido.findFirst({
      where: { carrinho_id: carrinho.id },
    });

    if (pedidoExistente) {
      throw new HttpException('Este carrinho já foi finalizado em um pedido!', HttpStatus.BAD_REQUEST);
    }

    const indisponiveis = carrinho.itens.filter((item) => !item.produto.disponivel);
    if (indisponiveis.length > 0) {
      const nomes = indisponiveis.map((i) => i.produto.titulo).join(', ');
      throw new HttpException(
        `Os seguintes produtos não estão mais disponíveis: ${nomes}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const pedido = await this.prisma.pedido.create({
      data: {
        id: randomUUID(),
        comprador_id: usuario_id,
        carrinho_id: carrinho.id,
        valor_total: carrinho.valor_total,
        finalizado: true,
      },
    });

    await Promise.all(
      carrinho.itens.map((item) =>
        this.prisma.product.update({
          where: { id: item.produto_id },
          data: { disponivel: false },
        }),
      ),
    );

    return this.prisma.pedido.findFirst({
      where: { id: pedido.id },
      include: {
        comprador: { select: { id: true, name: true, email: true } },
        carrinho: {
          include: {
            itens: {
              include: {
                produto: { select: { id: true, titulo: true, preco: true } },
              },
            },
          },
        },
      },
    });
  }

  async getMeusPedidos(usuario_id: string) {
    return this.prisma.pedido.findMany({
      where: { comprador_id: usuario_id },
      include: {
        carrinho: {
          include: {
            itens: {
              include: {
                produto: { select: { id: true, titulo: true, preco: true } },
              },
            },
          },
        },
      },
      orderBy: { data_compra: 'desc' },
    });
  }

  async getPedido(id: string, usuario_id: string) {
    const pedido = await this.prisma.pedido.findFirst({
      where: { id },
      include: {
        comprador: { select: { id: true, name: true, email: true } },
        carrinho: {
          include: {
            itens: {
              include: {
                produto: { select: { id: true, titulo: true, preco: true, disponivel: true } },
              },
            },
          },
        },
      },
    });

    if (!pedido) {
      throw new HttpException('Pedido não encontrado!', HttpStatus.NOT_FOUND);
    }

    if (pedido.comprador_id !== usuario_id) {
      throw new HttpException('Sem permissão para visualizar este pedido!', HttpStatus.FORBIDDEN);
    }

    return pedido;
  }
}
