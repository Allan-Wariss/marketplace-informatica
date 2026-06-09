import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Criar produto (vendedor_id extraído do token)' })
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    return this.productService.create(req.user.sub, createProductDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Listar produtos com paginação. filter=todos (público) | filter=meus (requer auth)' })
  @ApiQuery({ name: 'skip', required: false, type: Number, description: 'Itens a pular (padrão: 0)' })
  @ApiQuery({ name: 'take', required: false, type: Number, description: 'Itens por página (padrão: 15)' })
  @ApiQuery({ name: 'filter', required: false, enum: ['todos', 'meus'], description: 'Filtro: todos (padrão) ou meus' })
  findAll(
    @Request() req,
    @Query('skip') skip = '0',
    @Query('take') take = '15',
    @Query('filter') filter: 'todos' | 'meus' = 'todos',
  ) {
    if (filter === 'meus') {
      if (!req.user) throw new UnauthorizedException('Autenticação necessária para filtrar por seus produtos.');
      return this.productService.findAll(Number(skip), Number(take), req.user.sub);
    }
    return this.productService.findAll(Number(skip), Number(take));
  }

  @Get('search')
  @Public()
  @ApiOperation({ summary: 'Buscar produtos por título com paginação. filter=todos (público) | filter=meus (requer auth)' })
  @ApiQuery({ name: 'titulo', required: true, type: String })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, enum: ['todos', 'meus'] })
  findOne(
    @Request() req,
    @Query('titulo') titulo: string,
    @Query('skip') skip = '0',
    @Query('take') take = '15',
    @Query('filter') filter: 'todos' | 'meus' = 'todos',
  ) {
    if (filter === 'meus') {
      if (!req.user) throw new UnauthorizedException('Autenticação necessária para filtrar por seus produtos.');
      return this.productService.findOne(titulo, Number(skip), Number(take), req.user.sub);
    }
    return this.productService.findOne(titulo, Number(skip), Number(take));
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Buscar produto por ID (público)' })
  findById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar produto (somente o dono)' })
  update(@Param('id') id: string, @Request() req, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, req.user.sub, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover produto (somente o dono)' })
  remove(@Param('id') id: string, @Request() req) {
    return this.productService.remove(id, req.user.sub);
  }
}
