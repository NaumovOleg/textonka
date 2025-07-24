import { Subscription } from '@util';
import { IUserDataSource } from '../../../interfaces';
import { BaseDataSource } from './base';

export class SubscriptionDatasource
  extends BaseDataSource<Subscription>
  implements IUserDataSource<Subscription> {}
