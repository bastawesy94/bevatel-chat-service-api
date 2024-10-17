import { User } from 'src/user/user.entity';
import { Room } from '../room.entity';

export interface IRoomsRepository {
  createRoom(name: string): Promise<Room>;
  findByName(name: string): Promise<Room>;
  findAll(): Promise<Room[]>;
  findById(id: number): Promise<Room | null>;
  findUsersByRoom(roomId: number): Promise<User[]>;
}
