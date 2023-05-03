import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  _id: UUID;

  @Prop()
  phone: string;

  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
