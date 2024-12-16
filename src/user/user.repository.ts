import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  // constructor(
  //   @InjectRepository(UserEntity)
  //   private readonly repository: Repository<UserEntity>,
  // ) {
  //   super(repository.target, repository.manager, repository.queryRunner);
  // }
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.create(createUserDto);
    return this.save(user);
  }

  async findUserById(userId: string): Promise<UserEntity> {
    const user = await this.findOne({ where: { userId } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);
    const updatedUser = this.merge(user, updateUserDto);
    return this.save(updatedUser);
  }

  async patchUser(
    userId: string,
    patchUserDto: Partial<UpdateUserDto>,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);
    const patchedUser = Object.assign(user, patchUserDto);
    return this.save(patchedUser);
  }

  async deleteUser(userId: string): Promise<UserEntity> {
    const user = await this.findUserById(userId);
    return this.remove(user);
  }
}
