import { IUserDataSource } from '../interfaces';

export class BaseRepository<T> {
  constructor(
    private entity: { new (...args: T[]): T },
    private userDataSource: IUserDataSource<T>,
  ) {}

  async create(user: Omit<T, 'id'>) {
    const response = await this.userDataSource.create(user);
    return response && new this.entity(response);
  }

  async findOne(searchData: Partial<T>) {
    const response = await this.userDataSource.findOne(searchData);
    return response && new this.entity(response);
  }
}
