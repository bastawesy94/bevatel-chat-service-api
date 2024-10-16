import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room/room.entity';
import { Message } from './message/message.entity';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { UserController } from './user/user.controller';
import { RoomController } from './room/room.controller';
import { MessageController } from './message/message.controller';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';
import { RoomService } from './room/room.service';
import { RoomRepository } from './room/room.repository';
import { MessageService } from './message/message.service';
import { MessageRepository } from './message/message.repository';
import { ChatGateway } from './chat.gateway';

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
      entities: [Room, Message, User],
      synchronize: true,  // for development purposes
    }),
    TypeOrmModule.forFeature([User, Room, Message]),
  ],
  controllers: [UserController, RoomController, MessageController],
  providers: [UserService, UserRepository, RoomService, RoomRepository, MessageService, MessageRepository, ChatGateway],
})
export class AppModule {}
