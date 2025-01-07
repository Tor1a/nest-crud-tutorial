import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { SignUpRequestBodyDto } from './dto/sign-up-request-body.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entity/user.entity';
import { RedisService } from '../redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
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

  async validateUser(nickname: string, password: string): Promise<User> {
    const authUser = await this.userService.findOne(nickname);
    if (!authUser) {
      throw new UnauthorizedException();
    }
    await this.verifyPassword(password, authUser.password);

    return authUser;
  }

  // async onModuleInit() {
  //   const authUser = await this.userService.findOne('kmj');
  //
  //   const { access_token: accessToken } =
  //     await this.generateAccessToken(authUser);
  //
  //   console.log('accessToken', accessToken);
  //
  //   const payload = this.jwtService.verify(accessToken, {
  //     secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  //   });
  //
  //   console.log('payload', payload);
  //
  //   const user = await this.userService.findOne(payload['username']);
  //   console.log('user', user);
  // }

  async generateAccessToken(authUser: any) {
    const payload = { nickname: authUser.nickname, sub: authUser.email };

    const accessToken = this.jwtService.sign(payload, {
      secret: `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
      expiresIn: '1h',
    });

    return {
      access_token: accessToken,
    };
  }

  async generateRefreshToken(authUser) {
    const payload = {
      userId: authUser.id,
      nickname: authUser.nickname,
      sub: authUser.email,
    };

    const refreshToken = this.jwtService.sign(payload, {
      secret: `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
      expiresIn: '7d',
    });
    return refreshToken;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
