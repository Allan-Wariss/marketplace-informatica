import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { publicDecrypt } from 'node:crypto';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Criar categoria' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Listar todas as categorias (público)' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('relatorio/vendas-por-categoria')
  @Public()
  @ApiOperation({
    summary: 'Obter relatório de vendas por categoria (público)',
  })
  getVendasPorCategoria() {
    return this.categoryService.getVendasPorCategoria();
  }


  @Get('search/:nome')
  @Public()
  @ApiOperation({ summary: 'Buscar categorias por nome (público)' })
  findOne(@Param('nome') nome: string) {
    return this.categoryService.findOne(nome);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar categoria por ID' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover categoria por ID' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
