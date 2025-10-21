import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interest } from 'src/entities/entities/interest.entity';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';

@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) {}

  // Crear un nuevo registro de interés
  async create(createInterestDto: CreateInterestDto): Promise<Interest> {
    const interest = this.interestRepository.create({
      ...createInterestDto,
      dateCreate: new Date(),
      dateUpdate: new Date('0000-00-00 00:00:00'),
    });

    return this.interestRepository.save(interest);
  }

  // Obtener todos los intereses
  async findAll(): Promise<Interest[]> {
    return this.interestRepository.find({
      relations: ['idCategory2', 'idCustomer2', 'interestHistories'],
    });
  }

  // Buscar un interés por ID
  async findOne(id: number): Promise<Interest> {
    const interest = await this.interestRepository.findOne({
      where: { idInterest: id },
      relations: ['idCategory2', 'idCustomer2', 'interestHistories'],
    });

    if (!interest) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }

    return interest;
  }

  // Actualizar un interés existente
  async update(
    id: number,
    updateInterestDto: UpdateInterestDto,
  ): Promise<Interest> {
    const interest = await this.interestRepository.findOneBy({
      idInterest: id,
    });

    if (!interest) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }

    const updatedInterest = this.interestRepository.merge(
      interest,
      updateInterestDto,
      { dateUpdate: new Date() },
    );

    return this.interestRepository.save(updatedInterest);
  }

  // Eliminar un interés
  async remove(id: number): Promise<void> {
    const result = await this.interestRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }
  }
}
