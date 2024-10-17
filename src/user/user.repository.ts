// users.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import { IUsersRepository } from './interfaces/IUserRepository';

@Injectable()
export class UsersRepository
  extends Repository<User>
  implements IUsersRepository
{
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getById(id: number): Promise<User | null> {
    return this.findOne({ where: { id } });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.create(userData);
    return this.save(user);
  }
}
