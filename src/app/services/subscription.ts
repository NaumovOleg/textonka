import { Subscription } from '@entities';
import { ISubscriptionRepository } from '@infrastructure';
import { BaseService } from './base';

export class SubscriptionService extends BaseService<
  Subscription,
  ISubscriptionRepository
> {
  decreaseGenerationCount(user: string) {
    return this.repository.decreaseGenerationCount(user);
  }
}
