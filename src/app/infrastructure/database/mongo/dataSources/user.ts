import { User } from '@util';
import { IUserDataSource } from '../../../interfaces';
import { BaseDataSource } from './base';

export class UserDatasource
  extends BaseDataSource<User>
  implements IUserDataSource<User> {}
