// chat.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { IMessagesRepository } from 'src/message/interfaces/IMessagesRepository';
import { IRoomsRepository } from 'src/room/interfaces/IRoomsRepository';
import { UsersService } from 'src/user/user.service';
import { NotificationService } from 'src/notification/notification.service'; // Add NotificationService

@WebSocketGateway(4001, {
  cors: {
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    @Inject('IMessagesRepository')
    private readonly messagesRepository: IMessagesRepository,
    @Inject('IRoomsRepository')
    private readonly roomsRepository: IRoomsRepository,
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService, // Inject NotificationService
  ) {}

  handleConnection(client: Socket) {
    console.log('User connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected', client.id);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, roomName: string) {
    const room = await this.roomsRepository.findByName(roomName);
    if (!room) {
      client.emit('error', `Room with name ${roomName} not found`);
      return;
    }

    client.join(roomName);
    const messages = await this.messagesRepository.getMessagesByRoom(room.id);
    client.emit('messageHistory', messages);
    this.server.to(roomName).emit('userJoined', { roomName });

    const usersInRoom = await this.roomsRepository.findUsersByRoom(room.id);
    for (const user of usersInRoom) {
      if (Number(client.id) !== user.id) {
        await this.notificationService.sendNotification(
          user.id,
          `Someone joined room ${roomName}`,
          'roomJoin',
        );
      }
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody()
    messageData: { roomId: number; userId: number; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomId, userId, content } = messageData;
    if (!content || content.trim() === '') {
      client.emit('error', { message: 'Cannot send an empty message.' });
      return;
    }

    this.server.to(`room_${roomId}`).emit('message', { userId, content });
    await this.messagesRepository.createMessage(content, roomId, userId);

    const roomUsers = await this.roomsRepository.findUsersByRoom(roomId);
    for (const user of roomUsers) {
      if (user.id !== userId) {
        await this.notificationService.sendNotification(
          user.id,
          `New message in room ${roomId}`,
          'message',
        );
      }
    }
  }
}
