import { Subscription } from '@entities';
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
}
