import { User } from '@entities';
import { IBaseDataSource } from './base.dataSource';
import { IBaseRepository } from './base.repository';

export interface IUserDataSource<T> extends IBaseDataSource<T> {}

export interface IUserRepository extends IBaseRepository<User> {}
