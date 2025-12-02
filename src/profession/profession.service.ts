import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profession } from './entities/profession.entity';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';

@Injectable()
export class ProfessionService {
  constructor(
    @InjectRepository(Profession)
    private readonly professionRepository: Repository<Profession>,
  ) {}

  async create(createProfessionDto: CreateProfessionDto) {
    const profession = this.professionRepository.create(createProfessionDto);
    return await this.professionRepository.save(profession);
  }

  async findAll() {
    return await this.professionRepository.find();
  }

  async findOne(id: number) {
    const profession = await this.professionRepository.findOne({
      where: { idProfession: id },
    });

    if (!profession) {
      throw new NotFoundException(`Profession with ID ${id} not found`);
    }

    return profession;
  }

  async update(id: number, updateProfessionDto: UpdateProfessionDto) {
    const profession = await this.findOne(id);

    const updated = Object.assign(profession, updateProfessionDto);
    return await this.professionRepository.save(updated);
  }

  async remove(id: number) {
    const profession = await this.findOne(id);
    return await this.professionRepository.remove(profession);
  }
}
