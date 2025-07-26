import Config from '@conf';
import { Subscription } from '@entities';
import { SubscriptionService } from '@services';

export class CreateSubscriptionUseCase {
  constructor(private subscriptionService: SubscriptionService) {}

  async execute(
    data: Omit<Subscription, 'id' | 'availableGenerations' | 'usedGenerations'>,
  ) {
    return await this.subscriptionService.create({
      ...data,
      availableGenerations: {
        smartWizard: Config.SMART_WIZARD_FREE_GENERATIONS,
      },
      usedGenerations: { smartWizard: 0 },
    });
  }
}

export class FindSubscriptionUseCase {
  constructor(private subscriptionService: SubscriptionService) {}

  async execute(searchData: Partial<Subscription>) {
    return await this.subscriptionService.findOne(searchData);
  }
}
