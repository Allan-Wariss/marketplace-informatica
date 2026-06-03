import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrisModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrisModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports:[CategoryService],
})
export class CategoryModule {}
