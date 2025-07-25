import { User } from '@util';
import { IUserDataSource } from '../../../interfaces';
import { UserEntity } from '../models';
import { BaseDataSource } from './base';

export class UserDatasource
  extends BaseDataSource<User, UserEntity>
  implements IUserDataSource<User> {}
