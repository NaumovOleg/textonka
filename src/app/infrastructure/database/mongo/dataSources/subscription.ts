import { deepParseObjectId, GENERATIONS_TYPES, Subscription } from '@util';
import { Document, UpdateResult } from 'typeorm';
import { ISubscriptionDataSource } from '../../../interfaces';
import { SubscriptionEntity } from '../models';
import { BaseDataSource } from './base';

export class SubscriptionDatasource
  extends BaseDataSource<Subscription, SubscriptionEntity>
  implements ISubscriptionDataSource<Subscription>
{
  async decreaseLeftSmartWizardGenerations(
    user: string,
  ): Promise<UpdateResult | Document> {
    return this.repo.updateOne(
      { user: deepParseObjectId(user) },
      { $inc: { 'availableGenerations.smartWizard': -1 } },
    );
  }

  async increaseSmartWizardGenerations(
    user: string,
  ): Promise<UpdateResult | Document> {
    return this.repo.updateOne(
      { user: deepParseObjectId(user) },
      { $inc: { 'usedGenerations.smartWizard': +1 } },
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
