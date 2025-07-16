import { DataSource } from 'typeorm';
import { UserEntity } from './models';
import { getMongoUrl } from '@util';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: getMongoUrl(),
  database: 'cleanarchdb',
  synchronize: true,
  logging: true,
  entities: [UserEntity],
});
