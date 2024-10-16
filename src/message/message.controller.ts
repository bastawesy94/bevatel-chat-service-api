import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendMessageDto } from './DTOs/SendMessageDto';

@Controller('messages')
@ApiTags('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: 'Send a message' })
  @ApiResponse({ status: 201, description: 'Message successfully sent' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.messageService.sendMessage(
      sendMessageDto.content,
      sendMessageDto.roomId,
      sendMessageDto.userId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get messages for a room with pagination' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Room not found' })
  async getMessages(
    @Query('roomId') roomId: number,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.messageService.getMessagesByRoom(roomId, limit, offset);
  }
}
