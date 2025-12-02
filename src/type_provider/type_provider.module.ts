import { Module } from '@nestjs/common';
import { TypeProviderService } from './type_provider.service';
import { TypeProviderController } from './type_provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeProvider } from 'src/entities/entities/typeprovider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeProvider])],
  controllers: [TypeProviderController],
  providers: [TypeProviderService],
})
export class TypeProviderModule {}
