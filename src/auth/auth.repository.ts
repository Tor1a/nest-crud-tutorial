import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { SignUpRequestBodyDto } from './dto/sign-up-request-body.dto';

@Injectable()
export class AuthRepository extends Repository<User> {
  async;

  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(userDTO: SignUpRequestBodyDto): Promise<User> {
    const user = this.create(userDTO);
    return this.save(user);
  }
}
