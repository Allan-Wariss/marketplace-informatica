import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(vendedor_id: string, createProductDto: CreateProductDto) {
    const vendedor = await this.prisma.user.findFirst({ where: { id: vendedor_id } });
    if (!vendedor) {
      throw new HttpException('Vendedor não encontrado!', HttpStatus.NOT_FOUND);
    }

    const categoria = await this.prisma.category.findFirst({ where: { id: createProductDto.categoria_id } });
    if (!categoria) {
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.product.create({
      data: {
        id: randomUUID(),
        vendedor_id,
        ...createProductDto,
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: { vendedor: { select: { id: true, name: true, email: true } }, categoria: true },
    });
  }

  async findOne(titulo: string) {
    const products = await this.prisma.product.findMany({
      where: { titulo: { contains: titulo } },
      include: { vendedor: { select: { id: true, name: true, email: true } }, categoria: true },
    });

    if (products.length === 0) {
      throw new HttpException('Nenhum produto encontrado!', HttpStatus.NOT_FOUND);
    }

    return products;
  }

  async update(id: string, vendedor_id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findFirst({ where: { id } });

    if (!product) {
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }

    if (product.vendedor_id !== vendedor_id) {
      throw new HttpException('Você não tem permissão para editar este produto!', HttpStatus.FORBIDDEN);
    }

    return await this.prisma.product.update({
      where: { id },
      data: { ...updateProductDto },
    });
  }

  async remove(id: string, vendedor_id: string) {
    const product = await this.prisma.product.findFirst({ where: { id } });

    if (!product) {
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }

    if (product.vendedor_id !== vendedor_id) {
      throw new HttpException('Você não tem permissão para remover este produto!', HttpStatus.FORBIDDEN);
    }

    await this.prisma.product.delete({ where: { id } });
    return { message: 'Produto removido com sucesso!' };
  }
}
