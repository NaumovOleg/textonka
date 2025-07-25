import { Subscription } from '@entities';
import { ISubscriptionRepository } from '@infrastructure';
import { BaseService } from './base';

export class SubscriptionService extends BaseService<
  Subscription,
  ISubscriptionRepository
> {
  decreaseLeftPostWizardGenerations(user: string) {
    return this.repository.decreaseLeftPostWizardGenerations(user);
  }

  increasePostWizardGenerations(user: string) {
    return this.repository.increasePostWizardGenerations(user);
  }
}
