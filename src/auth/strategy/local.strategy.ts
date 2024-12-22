import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {
    super({
      usernameField: 'nickname',
      password: 'password',
    });
  }

  /**
   * user를 검증하기 위한 local Guard 패턴 입니다.
   *
   * @param {string} nickname - 유저의 이름
   * @param {string} password - 유저의 비밀번호
   */
  async validate(nickname: string, password: string): Promise<any> {
    const authUser = await this.authService.validateUser(nickname, password);
    if (!authUser) {
      throw new UnauthorizedException();
    }
    const payload = { nickname: authUser.nickname, sub: authUser.nickname };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
