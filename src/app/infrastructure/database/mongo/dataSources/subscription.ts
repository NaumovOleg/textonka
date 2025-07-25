import { Subscription } from '@util';
import { Document, UpdateResult } from 'typeorm';
import { ISubscriptionDataSource } from '../../../interfaces';
import { BaseDataSource } from './base';

export class SubscriptionDatasource
  extends BaseDataSource<Subscription>
  implements ISubscriptionDataSource<Subscription>
{
  async decreaseGenerationCount(
    user: string,
  ): Promise<UpdateResult | Document> {
    return this.repo.updateOne(
      { user },
      { $inc: { 'availableGenerations.postWizard': -1 } },
    );
  }
}
