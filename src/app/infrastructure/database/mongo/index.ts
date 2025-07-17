import { AppDataSource } from './dataSource';
import { UserDatasource } from './dataSources';
import { UserEntity } from './models';

const userDatasource = new UserDatasource(AppDataSource, UserEntity);

export * from './dataSources';
export * from './models';
export { AppDataSource, userDatasource };
