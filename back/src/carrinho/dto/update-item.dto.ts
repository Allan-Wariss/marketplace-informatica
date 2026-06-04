import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateItemDto {
  @ApiProperty({ example: 3, description: 'Nova quantidade do item' })
  @IsInt({ message: 'quantidade deve ser um inteiro' })
  @IsPositive({ message: 'quantidade deve ser maior que zero' })
  quantidade: number;
}
