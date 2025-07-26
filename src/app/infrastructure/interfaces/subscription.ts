import { Subscription } from '@entities';
import { Document, UpdateResult } from 'typeorm';
import { IBaseDataSource } from './base.dataSource';
import { IBaseRepository } from './base.repository';

export interface ISubscriptionDataSource<T> extends IBaseDataSource<T> {
  decreaseLeftSmartWizardGenerations(
    user: string,
  ): Promise<UpdateResult | Document>;
  increaseSmartWizardGenerations(
    user: string,
  ): Promise<UpdateResult | Document>;
}

export interface ISubscriptionRepository extends IBaseRepository<Subscription> {
  decreaseLeftSmartWizardGenerations(
    user: string,
  ): Promise<Document | UpdateResult>;
  increaseSmartWizardGenerations(
    user: string,
  ): Promise<Document | UpdateResult>;
}
