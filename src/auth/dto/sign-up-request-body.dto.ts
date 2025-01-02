import { IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

/**
 * 회원가입 요청에 사용되는 DTO입니다.
 */
export class SignUpRequestBodyDto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  nickname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
