import { UserService } from '@services';
import { userRepository } from '@shared/repositories';

export const userService = new UserService(userRepository);
