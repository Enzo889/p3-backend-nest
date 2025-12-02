import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    const portfolio = this.portfolioRepository.create(createPortfolioDto);
    return await this.portfolioRepository.save(portfolio);
  }

  async findAll() {
    return await this.portfolioRepository.find();
  }

  async findOne(id: number) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { idPortfolio: id },
    });

    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }

    return portfolio;
  }

  async update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
    const portfolio = await this.findOne(id);

    const updated = Object.assign(portfolio, updatePortfolioDto);
    return await this.portfolioRepository.save(updated);
  }

  async remove(id: number) {
    const portfolio = await this.findOne(id);
    return await this.portfolioRepository.remove(portfolio);
  }
}
