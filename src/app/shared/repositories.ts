import { Invoice, Subscription, User } from '@entities';
import {
  AppDataSource,
  InvoiceDatasource,
  InvoiceEntity,
  InvoiceRepository,
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
const invoiceDatasource = new InvoiceDatasource(AppDataSource, InvoiceEntity);

export const userRepository = new UserRepository(User, userDatasource);
export const subscriptionRepository = new SubscriptionRepository(
  Subscription,
  subscriptionDatasource,
);
export const invoiceRepository = new InvoiceRepository(
  Invoice,
  invoiceDatasource,
);
