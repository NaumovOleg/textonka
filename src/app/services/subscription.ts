import { Subscription } from '@entities';
import { ISubscriptionRepository } from '@infrastructure';
import { GENERATIONS_TYPES } from '@util';
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

  addGenerations(user: string, type: GENERATIONS_TYPES, count: number) {
    return this.repository.addGenerations(user, type, count);
  }
}
