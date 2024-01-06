import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatEntity } from './entity/cats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsRepository {
  constructor(
    @InjectRepository(CatEntity) private entity: Repository<CatEntity>,
  ) {}

  async existByEmail(email: string): Promise<boolean> {
    return await this.entity.exist({ where: { email } });
  }

  async createCat(email: string, name: string, password: string) {
    const cat = this.entity.create({ email, name, password });

    await this.entity.save(cat);
  }

  async findCatByEmail(email: string): Promise<CatEntity | null> {
    return await this.entity.findOneBy({ email });
  }

  findCatByIdWithoutPassword(id: string) {
    return this.entity
      .createQueryBuilder('c')
      .select(['c.id', 'c.email', 'c.name', 'c.imgUrl'])
      .where('c.id = :id', { id })
      .getOne();
  }
}
