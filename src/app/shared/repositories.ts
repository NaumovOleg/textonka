import { User } from '@entities';
import {
  AppDataSource,
  UserDatasource,
  UserEntity,
  UserRepository,
} from '@infrastructure';

const userDatasource = new UserDatasource(AppDataSource, UserEntity);

export const userRepository = new UserRepository(User, userDatasource);
