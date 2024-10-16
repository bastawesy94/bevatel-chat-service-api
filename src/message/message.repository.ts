// messages/message.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async create(
    content: string,
    roomId: number,
    userId: number,
  ): Promise<Message> {
    const message = this.messageRepo.create({
      content,
      room: { id: roomId },
      user: { id: userId },
    });
    return this.messageRepo.save(message);
  }

  async findMessagesByRoom(
    roomId: number,
    limit: number,
    offset: number,
  ): Promise<Message[]> {
    return this.messageRepo.find({
      where: { room: { id: roomId } },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }
}
