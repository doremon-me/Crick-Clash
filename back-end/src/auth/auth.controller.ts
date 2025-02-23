import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() data: SignUpDto) {
    return this.authService.signUp(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }
}
