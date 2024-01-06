import { PickType } from '@nestjs/swagger';
import { CatEntity } from 'src/cats/entity/cats.entity';

export class LoginRequestDto extends PickType(CatEntity, [
  'email',
  'password',
] as const) {}
