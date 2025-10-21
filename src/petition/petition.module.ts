import { Module } from '@nestjs/common';
import { PetitionService } from './petition.service';
import { PetitionController } from './petition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Petition } from 'src/entities/entities/petition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Petition])],
  controllers: [PetitionController],
  providers: [PetitionService],
})
export class PetitionModule {}
