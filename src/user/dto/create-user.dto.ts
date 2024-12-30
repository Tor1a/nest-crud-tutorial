import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsEmail()
  nickname: string;
}
