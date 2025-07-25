import { User } from '@entities';
import { IUserRepository } from '../infrastructure';
import { BaseService } from './base';

export class UserService extends BaseService<User, IUserRepository> {}
