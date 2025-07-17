import { UserT } from '@util';
import { IUserDataSource } from '../../../interfaces';
import { BaseDataSource } from './base';

export class UserDatasource
  extends BaseDataSource<UserT>
  implements IUserDataSource<UserT> {}
