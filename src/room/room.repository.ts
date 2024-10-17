// rooms/room.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { IRoomsRepository } from './interfaces/IRoomsRepository';
import { User } from 'src/user/user.entity';

@Injectable()
export class RoomsRepository implements IRoomsRepository {
  constructor(
    @InjectRepository(Room)
    private readonly repository: Repository<Room>,
  ) {}

  async createRoom(name: string): Promise<Room> {
    const room = this.repository.create({ name });
    return await this.repository.save(room);
  }

  async findByName(name: string): Promise<Room> {
    return this.repository.findOne({ where: { name } });
  }

  async findAll(): Promise<Room[]> {
    return this.repository.find({ relations: ['messages'] });
  }

  async findById(id: number): Promise<Room | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['messages'],
    });
  }
  // Implementation of the findUsersByRoom method
  async findUsersByRoom(roomId: number): Promise<User[]> {
    const room = await this.repository.findOne({
      where: { id: roomId },
      relations: ['users'],
    });
    if (!room) {
      return [];
    }
    return room.users; // Assuming the Room entity has a 'users' relation
  }
}
