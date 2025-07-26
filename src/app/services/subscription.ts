import { Subscription } from '@entities';
import { ISubscriptionRepository } from '@infrastructure';
import { BaseService } from './base';

export class SubscriptionService extends BaseService<
  Subscription,
  ISubscriptionRepository
> {
  decreaseLeftSmartWizardGenerations(user: string) {
    return this.repository.decreaseLeftSmartWizardGenerations(user);
  }

  increaseSmartWizardGenerations(user: string) {
    return this.repository.increaseSmartWizardGenerations(user);
  }
}
