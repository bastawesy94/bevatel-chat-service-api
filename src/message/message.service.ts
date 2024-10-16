// messages/message.service.ts
import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async sendMessage(
    content: string,
    roomId: number,
    userId: number,
  ): Promise<Message> {
    return this.messageRepository.create(content, roomId, userId);
  }

  async getMessagesByRoom(
    roomId: number,
    limit: number,
    offset: number,
  ): Promise<Message[]> {
    return this.messageRepository.findMessagesByRoom(roomId, limit, offset);
  }
}
