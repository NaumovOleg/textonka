import { Subscription } from '@entities';
import { ISubscriptionRepository } from '@infrastructure';
import { GENERATIONS_TYPES } from '@util';
import { BaseService } from './base';

export class SubscriptionService extends BaseService<
  Subscription,
  ISubscriptionRepository
> {
  performGeneration(type: GENERATIONS_TYPES, user: string) {
    return this.repository.performGeneration(type, user);
  }

  addGenerations(user: string, type: GENERATIONS_TYPES, count: number) {
    return this.repository.addGenerations(user, type, count);
  }
}
