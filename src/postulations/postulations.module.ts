import { Module } from '@nestjs/common';
import { PostulationsService } from './postulations.service';
import { PostulationsController } from './postulations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postulation } from 'src/entities/entities/postulation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Postulation])],
  controllers: [PostulationsController],
  providers: [PostulationsService],
})
export class PostulationsModule {}
