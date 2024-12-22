import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  // async signIn(signInRequestBodyDto: SignInRequestBodyDto): Promise<any> {
  async validateUser(nickname: string, password: string): Promise<any> {
    const authUser = await this.userService.findOne(nickname);
    if (!authUser) {
      throw new UnauthorizedException();
    }
    // const validatePassword = await bcrypt.compare(password, authUser.password);
    // if (!validatePassword) {
    //   throw new UnauthorizedException();
    // }
    const result = await bcrypt.compare(password, authUser.password);
    console.log('reuslt: ', result);

    if (result) {
      const { password, ...userWithoutPassword } = authUser;
      return userWithoutPassword;
    }
    return null;
  }

  async signIn(authUser: any) {
    const payload = { username: authUser.username, sub: authUser.username };
    console.log('console.log()', payload);
    console.log(process.env.JWT_KEY);
    return {
      access_token: this.jwtService.sign(payload, {
        secret: `${process.env.JWT_SECRET}`,
      }),
    };
  }
}
