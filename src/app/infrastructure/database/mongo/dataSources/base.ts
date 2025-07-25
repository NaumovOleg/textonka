import { deepParseObjectId } from '@util';
import { DataSource, type MongoRepository, type ObjectLiteral } from 'typeorm';
import { IBaseDataSource } from '../../../interfaces';

export class BaseDataSource<T extends ObjectLiteral, E extends ObjectLiteral>
  implements IBaseDataSource<T>
{
  readonly repo: MongoRepository<E>;
  entity: { new (...args: any[]): E };

  constructor(datasource: DataSource, entity: { new (...args: any[]): E }) {
    this.repo = datasource.getMongoRepository(entity);
    this.entity = entity;
  }

  async findOne(searchData: Partial<T>): Promise<T | null> {
    const response = await this.repo.findOne({
      where: deepParseObjectId(searchData),
    });
    return response?.toJson();
  }

  async create(data: T): Promise<T> {
    const newData = new this.entity(data);
    const entity = this.repo.create(newData);
    const resp = await this.repo.save(entity);

    return resp.toJson();
  }
}
