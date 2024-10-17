import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Notification } from 'src/notification/notification.entity';
import { Room } from 'src/room/room.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @ManyToMany(() => Room, (room) => room.users)
  rooms: Room[];

  @Column({ default: 0 })
  unreadMessagesCount: number;
}
