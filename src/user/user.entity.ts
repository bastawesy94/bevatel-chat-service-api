// user.entity.ts
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

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @ManyToMany(() => Room, (room) => room.users)
  rooms: Room[];

  // You can also add unread messages count if required
  @Column({ default: 0 })
  unreadMessagesCount: number;
}
