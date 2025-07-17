import { userRepository } from '@infrastructure';
import { UserService } from '@services';
import { CreateUserUseCase, FindUserUseCase } from './user';

const userService = new UserService(userRepository);

export const createUserUC = new CreateUserUseCase(userService);
export const findUserUC = new FindUserUseCase(userService);
