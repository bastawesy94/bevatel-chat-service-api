import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersRepository } from './user.repository';
import { User } from './user.entity';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    {
      provide: 'IUsersRepository', // Token for repository
      useClass: UsersRepository, // Implementation of repository
    },
  ],
  controllers: [UserController],
  exports: [UsersService, 'IUsersRepository'], // Export both the service and repository
})
export class UsersModule {}
