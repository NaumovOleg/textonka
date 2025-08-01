import { Invoice } from '@entities';
import { IInvoiceRepository } from '../infrastructure';
import { BaseService } from './base';

export class InvoiceService extends BaseService<Invoice, IInvoiceRepository> {}
