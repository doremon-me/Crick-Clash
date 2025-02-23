import {
  HttpException,
  Injectable,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(data: { number: string; password: string; name: string }) {
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

    return {
      id: newUser.id,
      number: newUser.number,
      name: newUser.name,
    };
  }

  async signIn(data: { number: string; password: string }) {
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

    return {
      id: user.id,
      number: user.number,
      name: user.name,
    };
  }
}
