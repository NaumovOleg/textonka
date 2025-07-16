import { UserRepositoryPort } from '@repositories_ports';
import { User } from '@entities';
import { BaseRepository } from './base';

export class UserRepositoryImpl
  extends BaseRepository<User>
  implements UserRepositoryPort {}
