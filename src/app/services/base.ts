import { IBaseRepository } from '@infrastructure';

export abstract class BaseService<T> {
  constructor(private repository: IBaseRepository<T>) {}

  create(data: Omit<T, 'id'>) {
    return this.repository.create(data);
  }

  findOne(data: Partial<T>) {
    return this.repository.findOne(data);
  }
}
