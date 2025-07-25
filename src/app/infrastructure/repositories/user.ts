import { User } from '@src/app/domains/entities';
import { IUserDataSource, IUserRepository } from '../interfaces';
import { BaseRepository } from './base';

export class UserRepository
  extends BaseRepository<User, IUserDataSource<User>>
  implements IUserRepository {}
