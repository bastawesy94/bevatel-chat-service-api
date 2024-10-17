import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotificationService } from './notification.service';

@WebSocketGateway(4002, {
  cors: {
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class NotificationGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly notificationService: NotificationService) {}

  async sendRealTimeNotification(userId: number, content: string) {
    this.server.to(`user_${userId}`).emit('notification', content);
  }

  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(client: any, notificationId: number) {
    await this.notificationService.markAsRead(notificationId);
    client.emit('notificationRead', notificationId);
  }
}
