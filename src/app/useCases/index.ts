import { CreateUserUseCase, FindUserUseCase } from './user';
import { userRepositoryImpl } from '@infrastructure';

export const createUserUC = new CreateUserUseCase(userRepositoryImpl);
export const findUserUC = new FindUserUseCase(userRepositoryImpl);
