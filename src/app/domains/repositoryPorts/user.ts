import { User } from '@entities';

export interface UserRepositoryPort {
  create(user: Omit<User, 'id'>): Promise<User>;
  findOne(searchData: Partial<User>): Promise<User | null>;
}
