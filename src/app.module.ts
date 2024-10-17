import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room/room.entity';
import { Message } from './message/message.entity';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { RoomsModule } from './room/rooms.module';
import { UsersModule } from './user/user.module';
import { MessagesModule } from './message/messag.module';
import { NotificationModule } from './notification/notification.module';
import { Notification } from './notification/notification.entity';

// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
});

console.log('process.env.DATABASE_URL --->', process.env.DATABASE_URL);

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Room, Message, User, Notification],
      synchronize: true,
    }),
    UsersModule,
    RoomsModule,
    MessagesModule,
    ChatModule,
    NotificationModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}
