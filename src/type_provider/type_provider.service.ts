import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeProviderDto } from './dto/create-type_provider.dto';
import { UpdateTypeProviderDto } from './dto/update-type_provider.dto';
import { TypeProvider } from 'src/entities/entities/typeprovider.entity';

@Injectable()
export class TypeProviderService {
  constructor(
    @InjectRepository(TypeProvider)
    private readonly typeProviderRepository: Repository<TypeProvider>,
  ) {}

  async create(createDto: CreateTypeProviderDto) {
    const newEntity = this.typeProviderRepository.create(createDto);
    return await this.typeProviderRepository.save(newEntity);
  }

  async findAll() {
    return await this.typeProviderRepository.find();
  }

  async findOne(id: number) {
    const entity = await this.typeProviderRepository.findOne({
      where: { idTypeProvider: id },
    });

    if (!entity) {
      throw new NotFoundException(`TypeProvider with ID ${id} not found`);
    }

    return entity;
  }

  async update(id: number, updateDto: UpdateTypeProviderDto) {
    const entity = await this.findOne(id); // valida existencia

    const updated = Object.assign(entity, updateDto);

    return await this.typeProviderRepository.save(updated);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);

    return await this.typeProviderRepository.remove(entity);
  }
}
