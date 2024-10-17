import { Injectable, Inject } from '@nestjs/common';
import { Message } from './message.entity';
import { IMessagesRepository } from './interfaces/IMessagesRepository';
import { PaginationOptions } from './interfaces/IQuertOptions';

@Injectable()
export class MessagesService {
  constructor(
    @Inject('IMessagesRepository')
    private readonly messagesRepository: IMessagesRepository,
  ) {}

  async createMessage(
    content: string,
    roomId: number,
    userId: number,
  ): Promise<Message> {
    return this.messagesRepository.createMessage(content, roomId, userId);
  }

  async getMessagesByRoom(
    roomId: number,
    options?: PaginationOptions,
  ): Promise<{ data: Message[]; total: number }> {
    return this.messagesRepository.getMessagesByRoom(roomId, options);
  }

  async getMessageById(id: number): Promise<Message | null> {
    return this.messagesRepository.findById(id);
  }
}
