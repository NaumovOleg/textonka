import { Subscription } from '@entities';
import { Document, UpdateResult } from 'typeorm';
import { IBaseDataSource } from './base.dataSource';
import { IBaseRepository } from './base.repository';

export interface ISubscriptionDataSource<T> extends IBaseDataSource<T> {
  decreaseGenerationCount(user: string): Promise<UpdateResult | Document>;
}

export interface ISubscriptionRepository extends IBaseRepository<Subscription> {
  decreaseGenerationCount(user: string): Promise<Document | UpdateResult>;
}
