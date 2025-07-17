import { User } from '@entities';
import { UserService } from '@services';

export class CreateUserUseCase {
  constructor(private userService: UserService) {}

  async execute(data: Omit<User, 'id'>) {
    return await this.userService.create(data);
  }
}

export class FindUserUseCase {
  constructor(private userRepo: UserService) {}

  async execute(searchData: Partial<User>) {
    return await this.userRepo.findOne(searchData);
  }
}
