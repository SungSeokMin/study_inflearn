import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { CatsModule } from './cats/cats.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './\bconfigs/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    CatsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
