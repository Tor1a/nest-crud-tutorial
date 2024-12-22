import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestBodyDto } from './dto/sign-up-request-body.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guard/LocalAuthGuard';

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

  // @HttpCode(HttpStatus.OK)
  // @Post('/sign-in')
  // async signIn(@Body() userDTO: SignInRequestBodyDto) {
  //   try {
  //     await this.authService.signIn(userDTO);
  //     return {
  //       success: true,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: error.message,
  //     };
  //   }
  // }
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
  async signIn(@Req() req): Promise<any> {
    // return req.authUser;
    return this.authService.signIn(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Req() req) {
    return req.logout();
  }
}
