import { DataSource, type MongoRepository, type ObjectLiteral } from 'typeorm';
import { IBaseDataSource } from '../../../interfaces';

export class BaseDataSource<T extends ObjectLiteral>
  implements IBaseDataSource<T>
{
  readonly repo: MongoRepository<T>;

  constructor(datasource: DataSource, entity: { new (): T }) {
    this.repo = datasource.getMongoRepository(entity);
  }

  async findOne(searchData: Partial<T>): Promise<T | null> {
    const response = await this.repo.findOne({ where: searchData });
    return response?.toJson();
  }

  async create(data: T): Promise<T> {
    const entity = this.repo.create(data);
    const resp = await this.repo.save(entity);

    return resp.toJson();
  }
}
