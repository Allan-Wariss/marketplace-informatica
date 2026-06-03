import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDto {
  @ApiProperty({ example: 3, description: 'Nova quantidade do item' })
  quantidade: number;
}
