import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário' })
    name: string;

    @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário' })
    email: string;

    @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
    password: string;

    @ApiPropertyOptional({ example: '11999999999', description: 'Telefone do usuário (opcional)' })
    telefone?: string;
}
