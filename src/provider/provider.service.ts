import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './entities/provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async create(createProviderDto: CreateProviderDto) {
    const provider = this.providerRepository.create(createProviderDto);
    return await this.providerRepository.save(provider);
  }

  async findAll() {
    return await this.providerRepository.find({
      relations: ['typeProvider'], // Ajustame esto si tus relaciones se llaman distinto
    });
  }

  async findOne(id: number) {
    const provider = await this.providerRepository.findOne({
      where: { idProvider: id },
      relations: ['typeProvider'],
    });

    if (!provider) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }

    return provider;
  }

  async update(id: number, updateProviderDto: UpdateProviderDto) {
    const provider = await this.findOne(id);

    const updated = Object.assign(provider, updateProviderDto);
    return await this.providerRepository.save(updated);
  }

  async remove(id: number) {
    const provider = await this.findOne(id);
    return await this.providerRepository.remove(provider);
  }
}
