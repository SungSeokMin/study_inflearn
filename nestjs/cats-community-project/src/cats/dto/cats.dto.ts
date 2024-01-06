import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CatEntity } from '../entity/cats.entity';

export class CatDto extends CatEntity {
  @ApiProperty({
    description: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
