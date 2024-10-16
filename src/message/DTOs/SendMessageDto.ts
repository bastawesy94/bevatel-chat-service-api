import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ example: 'Hello, world!', description: 'Content of the message' })
  content: string;

  @ApiProperty({ example: 1, description: 'Room ID where the message is sent' })
  roomId: number;

  @ApiProperty({ example: 1, description: 'User ID who is sending the message' })
  userId: number;
}
