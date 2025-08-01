import { Invoice } from '@entities';
import { IInvoiceDataSource, IInvoiceRepository } from '../interfaces';
import { BaseRepository } from './base';

export class InvoiceRepository
  extends BaseRepository<Invoice, IInvoiceDataSource<Invoice>>
  implements IInvoiceRepository {}
