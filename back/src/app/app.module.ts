import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { ProductModule } from 'src/product/product.module';
import { CarrinhoModule } from 'src/carrinho/carrinho.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: (config: ConfigService) => ({
        stores: [
          new KeyvRedis(
            `redis://${config.get<string>('REDIS_HOST', 'localhost')}:${config.get<number>('REDIS_PORT', 6379)}`,
          ),
        ],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    CarrinhoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
