import { IsNotEmpty, IsPhoneNumber, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'Phone number is required!' })
  @IsPhoneNumber('IN', { message: 'Invalid phone number!' })
  @Matches(/^[6-9]\d{9}$/, { message: 'Invalid phone number!' })
  number: string;

  @IsNotEmpty({ message: 'Password is required!' })
  @MinLength(5, { message: 'Password is too short!' })
  password: string;

  @IsNotEmpty({ message: 'Name is required!' })
  @MinLength(3, { message: 'Full name is required!' })
  name: string;
}
