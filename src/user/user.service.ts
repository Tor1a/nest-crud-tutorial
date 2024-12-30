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

  // async setCurrentRefreshToken(refreshToken: string, id: number) {
  //   const currentHashedRefreshToken = await hash(refreshToken, 10);
  //   await this.userRepository.update(id, { currentHashedRefreshToken });
  // }
  //
  // async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
  //   const user = await this.userRepository.findById(id);
  //
  //   const isRefreshTokenMatching = await compare(
  //     refreshToken,
  //     user.currentHashedRefreshToken,
  //   );
  //
  //   if (isRefreshTokenMatching) {
  //     return user;
  //   }
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  async patch(id: number, patchUserDto: Partial<UpdateUserDto>) {
    return this.userRepository.patchUser(id, patchUserDto);
  }

  async remove(id: number) {
    return this.userRepository.deleteUser(id);
  }
}
