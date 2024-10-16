import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({ example: 'general', description: 'Name of the room' })
  name: string;
}
