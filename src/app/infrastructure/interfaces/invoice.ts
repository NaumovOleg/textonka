import { Invoice } from '@entities';
import { IBaseDataSource } from './base.dataSource';
import { IBaseRepository } from './base.repository';

export interface IInvoiceDataSource<T> extends IBaseDataSource<T> {}

export interface IInvoiceRepository extends IBaseRepository<Invoice> {}
