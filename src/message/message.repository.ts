// messages/message.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { IMessagesRepository } from './interfaces/IMessagesRepository';
import { PaginationOptions } from './interfaces/IQuertOptions';

@Injectable()
export class MessagesRepository implements IMessagesRepository {
  constructor(
    @InjectRepository(Message)
    private readonly repository: Repository<Message>,
  ) {}

  async createMessage(
    content: string,
    roomId: number,
    userId: number,
  ): Promise<Message> {
    const message = this.repository.create({
      content,
      room: { id: roomId }, // Assuming room is a relation
      user: { id: userId }, // Assuming user is a relation
    });

    // Ensure save is properly called
    return await this.repository.save(message);
  }

  async getMessagesByRoom(
    roomId: number,
    options: PaginationOptions = {},
  ): Promise<{ data: Message[]; total: number }> {
    const { limit = 10, page = 1, order = 'DESC' } = options;

    // Ensure the limit and page values are positive
    const actualLimit = Math.max(1, limit);
    const actualPage = Math.max(1, page);

    // Calculate the offset for pagination
    const offset = (actualPage - 1) * actualLimit;

    // Fetch messages with pagination and ordering
    const [messages, total] = await this.repository.findAndCount({
      where: { room: { id: roomId } },
      order: { createdAt: order },
      take: actualLimit,
      skip: offset,
    });

    return {
      data: messages,
      total,
    };
  }

  async findById(id: number): Promise<Message | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['room', 'user'],
    });
  }
}
