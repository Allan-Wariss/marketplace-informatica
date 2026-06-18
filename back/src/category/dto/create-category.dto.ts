import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Eletrônicos', description: 'Nome da categoria' })
  @IsString({ message: 'O nome da categoria deve ser um texto' })
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório' })
  nome: string;
}