import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcriptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(loginDto: LoginDto) {
    if (!loginDto) {
      throw new BadRequestException('Request body is missing');
    }

    const { email, password } = loginDto;

    const user = await this.usersService.findOneByGmail(email);

    if (!user) {
      throw new UnauthorizedException('Email is wrong');
    }

    const isPasswordValid = await bcriptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is wrong');
    }

    return user;
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
