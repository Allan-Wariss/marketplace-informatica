import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'uuid-da-categoria', description: 'ID da categoria do produto' })
    @IsUUID('4', { message: 'categoria_id deve ser um UUID válido' })
    @IsNotEmpty({ message: 'categoria_id é obrigatório' })
    categoria_id: string;

    @ApiProperty({ example: 'Notebook Dell Inspiron', description: 'Título do produto' })
    @IsString({ message: 'titulo deve ser uma string' })
    @MinLength(3, { message: 'titulo deve ter pelo menos 3 caracteres' })
    @IsNotEmpty({ message: 'titulo é obrigatório' })
    titulo: string;

    @ApiProperty({ example: 'Notebook com processador i7, 16GB RAM', description: 'Descrição do produto' })
    @IsString({ message: 'descricao deve ser uma string' })
    @MinLength(10, { message: 'descricao deve ter pelo menos 10 caracteres' })
    @IsNotEmpty({ message: 'descricao é obrigatória' })
    descricao: string;

    @ApiProperty({ example: 3500.00, description: 'Preço do produto' })
    @IsNumber({}, { message: 'preco deve ser um número' })
    @IsPositive({ message: 'preco deve ser maior que zero' })
    preco: number;

    @ApiProperty({ example: 'data:image/png;base64,iVBORw0K...', description: 'Imagem do produto em Base64 (opcional)', required: false })
    @IsString({ message: 'imagem deve ser uma string' })
    @IsOptional()
    imagem?: string;
}
