import { User } from '@entities';
import { UserRepositoryPort } from '@src/app/domains/repositoryPorts';

export class CreateUserUseCase {
  constructor(private userRepo: UserRepositoryPort) {}

  async execute(data: Omit<User, 'id'>) {
    return await this.userRepo.create(data);
  }
}

export class FindUserUseCase {
  constructor(private userRepo: UserRepositoryPort) {}

  async execute(searchData: Partial<User>) {
    return await this.userRepo.findOne(searchData);
  }
}
