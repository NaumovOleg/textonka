import { Subscription } from '@entities';
import { IBaseRepository } from './base.repository';

export interface ISubscriptionDataSource<T> {
  findOne(searchData: Partial<T>): Promise<T | null>;
  create(data: Omit<T, 'id'>): Promise<T>;
}

export interface ISubscriptionRepository
  extends IBaseRepository<Subscription> {}
