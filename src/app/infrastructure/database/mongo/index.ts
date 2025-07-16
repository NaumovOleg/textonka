import { AppDataSource } from './dataSource';
import { UserEntity } from './models';
import { UserRepositoryImpl } from './repositories';

const userRepositoryImpl = new UserRepositoryImpl(AppDataSource, UserEntity);

export * from './models';
export * from './repositories';
export { AppDataSource, userRepositoryImpl };
