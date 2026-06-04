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
