import { Controller, Get, Post, Patch, Delete, Body, Param, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CarrinhoService } from './carrinho.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('Carrinho')
@ApiBearerAuth()
@Controller('carrinho')
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}

  @Get()
  @ApiOperation({ summary: 'Ver carrinho do usuário logado com itens e valor total' })
  getCarrinho(@Request() req) {
    return this.carrinhoService.getCarrinho(req.user.sub);
  }

  @Post('itens')
  @ApiOperation({ summary: 'Adicionar produto ao carrinho (cria o carrinho automaticamente se necessário)' })
  addItem(@Request() req, @Body() addItemDto: AddItemDto) {
    return this.carrinhoService.addItem(req.user.sub, addItemDto);
  }

  @Patch('itens/:itemId')
  @ApiOperation({ summary: 'Alterar quantidade de um item do carrinho' })
  updateItem(
    @Request() req,
    @Param('itemId') itemId: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.carrinhoService.updateItem(req.user.sub, itemId, updateItemDto);
  }

  @Delete('itens/:itemId')
  @ApiOperation({ summary: 'Remover um item do carrinho' })
  removeItem(@Request() req, @Param('itemId') itemId: string) {
    return this.carrinhoService.removeItem(req.user.sub, itemId);
  }

  @Delete()
  @ApiOperation({ summary: 'Limpar todos os itens do carrinho' })
  limparCarrinho(@Request() req) {
    return this.carrinhoService.limparCarrinho(req.user.sub);
  }
}
