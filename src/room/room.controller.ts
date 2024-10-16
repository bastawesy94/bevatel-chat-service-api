import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRoomDto } from './DTOs/CreateRoomDto';

@Controller('rooms')
@ApiTags('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({ status: 201, description: 'Room successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto.name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a room by ID' })
  @ApiResponse({ status: 200, description: 'Room found' })
  @ApiResponse({ status: 404, description: 'Room not found' })
  async getRoomById(@Param('id') id: number) {
    return this.roomService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({ status: 200, description: 'List of rooms' })
  async getAllRooms() {
    return this.roomService.findAll();
  }
}
