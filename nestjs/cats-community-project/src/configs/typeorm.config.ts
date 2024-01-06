import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async () => ({
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
};
