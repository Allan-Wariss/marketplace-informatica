import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService){

  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.category.findFirst({
      where: {nome: createCategoryDto.nome}
    })

    if (category) {
      throw new HttpException("Categoria já existe!", HttpStatus.BAD_REQUEST)
    }

    return await this.prisma.category.create({
      data: {...createCategoryDto}
    })
  }

  async findAll() {
    return this.prisma.category.findMany({ orderBy: { nome: 'asc' } });
  }

  async findOne(nome: string) {
    const categories = await this.prisma.category.findMany({
      where: { nome: { contains: nome } },
    });

    if (categories.length === 0) {
      throw new HttpException('Nenhuma categoria encontrada!', HttpStatus.NOT_FOUND);
    }

    return categories;
  }

  async getVendasPorCategoria() {
  const categorias = await this.prisma.category.findMany({
    select: {
      id: true,
      nome: true,
    },
  });

  const itensVendidos = await this.prisma.carrinhoItem.findMany({
    where: {
      carrinho: {
        pedido: {
          is: {
            finalizado: true,
          },
        },
      },
    },
    select: {
      quantidade: true,
      produto: {
        select: {
          categoria_id: true,
        },
      },
    },
  });

  const vendasPorCategoria = new Map<
    string,
    { id: string; nome: string; totais_vendas: number }
  >();

  for (const categoria of categorias) {
    vendasPorCategoria.set(categoria.id, {
      id: categoria.id,
      nome: categoria.nome,
      totais_vendas: 0,
    });
  }

  for (const item of itensVendidos) {
    const categoriaId = item.produto.categoria_id;
    const categoria = vendasPorCategoria.get(categoriaId);

    if (categoria) {
      categoria.totais_vendas += item.quantidade;
    }
  }

  return Array.from(vendasPorCategoria.values()).sort(
    (a, b) => b.totais_vendas - a.totais_vendas,
  );
}


  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findFirst({ where: { id } });

    if (!category) {
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.category.update({
      where: { id },
      data: { ...updateCategoryDto },
    });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findFirst({ where: { id } });

    if (!category) {
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
    }

    await this.prisma.category.delete({ where: { id } });
    return { message: 'Categoria removida com sucesso!' };
  }
}
