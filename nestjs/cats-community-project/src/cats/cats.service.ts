import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatDto } from './dto/cats.dto';

import * as bycrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private repository: CatsRepository) {}

  async signUp(catDto: CatDto) {
    const { email, name, password } = catDto;

    const isEmail = this.repository.existByEmail(email);
    if (isEmail) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bycrypt.hash(password, 10);
    this.repository.createCat(email, name, hashedPassword);
  }
}
