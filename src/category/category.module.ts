import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NCategory } from 'src/entities/entities/ncategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NCategory])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
