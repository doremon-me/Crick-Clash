import {
  HttpException,
  Injectable,
  HttpStatus,
  UnauthorizedException,
  ConflictException,
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
      throw new ConflictException('User already exists');
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

    const payload = {
      id: newUser.id,
      name: newUser.name,
      number: newUser.number,
    };
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

  async adminSignin(data: { number: string; password: string }, res: Response) {
    const admin = await this.prisma.admin.findFirst({
      where: { number: data.number },
    });

    if (!admin) {
      throw new UnauthorizedException('User not found', 'number');
    }

    if (!(await compare(data.password, admin.password))) {
      throw new UnauthorizedException('Wrong password', 'password');
    }

    const payload = {
      id: admin.id,
      name: admin.name,
      number: admin.number,
      permissions: admin.permissions,
    };
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
      id: admin.id,
      number: admin.number,
      name: admin.name,
    });
  }

  async createAdmin(data: { number: string; password: string; name: string }) {
    const admin = await this.prisma.admin.findFirst({
      where: { number: data.number },
    });

    if (admin) {
      throw new ConflictException('User already exits.');
    }

    data.password = await hash(data.password, 10);
    const newAdmin = await this.prisma.admin.create({ data });

    return newAdmin;
  }
}
