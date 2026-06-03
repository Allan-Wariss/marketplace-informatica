import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário' })
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
  password: string;
}
