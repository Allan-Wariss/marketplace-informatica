import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'uuid-da-categoria', description: 'ID da categoria do produto' })
    categoria_id: string;

    @ApiProperty({ example: 'Notebook Dell Inspiron', description: 'Título do produto' })
    titulo: string;

    @ApiProperty({ example: 'Notebook com processador i7, 16GB RAM', description: 'Descrição do produto' })
    descricao: string;

    @ApiProperty({ example: 3500.00, description: 'Preço do produto' })
    preco: number;

    @ApiProperty({ example: 'data:image/png;base64,iVBORw0K...', description: 'Imagem do produto em Base64 (opcional)', required: false })
    imagem?: string;
}
