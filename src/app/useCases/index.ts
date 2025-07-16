import { userRepositoryImpl } from '@infrastructure';
import { CreateUserUseCase, FindUserUseCase } from './user';

export const createUserUC = new CreateUserUseCase(userRepositoryImpl);
export const findUserUC = new FindUserUseCase(userRepositoryImpl);
