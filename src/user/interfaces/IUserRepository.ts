import { User } from '../user.entity';

export interface IUsersRepository {
  getById(id: number): Promise<User | null>;
  createUser(userData: Partial<User>): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
