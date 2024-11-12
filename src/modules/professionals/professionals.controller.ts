// backend/src/modules/professionals/professionals.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { CreateProfessionalDto } from './dto/create-user.dto';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Post()
  create(@Body() createProfessionalDto: CreateProfessionalDto) {
    return this.professionalsService.create(createProfessionalDto);
  }

  @Get()
  findAll() {
    return this.professionalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalsService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.professionalsService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createProfessionalDto: CreateProfessionalDto) {
    return this.professionalsService.update(id, createProfessionalDto);
  }
}
