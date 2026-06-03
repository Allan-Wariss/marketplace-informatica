import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({ example: 'Eletrônicos', description: 'Nome da categoria' })
    nome: string;
}
