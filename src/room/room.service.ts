// rooms/room.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Room } from './room.entity';
import { IRoomsRepository } from './interfaces/IRoomsRepository';

@Injectable()
export class RoomsService {
  constructor(
    @Inject('IRoomsRepository')
    private readonly roomsRepository: IRoomsRepository,
  ) {}

  async createRoom(name: string): Promise<Room> {
    return this.roomsRepository.createRoom(name);
  }

  async getAllRooms(): Promise<Room[]> {
    return this.roomsRepository.findAll();
  }

  async getRoomById(id: number): Promise<Room | null> {
    return this.roomsRepository.findById(id);
  }
}
