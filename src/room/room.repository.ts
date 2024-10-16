// rooms/room.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomRepository {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>,
  ) {}

  async create(name: string): Promise<Room> {
    const room = this.roomRepo.create({ name });
    return this.roomRepo.save(room);
  }

  async findByName(name: string): Promise<Room> {
    return this.roomRepo.findOne({ where: { name } });
  }

  async findById(id: number): Promise<Room> {
    return this.roomRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<Room[]> {
    return this.roomRepo.find();
  }
}
