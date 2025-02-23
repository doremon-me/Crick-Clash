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
  UnauthorizedException,
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
  @UseGuards(AuthGuard)
  @Get('verify')
  async verify(@Req() req: Request) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('admin/signin')
  async adminSignin(@Body() data: SignInDto, @Res() res: Response) {
    return this.authService.adminSignin(data, res);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post('admin/create')
  async createAdmin(@Body() data: SignUpDto, @Req() req: Request) {
    const user = req.user as {
      id: string;
      name: string;
      number: string;
      permissions: any[];
    };
    if (!user.permissions?.includes('ADMIN_ADMIN'))
      throw new UnauthorizedException('Permmission Denied.');

    return this.authService.createAdmin(data);
  }
}
