import { UserRepositoryPort } from '@src/app/domains/repositoryPorts';
import { User } from '@entities';

export class CreateUserUseCase {
  constructor(private userRepo: UserRepositoryPort) {}

  async execute(name: string, email: string): Promise<User> {
    return await this.userRepo.create({ name, email });
  }
}

export class FindUserUseCase {
  constructor(private userRepo: UserRepositoryPort) {}

  async execute(name: string, email: string): Promise<User> {
    return await this.userRepo.create({ name, email });
  }
}
