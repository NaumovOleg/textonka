import { Invoice } from '@util';
import { IInvoiceDataSource } from '../../../interfaces';
import { InvoiceEntity } from '../models';
import { BaseDataSource } from './base';

export class InvoiceDatasource
  extends BaseDataSource<Invoice, InvoiceEntity>
  implements IInvoiceDataSource<Invoice> {}
