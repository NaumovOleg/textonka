import { deepParseObjectId, GENERATIONS_TYPES, Subscription } from '@util';
import { Document, UpdateResult } from 'typeorm';
import { ISubscriptionDataSource } from '../../../interfaces';
import { SubscriptionEntity } from '../models';
import { BaseDataSource } from './base';

export class SubscriptionDatasource
  extends BaseDataSource<Subscription, SubscriptionEntity>
  implements ISubscriptionDataSource<Subscription>
{
  async performGeneration(wizard: GENERATIONS_TYPES, user: string) {
    return this.repo.updateOne(
      { user: deepParseObjectId(user) },
      {
        $inc: {
          [`availableGenerations.${wizard}`]: -1,
          [`usedGenerations.${wizard}`]: +1,
        },
      },
    );
  }

  async addGenerations(
    user: string,
    type: GENERATIONS_TYPES,
    count: number,
  ): Promise<UpdateResult | Document> {
    return this.repo.updateOne(
      { user: deepParseObjectId(user) },
      { $inc: { [`availableGenerations.${type}`]: +count } },
    );
  }
}
