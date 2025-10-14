import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/entities/user.entity';
import { Repository } from 'typeorm';

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

  findOne(id: number) {
    return this.usersRepository.findOneBy({ idUser: id });
  }

  update(id: number, userData: Partial<User>) {
    return this.usersRepository.update(id, userData);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
