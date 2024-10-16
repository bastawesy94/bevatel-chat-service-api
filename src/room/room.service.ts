// rooms/room.service.ts
import { Injectable } from '@nestjs/common';
import { RoomRepository } from './room.repository';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async create(name: string): Promise<Room> {
    return this.roomRepository.create(name);
  }

  async findById(id: number): Promise<Room> {
    return this.roomRepository.findById(id);
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepository.findAll();
  }
}
