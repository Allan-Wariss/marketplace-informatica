import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class AddItemDto {
  @ApiProperty({ example: 'uuid-do-produto', description: 'ID do produto a adicionar' })
  @IsUUID('4', { message: 'produto_id deve ser um UUID válido' })
  produto_id: string;

  @ApiPropertyOptional({ example: 1, description: 'Quantidade desejada (padrão: 1)' })
  @IsInt({ message: 'quantidade deve ser um inteiro' })
  @IsPositive({ message: 'quantidade deve ser maior que zero' })
  @IsOptional()
  quantidade?: number;
}
