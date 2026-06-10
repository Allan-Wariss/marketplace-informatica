import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Criar usuário (público)' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Retorna os dados do usuário autenticado' })
  getMe(@Request() req) {
    return this.usersService.findMe(req.user.sub);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Atualiza nome, email e telefone do usuário autenticado' })
  updateMe(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.updateMe(req.user.sub, updateProfileDto);
  }

  @Delete('me')
  @ApiOperation({ summary: 'Deleta a conta do usuário autenticado' })
  deleteMe(@Request() req) {
    return this.usersService.deleteMe(req.user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar usuário' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover usuário' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
