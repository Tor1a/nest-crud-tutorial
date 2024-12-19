import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    UserService,
    JwtService,
    UserRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
