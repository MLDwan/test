import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { DoctorsModule } from './doctors/doctors.module';
import { SlotsModule } from './slots/slots.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://user:user@cluster0.qxrhsuz.mongodb.net/?retryWrites=true&w=majority',
    ),
    UsersModule,
    DoctorsModule,
    SlotsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
