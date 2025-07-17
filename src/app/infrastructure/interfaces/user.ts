import { User } from '@entities';
import { IBaseRepository } from './base.repository';

export interface IUserDataSource<T> {
  findOne(searchData: Partial<T>): Promise<T | null>;
  create(data: Omit<T, 'id'>): Promise<T>;
}

export interface IUserRepository extends IBaseRepository<User> {}
