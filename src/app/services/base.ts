import { IBaseRepository } from '@infrastructure';

export abstract class BaseService<T, R extends IBaseRepository<T>> {
  constructor(public repository: R) {}

  create(data: Omit<T, 'id'>) {
    return this.repository.create(data);
  }

  findOne(data: Partial<T & { _id?: string }>) {
    return this.repository.findOne(data);
  }

  update(
    search: Partial<T & { _id?: string }>,
    data: Partial<Omit<T, 'id' | '_id'>>,
  ) {
    return this.repository.update(search, data);
  }
}
