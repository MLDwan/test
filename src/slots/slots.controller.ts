import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { Logger } from 'winston';

@Controller('slots')
export class SlotsController {
  constructor(
    private slotService: SlotsService,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}
  @Get()
  async getAllDoctors() {
    const users = await this.slotService.findAll();

    return users;
  }

  @Post()
  async addNewDoctor(@Body() slotInfo) {
    const result = await this.slotService.create(slotInfo);
    this.logger.info(result);
    return result;
  }
}
