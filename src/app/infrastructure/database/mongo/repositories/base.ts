import {
  DataSource,
  type EntityTarget,
  type MongoRepository,
  type ObjectLiteral,
} from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> {
  private readonly repo: MongoRepository<T>;
  private readonly entity: { new (args: T): T };

  constructor(datasource: DataSource, entity: { new (): T }) {
    console.log(entity);
    this.repo = datasource.getMongoRepository(entity);
    this.entity = entity;
  }

  async findOne(id: string): Promise<T | null> {
    const response = await this.repo.findOneBy({ _id: id });
    return response?.toJson();
  }

  async create(data: T): Promise<T> {
    const entity = this.repo.create(data);
    const resp = await this.repo.save(entity);

    console.log('___+++++', data, entity, resp);

    return resp.toJson();
  }
}
