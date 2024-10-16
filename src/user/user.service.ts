// users/user.service.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(username: string, password: string): Promise<User> {
    return this.userRepository.create(username, password);
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }
}
