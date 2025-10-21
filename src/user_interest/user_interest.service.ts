import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/entities/user.entity';
import { UserInterest } from './entities/user_interest.entity';
import { CreateUserInterestDto } from './dto/create-user_interest.dto';
import { NCategory } from 'src/entities/entities/ncategory.entity';

@Injectable()
export class UserInterestService {
  constructor(
    @InjectRepository(UserInterest)
    private readonly userInterestRepository: Repository<UserInterest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(NCategory)
    private readonly categoryRepository: Repository<NCategory>,
  ) {}

  async create(dto: CreateUserInterestDto) {
    // Buscar usuario
    const user = await this.userRepository.findOne({
      where: { idUser: dto.idUser },
    });
    if (!user) throw new NotFoundException('User not found');

    // Buscar categoría
    const category = await this.categoryRepository.findOne({
      where: { idCategory: dto.idCategory },
    });
    if (!category) throw new NotFoundException('Category not found');

    // Verificar duplicado
    const existing = await this.userInterestRepository.findOne({
      where: {
        user: { idUser: dto.idUser },
        category: { idCategory: dto.idCategory },
      },
    });
    if (existing) {
      throw new BadRequestException('Interest already exists for this user');
    }

    // Crear y guardar
    const userInterest = this.userInterestRepository.create({
      user,
      category,
    });

    return await this.userInterestRepository.save(userInterest);
  }

  async findAll() {
    return this.userInterestRepository.find({
      relations: ['user', 'category'],
    });
  }

  async findByUser(idUser: number) {
    return this.userInterestRepository.findOneBy({
      idUser: idUser,
    });
  }

  async remove(id: number) {
    const interest = await this.userInterestRepository.findOne({
      where: { idUserInterest: id },
    });
    if (!interest) throw new NotFoundException('Interest not found');

    return await this.userInterestRepository.remove(interest);
  }
}
