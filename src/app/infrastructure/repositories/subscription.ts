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

  decreaseLeftPostWizardGenerations(user: string) {
    return this.dataSource.decreaseLeftPostWizardGenerations(user);
  }

  increasePostWizardGenerations(user: string) {
    return this.dataSource.increasePostWizardGenerations(user);
  }
}
