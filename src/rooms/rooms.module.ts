import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './rooms.schema';
import { RoomsController } from './rooms.controller';
import { UsersModule } from '../users/users.module';
import { RoomsService } from './rooms.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    UsersModule,
  ],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
