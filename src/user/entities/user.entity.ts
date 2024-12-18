import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usertest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nickname: string;

  @Column()
  password: string;
}
