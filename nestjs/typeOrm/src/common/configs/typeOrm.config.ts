import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { BlogEntity } from 'src/blogs/blogs.entity'
import { ProfileEntity } from 'src/profiles/profiles.entity'
import { TagEntity } from 'src/tags/tags.entity'
import { UserEntity } from 'src/users/users.entity'
import { VisitorEntity } from 'src/visitors/visitors.entity'

import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'postgres',
    host: configService.get('DB_HOST'), // process.env.DB_HOST
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [UserEntity, ProfileEntity, BlogEntity, VisitorEntity, TagEntity],
    synchronize: true, //! set 'false' in production
    autoLoadEntities: true,
    logging: true,
    keepConnectionAlive: true,
  }),
  inject: [ConfigService],
}
