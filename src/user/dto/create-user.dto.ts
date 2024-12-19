import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsString()
  password: string;

  @IsEmail()
  nickname: string;
}
