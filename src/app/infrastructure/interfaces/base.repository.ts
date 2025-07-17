export interface IBaseRepository<T> {
  findOne(searchData: Partial<T>): Promise<T | null>;
  create(data: Omit<T, 'id'>): Promise<T>;
}
