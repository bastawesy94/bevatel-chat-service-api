// chat.module.ts
import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RoomsModule } from 'src/room/rooms.module';
import { UsersModule } from 'src/user/user.module';
import { NotificationModule } from 'src/notification/notification.module';
import { MessagesModule } from 'src/message/messag.module';

@Module({
  imports: [RoomsModule, MessagesModule, UsersModule, NotificationModule],
  providers: [ChatGateway],
})
export class ChatModule {}
