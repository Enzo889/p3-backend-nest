import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateUserInterestDto } from './dto/create-user_interest.dto';
import { UserInterestService } from './user_interest.service';

@Controller('user-interest')
export class UserInterestController {
  constructor(private readonly userInterestService: UserInterestService) {}

  @Post()
  create(@Body() dto: CreateUserInterestDto) {
    return this.userInterestService.create(dto);
  }

  @Get()
  findAll() {
    return this.userInterestService.findAll();
  }

  @Get(':idUser')
  findByUser(@Param('idUser') idUser: number) {
    return this.userInterestService.findByUser(idUser);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userInterestService.remove(id);
  }
}
