import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './entity/cats.entity';
import { CatsRepository } from './cats.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
