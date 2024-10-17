// users.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from './interfaces/IUserRepository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async getUserById(id: number): Promise<User | null> {
    return this.usersRepository.getById(id);
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return this.usersRepository.createUser(userData);
  }
}
