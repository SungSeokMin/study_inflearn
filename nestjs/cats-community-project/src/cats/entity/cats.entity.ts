import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cats')
export class CatEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  imgUrl: string;
}
