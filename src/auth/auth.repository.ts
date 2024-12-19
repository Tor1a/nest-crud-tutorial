import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { SignUpRequestBodyDto } from './dto/sign-up-request-body.dto';

@Injectable()
export class AuthRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async signUp(userDTO: SignUpRequestBodyDto): Promise<UserEntity> {
    const user = this.create(userDTO);
    return this.save(user);
  }
}
