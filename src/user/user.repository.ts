// users/user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(username: string, password: string): Promise<User> {
    const user = this.userRepo.create({ username, password });
    return this.userRepo.save(user);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepo.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User> {
    return this.userRepo.findOne({ where: { id } });
  }
}
