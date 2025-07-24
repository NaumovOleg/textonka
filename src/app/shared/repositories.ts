import { Subscription, User } from '@entities';
import {
  AppDataSource,
  SubscriptionDatasource,
  SubscriptionEntity,
  SubscriptionRepository,
  UserDatasource,
  UserEntity,
  UserRepository,
} from '@infrastructure';

const userDatasource = new UserDatasource(AppDataSource, UserEntity);

const subscriptionDatasource = new SubscriptionDatasource(
  AppDataSource,
  SubscriptionEntity,
);

export const userRepository = new UserRepository(User, userDatasource);
export const subscriptionRepository = new SubscriptionRepository(
  Subscription,
  subscriptionDatasource,
);
