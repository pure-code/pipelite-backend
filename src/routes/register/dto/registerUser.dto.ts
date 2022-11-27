import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  userEmail: string;
  @IsString()
  firstName: string;
  @Length(6, 40)
  @IsString()
  password: string;
}
