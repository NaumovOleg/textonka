import {
  Generations,
  MakeOptional,
  Subscription as SubscriptionT,
} from '@util';

export class Subscription {
  id: string;
  user: string;
  availableGenerations: Generations;
  usedGenerations: Generations;

  constructor(
    data: MakeOptional<
      SubscriptionT,
      'availableGenerations' | 'usedGenerations'
    >,
  ) {
    this.id = data.id;
    this.user = data.user;
    if (data.availableGenerations) {
      this.availableGenerations = data.availableGenerations;
    }
    if (data.usedGenerations) {
      this.usedGenerations = data.usedGenerations;
    }
  }
}
