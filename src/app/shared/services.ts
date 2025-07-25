import { AiService, SubscriptionService, UserService } from '@services';
import { subscriptionRepository, userRepository } from '@shared/repositories';

export const userService = new UserService(userRepository);
export const subscriptionService = new SubscriptionService(
  subscriptionRepository,
);
export const aiService = new AiService();
