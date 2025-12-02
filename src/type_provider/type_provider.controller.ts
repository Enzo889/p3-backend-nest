import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeProviderService } from './type_provider.service';
import { CreateTypeProviderDto } from './dto/create-type_provider.dto';
import { UpdateTypeProviderDto } from './dto/update-type_provider.dto';

@Controller('type-provider')
export class TypeProviderController {
  constructor(private readonly typeProviderService: TypeProviderService) {}

  @Post()
  create(@Body() dto: CreateTypeProviderDto) {
    return this.typeProviderService.create(dto);
  }

  @Get()
  findAll() {
    return this.typeProviderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeProviderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTypeProviderDto) {
    return this.typeProviderService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeProviderService.remove(+id);
  }
}
