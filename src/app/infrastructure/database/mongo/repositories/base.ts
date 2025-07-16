import {
  DataSource,
  type EntityTarget,
  type MongoRepository,
  type ObjectLiteral,
} from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> {
  private readonly repo: MongoRepository<T>;
  private readonly entity: EntityTarget<T>;

  constructor(datasource: DataSource, entity: EntityTarget<T>) {
    this.repo = datasource.getMongoRepository(entity);
  }

  async findOne(id: string): Promise<T | null> {
    const response = await this.repo.findOneBy({ _id: id });
    return response?.toJson();
  }

  async create(data: T): Promise<T> {
    const response = await this.repo.create(data);
    return response?.toJson();
  }
}
