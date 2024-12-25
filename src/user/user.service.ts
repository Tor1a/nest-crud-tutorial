import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // onModuleInit() {
  //   console.log('test');
  // }

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(nickname: string) {
    return this.userRepository.findOneBy({ nickname: nickname });
  }

  async update(nickname: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(nickname, updateUserDto);
  }

  async patch(nickname: string, patchUserDto: Partial<UpdateUserDto>) {
    return this.userRepository.patchUser(nickname, patchUserDto);
  }

  async remove(nickname: string) {
    return this.userRepository.deleteUser(nickname);
  }
}
