import { User } from '@entities';
import { IUserDataSource, IUserRepository } from '../interfaces';
import { BaseRepository } from './base';

export class UserRepository
  extends BaseRepository<User, IUserDataSource<User>>
  implements IUserRepository {}
