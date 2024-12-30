import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create(createUserDto);
    return this.save(user);
  }

  async findById(id: number): Promise<User> {
    const user = await this.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    const updatedUser = this.merge(user, updateUserDto);
    return this.save(updatedUser);
  }

  async patchUser(
    id: number,
    patchUserDto: Partial<UpdateUserDto>,
  ): Promise<User> {
    const user = await this.findById(id);
    const patchedUser = Object.assign(user, patchUserDto);
    return this.save(patchedUser);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.findById(id);
    return this.remove(user);
  }
}
