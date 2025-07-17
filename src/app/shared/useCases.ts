import { userService } from '@shared/services';
import { CreateUserUseCase, FindUserUseCase } from '@useCases';

export const createUserUC = new CreateUserUseCase(userService);
export const findUserUC = new FindUserUseCase(userService);
