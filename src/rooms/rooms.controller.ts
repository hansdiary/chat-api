import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.roomsService.createRoom(name);
  }

  @Post(':id/join')
  join(@Param('id') roomId: string, @Body('userId') userId: string) {
    return this.roomsService.joinRoom(roomId, userId);
  }

  @Post(':id/leave')
  leave(@Param('id') roomId: string, @Body('userId') userId: string) {
    return this.roomsService.leaveRoom(roomId, userId);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }
}
