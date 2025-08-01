import { Document, UpdateResult } from 'typeorm';

export interface IBaseDataSource<T> {
  findOne(searchData: Partial<T & { _id?: string }>): Promise<T | null>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(
    search: Partial<T>,
    data: Partial<Omit<T, 'id' | '_id'>>,
  ): Promise<UpdateResult | Document>;
}
