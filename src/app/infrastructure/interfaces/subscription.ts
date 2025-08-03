import { Subscription } from '@entities';
import { GENERATIONS_TYPES } from '@util';
import { Document, UpdateResult } from 'typeorm';
import { IBaseDataSource } from './base.dataSource';
import { IBaseRepository } from './base.repository';

export interface ISubscriptionDataSource<T> extends IBaseDataSource<T> {
  performGeneration(
    wizard: GENERATIONS_TYPES,
    user: string,
  ): Promise<UpdateResult | Document>;

  addGenerations(
    user: string,
    type: GENERATIONS_TYPES,
    count: number,
  ): Promise<UpdateResult | Document>;
}

export interface ISubscriptionRepository extends IBaseRepository<Subscription> {
  performGeneration(
    wizard: GENERATIONS_TYPES,
    user: string,
  ): Promise<Document | UpdateResult>;
  addGenerations(
    user: string,
    type: GENERATIONS_TYPES,
    count: number,
  ): Promise<UpdateResult | Document>;
}
