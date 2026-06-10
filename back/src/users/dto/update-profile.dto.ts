import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
    @ApiPropertyOptional({ example: 'João Silva', description: 'Nome completo' })
    @IsString({ message: 'name deve ser uma string' })
    @IsNotEmpty({ message: 'name não pode ser vazio' })
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ example: 'joao@email.com', description: 'E-mail' })
    @IsEmail({}, { message: 'email inválido' })
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ example: '11999999999', description: 'Telefone (opcional)' })
    @IsString({ message: 'telefone deve ser uma string' })
    @IsOptional()
    telefone?: string;
}
