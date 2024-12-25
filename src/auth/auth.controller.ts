import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestBodyDto } from './dto/sign-up-request-body.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import RequestWithUserInterface from './interface/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  async signIn(@Req() req: RequestWithUserInterface) {
    return this.authService.generateAccessToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getAuthenticatedUser(@Req() req: RequestWithUserInterface) {
    return req.user;
  }
}
