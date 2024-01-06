import { validationSchema } from './common/configs/validationSchema'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { UsersModule } from './users/users.module'
import { BlogsModule } from './blogs/blogs.module'
import { TagsModule } from './tags/tags.module'
import { ProfilesModule } from './profiles/profiles.module'
import { VisitorsModule } from './visitors/visitors.module'
import { typeOrmModuleOptions } from './common/configs/typeOrm.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UsersModule,
    BlogsModule,
    TagsModule,
    VisitorsModule,
    ProfilesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
