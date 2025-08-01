import { getMongoUrl } from '@util';
import { DataSource } from 'typeorm';
import {
  InvoiceEntity,
  SessionEntity,
  SubscriptionEntity,
  UserEntity,
} from './models';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: getMongoUrl(),
  database: 'cleanarchdb',
  synchronize: true,
  logging: true,
  entities: [UserEntity, SessionEntity, SubscriptionEntity, InvoiceEntity],
});
