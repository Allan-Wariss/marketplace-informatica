import { Controller, Get, Post, Param, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PedidoService } from './pedido.service';

@ApiTags('Pedido')
@ApiBearerAuth()
@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  @ApiOperation({ summary: 'Finalizar compra — cria pedido a partir do carrinho e marca produtos como indisponíveis' })
  criarPedido(@Request() req) {
    return this.pedidoService.criarPedido(req.user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Listar meus pedidos' })
  getMeusPedidos(@Request() req) {
    return this.pedidoService.getMeusPedidos(req.user.sub);
  }

  @Get('historico')
  @ApiOperation({ summary: 'Histórico de compras do usuário — todos os pedidos finalizados com dados completos dos produtos' })
  getHistorico(@Request() req) {
    return this.pedidoService.getHistorico(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalhes de um pedido pelo ID' })
  getPedido(@Param('id') id: string, @Request() req) {
    return this.pedidoService.getPedido(id, req.user.sub);
  }
}
