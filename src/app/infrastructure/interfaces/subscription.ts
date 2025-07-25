import { Subscription } from '@entities';
import { Document, UpdateResult } from 'typeorm';
import { IBaseDataSource } from './base.dataSource';
import { IBaseRepository } from './base.repository';

export interface ISubscriptionDataSource<T> extends IBaseDataSource<T> {
  decreaseLeftPostWizardGenerations(
    user: string,
  ): Promise<UpdateResult | Document>;
  increasePostWizardGenerations(user: string): Promise<UpdateResult | Document>;
}

export interface ISubscriptionRepository extends IBaseRepository<Subscription> {
  decreaseLeftPostWizardGenerations(
    user: string,
  ): Promise<Document | UpdateResult>;
  increasePostWizardGenerations(user: string): Promise<Document | UpdateResult>;
}
