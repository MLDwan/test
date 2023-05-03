import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Doctor } from 'src/schemas/doctor.schema';
import { Model } from 'mongoose';

@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor.name) private doctorModel: Model<Doctor>) {}

  async create(createDoctorDto: any): Promise<Doctor> {
    const id = randomUUID();
    createDoctorDto['_id'] = id;
    const createdDoctor = new this.doctorModel(createDoctorDto);
    return createdDoctor.save();
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.find().exec();
  }

  async findDoctor(id): Promise<Doctor> {
    return this.doctorModel.findById(id);
  }
}
