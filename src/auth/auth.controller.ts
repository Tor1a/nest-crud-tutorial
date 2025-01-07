import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpRequestBodyDto } from './dto/sign-up-request-body.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import RequestWithUserInterface from './interface/request-with-user.interface';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { JwtRefreshAuthGuard } from './guard/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  @Post('/sign-up')
  async singUp(@Body() userDTO: SignUpRequestBodyDto) {
    try {
      await this.authService.singUp(userDTO);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * sign-in을 위한 api 입니다.
   *
   * @param {Request} req - 요청 객체
   * @param {string} nickname - 유저의 이름
   * @param {string} password - 유저의 비밀번호
   */
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('/sign-in')
  async signIn(
    @Req() req: RequestWithUserInterface,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.generateAccessToken(req.user);
    const refreshToken = await this.authService.generateRefreshToken(req.user);

    const refreshTokenExpirationTime: number = this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenExpirationTime,
      path: '/',
    });

    return accessToken;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getAuthenticatedUser(@Req() req: RequestWithUserInterface) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  @Post('/refresh')
  async refresh(@Req() req: RequestWithUserInterface) {
    const accessToken = await this.authService.generateAccessToken(req.user);
    return accessToken;
  }
}
