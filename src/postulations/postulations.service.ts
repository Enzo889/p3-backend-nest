import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postulation } from 'src/entities/entities/postulation.entity';
import { CreatePostulationDto } from './dto/create-postulation.dto';
import { UpdatePostulationDto } from './dto/update-postulation.dto';

@Injectable()
export class PostulationsService {
  constructor(
    @InjectRepository(Postulation)
    private readonly postulationRepository: Repository<Postulation>,
  ) {}

  async create(
    createPostulationDto: CreatePostulationDto,
  ): Promise<Postulation> {
    const newPostulation =
      this.postulationRepository.create(createPostulationDto);
    return await this.postulationRepository.save(newPostulation);
  }

  async findAll(): Promise<Postulation[]> {
    return await this.postulationRepository.find();
  }

  async findOne(id: number): Promise<Postulation> {
    const postulation = await this.postulationRepository.findOne({
      where: { idpostulation: id },
    });
    if (!postulation) {
      throw new NotFoundException(`Postulation with ID ${id} not found`);
    }
    return postulation;
  }

  async update(
    id: number,
    updatePostulationDto: UpdatePostulationDto,
  ): Promise<Postulation> {
    const postulation = await this.findOne(id);

    Object.assign(postulation, updatePostulationDto);

    return await this.postulationRepository.save(postulation);
  }

  async remove(id: number): Promise<{ message: string }> {
    const postulation = await this.findOne(id);

    await this.postulationRepository.remove(postulation);

    return { message: `Postulation with ID ${id} deleted successfully` };
  }
}
