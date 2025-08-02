import { INVOICE_STATUS, PACKAGES, type Invoice as InvoiceT } from '@util';

export class Invoice {
  id: string;
  user: string;
  amount: number;
  product: PACKAGES;
  currency: string;
  status: INVOICE_STATUS;
  count: number;

  constructor(data: InvoiceT) {
    this.id = data.id;
    this.user = data.user;
    this.amount = data.amount;
    this.product = data.product;
    this.currency = data.currency;
    this.status = data.status;
    this.count = data.count;
  }
}
