import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { hashMd5 } from 'src/app/utils/hash.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async signIn(loginDto: LoginDto): Promise<{ access_token: string; user: { name: string; email: string; telefone: string | null } }> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || user.password !== hashMd5(loginDto.password)) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    await this.cacheManager.set(`jwt:${user.id}`, access_token, 3600000);
    return {
      access_token,
      user: { name: user.name, email: user.email, telefone: user.telefone ?? null },
    };
  }

  async signOut(userId: string): Promise<{ message: string }> {
    await this.cacheManager.del(`jwt:${userId}`);
    return { message: 'Logout realizado com sucesso' };
  }
}
