import { Subscription } from '@entities';
import { GENERATIONS_TYPES } from '@util';
import {
  ISubscriptionDataSource,
  ISubscriptionRepository,
} from '../interfaces';
import { BaseRepository } from './base';

export class SubscriptionRepository
  extends BaseRepository<Subscription, ISubscriptionDataSource<Subscription>>
  implements ISubscriptionRepository
{
  constructor(
    entity: { new (...args: Subscription[]): Subscription },
    dataSource: ISubscriptionDataSource<Subscription>,
  ) {
    super(entity, dataSource);
  }

  decreaseLeftSmartWizardGenerations(user: string) {
    return this.dataSource.decreaseLeftSmartWizardGenerations(user);
  }

  increaseSmartWizardGenerations(user: string) {
    return this.dataSource.increaseSmartWizardGenerations(user);
  }

  addGenerations(user: string, type: GENERATIONS_TYPES, count: number) {
    return this.dataSource.addGenerations(user, type, count);
  }
}
