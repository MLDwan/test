import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private docrotService: DoctorsService) {}
  @Get()
  async getAllDoctors() {
    const users = await this.docrotService.findAll();

    return users;
  }

  @Post()
  async addNewDoctor(@Body() doctorInfo) {
    const user = await this.docrotService.create(doctorInfo);

    return user;
  }
}
