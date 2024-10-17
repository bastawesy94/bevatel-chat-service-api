// rooms/room.entity.ts
import { Message } from 'src/message/message.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.rooms)
  @JoinTable()
  users: User[];
}
