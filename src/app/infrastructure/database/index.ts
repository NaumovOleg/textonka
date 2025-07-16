import { AppDataSource } from './mongo/dataSource';
import { UserEntity } from './mongo/models';
import { UserRepositoryImpl } from './mongo/repositories';

const userRepository = new UserRepositoryImpl(AppDataSource, UserEntity);

export { userRepository };

export default AppDataSource;
