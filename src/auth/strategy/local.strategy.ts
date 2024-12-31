import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entity/user.entity';

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
  async validate(nickname: string, password: string): Promise<User> {
    return this.authService.validateUser(nickname, password);
  }
}
