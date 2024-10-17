import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './user.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersRepository } from './user.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './user.controller';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UsersService,
    { provide: 'IUsersRepository', useClass: UsersRepository },
    JwtStrategy,
  ],
  exports: [
    UsersService,
    { provide: 'IUsersRepository', useClass: UsersRepository },
    JwtStrategy,
  ],
})
export class UsersModule {}
