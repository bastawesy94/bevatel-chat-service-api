// notification.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @Column()
  createdAt: Date;

  @Column()
  type: string; // e.g., 'message' or 'roomJoin'
}
