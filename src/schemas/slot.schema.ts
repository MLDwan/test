import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SlotDocument = HydratedDocument<Slot>;

@Schema()
export class Slot {
  @Prop()
  doctorId: string;

  @Prop()
  userId: string;

  @Prop()
  dateSlot: string;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);
