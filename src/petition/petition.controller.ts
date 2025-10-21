import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetitionService } from './petition.service';
import { CreatePetitionDto } from './dto/create-petition.dto';
import { UpdatePetitionDto } from './dto/update-petition.dto';

@Controller('petition')
export class PetitionController {
  constructor(private readonly petitionService: PetitionService) {}

  @Post()
  create(@Body() createPetitionDto: CreatePetitionDto) {
    return this.petitionService.create(createPetitionDto);
  }

  @Get()
  findAll() {
    return this.petitionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petitionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetitionDto: UpdatePetitionDto) {
    return this.petitionService.update(+id, updatePetitionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petitionService.remove(+id);
  }
}
