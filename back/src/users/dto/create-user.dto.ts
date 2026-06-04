import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário' })
    @IsString({ message: 'name deve ser uma string' })
    @IsNotEmpty({ message: 'name é obrigatório' })
    name: string;

    @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário' })
    @IsEmail({}, { message: 'email inválido' })
    @IsNotEmpty({ message: 'email é obrigatório' })
    email: string;

    @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
    @IsString({ message: 'password deve ser uma string' })
    @MinLength(6, { message: 'password deve ter pelo menos 6 caracteres' })
    @IsNotEmpty({ message: 'password é obrigatório' })
    password: string;

    @ApiPropertyOptional({ example: '11999999999', description: 'Telefone do usuário (opcional)' })
    @IsString({ message: 'telefone deve ser uma string' })
    @IsOptional()
    telefone?: string;
}
