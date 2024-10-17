// messages/IMessagesRepository.ts

import { Message } from '../message.entity';
import { PaginationOptions } from './IQuertOptions';

export interface IMessagesRepository {
  createMessage(
    content: string,
    roomId: number,
    userId: number,
  ): Promise<Message>;
  getMessagesByRoom(
    roomId: number,
    options?: PaginationOptions,
  ): Promise<{ data: Message[]; total: number }>;
  findById(id: number): Promise<Message | null>;
}
