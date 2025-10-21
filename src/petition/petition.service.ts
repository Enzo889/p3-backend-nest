import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Petition } from 'src/entities/entities/petition.entity';
import { Repository } from 'typeorm';
import { CreatePetitionDto } from './dto/create-petition.dto';
import { UpdatePetitionDto } from './dto/update-petition.dto';

@Injectable()
export class PetitionService {
  constructor(
    @InjectRepository(Petition)
    private readonly petitionRepository: Repository<Petition>,
  ) {}

  // 🔹 Crear una nueva petición
  async create(createPetitionDto: CreatePetitionDto): Promise<Petition> {
    const petition = this.petitionRepository.create({
      ...createPetitionDto,
      dateCreate: new Date(),
      dateUpdate: new Date(),
    });
    return await this.petitionRepository.save(petition);
  }

  // 🔹 Obtener todas las peticiones (puede incluir relaciones)
  async findAll(): Promise<Petition[]> {
    return await this.petitionRepository.find({
      relations: ['idState2', 'idTypePetition2'],
      order: { idPetition: 'DESC' },
    });
  }

  // 🔹 Obtener una petición por su ID
  async findOne(id: number): Promise<Petition> {
    const petition = await this.petitionRepository.findOne({
      where: { idPetition: id },
      relations: ['idState2', 'idTypePetition2'],
    });

    if (!petition) {
      throw new NotFoundException(`Petition with ID ${id} not found`);
    }

    return petition;
  }

  // 🔹 Actualizar una petición
  async update(
    id: number,
    updatePetitionDto: UpdatePetitionDto,
  ): Promise<Petition> {
    const petition = await this.petitionRepository.findOne({
      where: { idPetition: id },
    });

    if (!petition) {
      throw new NotFoundException(`Petition with ID ${id} not found`);
    }

    Object.assign(petition, updatePetitionDto, {
      dateUpdate: new Date(),
    });

    return await this.petitionRepository.save(petition);
  }

  // 🔹 Eliminar una petición
  async remove(id: number): Promise<void> {
    const petition = await this.petitionRepository.findOne({
      where: { idPetition: id },
    });

    if (!petition) {
      throw new NotFoundException(`Petition with ID ${id} not found`);
    }

    await this.petitionRepository.remove(petition);
  }
}
