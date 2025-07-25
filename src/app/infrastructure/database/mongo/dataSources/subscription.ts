import { Subscription, deepParseObjectId } from '@util';
import { Document, UpdateResult } from 'typeorm';
import { ISubscriptionDataSource } from '../../../interfaces';
import { SubscriptionEntity } from '../models';
import { BaseDataSource } from './base';

export class SubscriptionDatasource
  extends BaseDataSource<Subscription, SubscriptionEntity>
  implements ISubscriptionDataSource<Subscription>
{
  async decreaseGenerationCount(
    user: string,
  ): Promise<UpdateResult | Document> {
    return this.repo.updateOne(
      { user: deepParseObjectId(user) },
      { $inc: { 'availableGenerations.postWizard': -1 } },
    );
  }
}
