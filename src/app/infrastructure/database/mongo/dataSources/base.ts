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
    if (searchData.id) {
      Object.assign(searchData, { _id: searchData.id });
    }
    const response = await this.repo.findOne({
      where: deepParseObjectId(searchData),
    });
    return response?.toJson();
  }

  async create(data: T): Promise<T> {
    const resp = await this.repo.save(new this.entity(data));

    return resp.toJson();
  }

  update(search: Partial<T>, data: Partial<Omit<T, 'id' | '_id'>>) {
    const { id, ...criteria } = search;
    id && Object.assign(criteria ?? {}, { _id: id });

    return this.repo.updateOne(deepParseObjectId(criteria), {
      $set: deepParseObjectId(data),
    });
  }
}
