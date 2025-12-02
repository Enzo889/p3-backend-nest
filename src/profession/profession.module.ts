import { Module } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { ProfessionController } from './profession.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profession } from 'src/entities/entities/profession.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profession])],
  controllers: [ProfessionController],
  providers: [ProfessionService],
})
export class ProfessionModule {}
