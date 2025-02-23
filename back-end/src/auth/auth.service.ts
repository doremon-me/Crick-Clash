import {
  HttpException,
  Injectable,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { hash, compare } from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(
    data: { number: string; password: string; name: string },
    res: Response,
  ) {
    // Check duplicate user
    const user = await this.prisma.user.findFirst({
      where: { number: data.number },
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    // Create user
    data.password = await hash(data.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        number: data.number,
        password: data.password,
        name: data.name,
      },
    });

    const payload = { id: newUser.id, name: newUser.name, number: newUser.number };
    const token = this.jwtService.sign(payload);

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.ENV !== 'development',
      sameSite: 'strict',
      priority: 'high',
      signed: true,
      partitioned: process.env.ENV !== 'development',
    });

    return res.status(200).json({
      id: newUser.id,
      number: newUser.number,
      name: newUser.name,
    });
  }

  async signIn(data: { number: string; password: string }, res: Response) {
    // Check user
    const user = await this.prisma.user.findFirst({
      where: { number: data.number },
    });

    if (!user) {
      throw new UnauthorizedException('User not found', 'number');
    }

    // Check password
    if (!(await compare(data.password, user.password))) {
      throw new UnauthorizedException('Wrong password', 'password');
    }

    const payload = { id: user.id, name: user.name, number: user.number };
    const token = this.jwtService.sign(payload);

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.ENV !== 'development',
      sameSite: 'strict',
      priority: 'high',
      signed: true,
      partitioned: process.env.ENV !== 'development',
    });

    return res.status(200).json({
      id: user.id,
      number: user.number,
      name: user.name,
    });
  }
}
