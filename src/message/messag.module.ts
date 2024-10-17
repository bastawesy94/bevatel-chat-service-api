import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessagesService } from './message.service';
import { MessagesRepository } from './message.repository';
import { MessageController } from './message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [
    MessagesService,
    {
      provide: 'IMessagesRepository',
      useClass: MessagesRepository,
    },
  ],
  controllers: [MessageController],
  exports: [MessagesService, 'IMessagesRepository'], // Export repository and service
})
export class MessagesModule {}
