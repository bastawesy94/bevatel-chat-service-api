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
      provide: 'IRoomsRepository', // Provide the token
      useClass: RoomsRepository, // Use RoomsRepository as the implementation
    },
  ],
  controllers: [RoomController],
  exports: [RoomsService, 'IRoomsRepository'], // Export both
})
export class RoomsModule {}
