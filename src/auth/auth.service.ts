import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { SignUpRequestBodyDto } from './dto/sign-up-request-body.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async transformPassword(user: SignUpRequestBodyDto): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }

  encryptText(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, 10);
  }

  async singUp(
    signUpRequestBodyDto: SignUpRequestBodyDto,
  ): Promise<SignUpRequestBodyDto> {
    signUpRequestBodyDto.password = await this.encryptText(
      signUpRequestBodyDto.password,
    );

    return this.authRepository.signUp(signUpRequestBodyDto);
  }
}
