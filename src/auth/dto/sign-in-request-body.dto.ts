import { IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

/**
 * 로그인 요청에 사용되는 DTO입니다.
 */
export class SignInRequestBodyDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  nickname: string;

  @IsString()
  password: string;
}
