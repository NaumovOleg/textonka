import { User } from '@src/app/domains/entities';
import { IUserRepository } from '../interfaces';
import { BaseRepository } from './base';

export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository {}

export class SubscriptionRepository
  extends BaseRepository<User>
  implements IUserRepository {}
