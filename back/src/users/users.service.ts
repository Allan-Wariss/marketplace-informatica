import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashMd5 } from 'src/app/utils/hash.util';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService){

  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {email: createUserDto.email},
    })

    if (user) {
      throw new HttpException("Email já existe!", HttpStatus.BAD_REQUEST)
    }

    const { telefone, ...data } = createUserDto;
    return await this.prisma.user.create({
      data: { id: randomUUID(), ...createUserDto, password: hashMd5(createUserDto.password), telefone: createUserDto.telefone || undefined }
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
