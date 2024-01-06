import { PickType } from '@nestjs/swagger';
import { CatDto } from 'src/cats/dto/cats.dto';

export class LoginResponseDto extends PickType(CatDto, [
  'id',
  'email',
  'name',
  'imgUrl',
] as const) {}
