import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema()
export class Doctor {
  @Prop()
  _id: UUID;

  @Prop()
  name: string;

  @Prop()
  spec: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
