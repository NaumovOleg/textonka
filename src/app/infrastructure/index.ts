import { User } from '@entities';
import { userDatasource } from './database';
import { UserRepository } from './repositories';
export * from './database';
export * from './interfaces';
export * from './repositories';

export const userRepository = new UserRepository(User, userDatasource);
