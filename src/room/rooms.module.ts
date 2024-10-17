import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomsService } from './room.service';
import { RoomsRepository } from './room.repository';
import { RoomController } from './room.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [
    RoomsService,
    {
      provide: 'IRoomsRepository',
      useClass: RoomsRepository,
    },
  ],
  controllers: [RoomController],
  exports: [RoomsService, 'IRoomsRepository'],
})
export class RoomsModule {}
