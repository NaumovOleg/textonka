import { UserRepositoryPort } from '@repositories_ports';
import { User } from '@entities';
import { UserEntity } from '../models';
import { AppDataSource } from '../dataSource';
import { BaseRepository } from './base';

export class UserRepositoryImpl
  extends BaseRepository<User>
  implements UserRepositoryPort {}
