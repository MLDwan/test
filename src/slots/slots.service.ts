import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Slot } from 'src/schemas/slot.schema';
import { Model } from 'mongoose';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { randomUUID } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { DoctorsService } from 'src/doctors/doctors.service';
import { Logger } from 'winston';

@Injectable()
export class SlotsService {
  constructor(
    @InjectModel(Slot.name) private slotModel: Model<Slot>,
    private schedulerRegistry: SchedulerRegistry,
    private userService: UsersService,
    private docrotService: DoctorsService,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  async create(createSlotDto: any) {
    const { doctorId, dateSlot, userId } = createSlotDto;
    const slot = await this.slotModel.findOne({ doctorId, dateSlot });
    const user = await this.userService.findUser(userId);
    const doctor = await this.docrotService.findDoctor(doctorId);

    if (!slot && new Date(dateSlot).getTime() > new Date().getTime()) {
      const createdSlot = new this.slotModel(createSlotDto);
      const newDatefromTomorrow = new Date(dateSlot);
      const newDatefromToday = new Date(dateSlot);
      const namejobToday = randomUUID();
      const namejobTomorrow = randomUUID();

      if (newDatefromTomorrow.getTime() - new Date().getTime() > 86400000) {
        const timeTomorrow = new Date(
          newDatefromTomorrow.setDate(newDatefromTomorrow.getDate() - 1),
        );

        const jobTomorrow = new CronJob(timeTomorrow, () => {
          this.logger.info(
            `Привет ${user.name}! Напоминаем что вы записаны к ${
              doctor.name
            } завтра в ${newDatefromTomorrow.getHours()}:${newDatefromTomorrow.getMinutes()}!`,
          );
          this.deleteCron(namejobTomorrow);
        });

        this.schedulerRegistry.addCronJob(namejobTomorrow, jobTomorrow);
        jobTomorrow.start();
      }

      if (newDatefromToday.getTime() - new Date().getTime() > 7200000) {
        const timeToday = new Date(
          newDatefromToday.setHours(newDatefromToday.getHours() - 2),
        );
        const jobToday = new CronJob(timeToday, () => {
          this.deleteCron(namejobToday);
          this.logger.info(
            `Привет ${user.name}! Вам через 2 часа к ${doctor.name}!`,
          );
        });

        this.schedulerRegistry.addCronJob(namejobToday, jobToday);
        jobToday.start();
      }

      this.logger.info('you have been successfully recorded');
      return createdSlot.save();
    } else throw new HttpException('Date unavailable', HttpStatus.BAD_REQUEST);
  }

  async findAll(): Promise<Slot[]> {
    return this.slotModel.find().exec();
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
  }
}
