import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestBodyDto } from './dto/sign-up-request-body.dto';

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
}
