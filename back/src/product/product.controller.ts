import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Listar todos os produtos (público)' })
  findAll() {
    return this.productService.findAll();
  }

  @Get('search/:titulo')
  @Public()
  @ApiOperation({ summary: 'Buscar produtos por título (público)' })
  findOne(@Param('titulo') titulo: string) {
    return this.productService.findOne(titulo);
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
