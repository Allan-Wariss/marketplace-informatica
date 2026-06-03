import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddItemDto {
  @ApiProperty({ example: 'uuid-do-produto', description: 'ID do produto a adicionar' })
  produto_id: string;

  @ApiPropertyOptional({ example: 1, description: 'Quantidade desejada (padrão: 1)' })
  quantidade?: number;
}
