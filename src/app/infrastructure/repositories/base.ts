import { IBaseDataSource } from '../interfaces';

export class BaseRepository<T, D extends IBaseDataSource<T>> {
  protected entity: { new (...args: T[]): T };
  protected dataSource: D;

  constructor(entity: { new (...args: T[]): T }, dataSource: D) {
    this.entity = entity;
    this.dataSource = dataSource;
  }

  async create(user: Omit<T, 'id'>) {
    const response = await this.dataSource.create(user);
    return response && new this.entity(response);
  }

  async findOne(searchData: Partial<T & { _id?: string }>) {
    const response = await this.dataSource.findOne(searchData);
    return response && new this.entity(response);
  }
}
