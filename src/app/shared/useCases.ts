import { subscriptionService, userService } from '@shared/services';
import {
  CreateSubscriptionUseCase,
  CreateUserUseCase,
  FindSubscriptionUseCase,
  FindUserUseCase,
} from '@useCases';

export const createUserUC = new CreateUserUseCase(userService);
export const findUserUC = new FindUserUseCase(userService);
export const createSubscriptionUC = new CreateSubscriptionUseCase(
  subscriptionService,
);
export const findSubscriptionUC = new FindSubscriptionUseCase(
  subscriptionService,
);
