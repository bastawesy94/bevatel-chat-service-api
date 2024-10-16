// chat/chat.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageRepository } from './message/message.repository';
import { RoomRepository } from './room/room.repository';

@WebSocketGateway({
  cors: {
    origin: '*', // Update with your client domain
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly roomRepository: RoomRepository,
  ) {}

  handleConnection(client: Socket) {
    console.log('User connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected', client.id);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, roomName: string) {
    const room = await this.roomRepository.findByName(roomName);
    if (!room) {
      client.emit('error', `Room with name ${roomName} not found`);
      return;
    }

    client.join(roomName);
    const messages = await this.messageRepository.findMessagesByRoom(
      room.id,
      20,
      0,
    );
    client.emit('messageHistory', messages);
    this.server.to(roomName).emit('userJoined', { roomName });
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    client: Socket,
    {
      roomName,
      content,
      userId,
    }: { roomName: string; content: string; userId: number },
  ) {
    const room = await this.roomRepository.findByName(roomName);
    if (!room) {
      client.emit('error', `Room with name ${roomName} not found`);
      return;
    }

    const message = await this.messageRepository.create(
      content,
      room.id,
      userId,
    );
    this.server.to(roomName).emit('newMessage', message);
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket, roomName: string) {
    this.server.to(roomName).emit('userTyping', client.id);
  }
}
