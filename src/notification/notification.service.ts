// notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async sendNotification(userId: number, content: string, type: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const notification = this.notificationRepository.create({
      content,
      user,
      createdAt: new Date(),
      type,
    });

    await this.notificationRepository.save(notification);
    console.log(`Notification sent to user ${userId}: ${content}`);
  }

  async markAsRead(notificationId: number) {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId },
    });
    if (notification) {
      notification.isRead = true;
      await this.notificationRepository.save(notification);
    }
  }
}
