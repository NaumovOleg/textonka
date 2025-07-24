import { Subscription } from '@src/app/domains/entities';
import { ISubscriptionRepository } from '../interfaces';
import { BaseRepository } from './base';

export class SubscriptionRepository
  extends BaseRepository<Subscription>
  implements ISubscriptionRepository {}
