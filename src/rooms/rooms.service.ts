import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Room, RoomDocument } from './rooms.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name)
    private roomModel: Model<RoomDocument>,
  ) {}

  async createRoom(name: string) {
    const room = new this.roomModel({ name, participants: [] });
    return room.save();
  }

  async joinRoom(roomId: string, userId: string) {
    const room = await this.roomModel.findById(roomId);
    if (!room) throw new NotFoundException('Room not found');

    const userObjectId = new Types.ObjectId(userId);

    if (!room.participants.includes(userObjectId)) {
      room.participants.push(userObjectId);
    }

    return room.save();
  }

  async leaveRoom(roomId: string, userId: string) {
    const room = await this.roomModel.findById(roomId);
    if (!room) throw new NotFoundException('Room not found');

    room.participants = room.participants.filter(
      (id) => id.toString() !== userId,
    );

    return room.save();
  }

  async findAll() {
    return this.roomModel.find().populate('participants', 'email');
  }
}
