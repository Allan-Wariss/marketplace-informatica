import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PrisModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrisModule],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
