import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcriptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    if (!loginDto) {
      throw new BadRequestException('Request body is missing');
    }

    const { email, password, group } = loginDto;

    const user = await this.usersService.findOneByGmail(email);

    if (!user) {
      throw new UnauthorizedException('Email is wrong');
    }

    const isPasswordValid = await bcriptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is wrong');
    }

    const payload = { email: user.email, group: user.group };
    const token = await this.jwtService.signAsync(payload);

    return { token, email, group };
  }

  async register(registerDto: RegisterDto) {
    if (!registerDto) {
      throw new BadRequestException('Request body is missing');
    }

    const { email, password, name } = registerDto;

    const user = await this.usersService.findOneByGmail(email);
    if (user) {
      throw new BadRequestException('User already in use');
    }

    return this.usersService.create({
      email,
      password: await bcriptjs.hash(password, 10),
      name,
    });
  }
}
