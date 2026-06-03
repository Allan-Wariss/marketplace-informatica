import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    return this.productService.create(req.user.sub, createProductDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.productService.findAll();
  }

  @Get('search/:titulo')
  @Public()
  findOne(@Param('titulo') titulo: string) {
    return this.productService.findOne(titulo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, req.user.sub, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.productService.remove(id, req.user.sub);
  }
}
