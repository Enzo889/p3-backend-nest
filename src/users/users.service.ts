import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  create(userData: Partial<User>) {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOneByGmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ idUser: id });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    partial = false,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { idUser: id } });
    if (!user) throw new NotFoundException('User not found');

    if (partial) {
      // solo actualizamos los campos que vienen
      Object.assign(user, updateUserDto);
    } else {
      // actualizar todos los campos (PUT completo)
      this.usersRepository.merge(user, updateUserDto);
    }

    return this.usersRepository.save(user);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
