import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ChatsGateway } from './chats/chats.gateway';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true, // 프로덕션에서는 절대 true로 지정하면 안된다.
      logging: true,
    }),
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [ChatsGateway],
})
export class AppModule {}
