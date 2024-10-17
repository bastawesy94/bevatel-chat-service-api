import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendMessageDto } from './DTOs/SendMessageDto';
import { MessagesService } from './message.service';
import { PaginationOptions } from './interfaces/IQuertOptions';

@Controller('messages')
@ApiTags('messages')
export class MessageController {
  constructor(private readonly messageService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Send a message' })
  @ApiResponse({ status: 201, description: 'Message successfully sent' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.messageService.createMessage(
      sendMessageDto.content,
      sendMessageDto.roomId,
      sendMessageDto.userId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get messages for a room with pagination' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Room not found' })
  @Get()
  async getMessages(
    @Query('roomId') roomId: number,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('order') order?: 'ASC' | 'DESC',
  ) {
    const paginationOptions: PaginationOptions = {
      limit: limit ?? 10,
      page: page ?? 1,
      order: order ?? 'DESC',
    };

    return this.messageService.getMessagesByRoom(roomId, paginationOptions);
  }
}
