import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() data: SignUpDto, @Res() res: Response) {
    return this.authService.signUp(data, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() data: SignInDto, @Res() res: Response) {
    return this.authService.signIn(data, res);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Get('verify')
  @UseGuards(AuthGuard)
  async verify(@Req() req: Request) {
    return req.user;
  }
}
