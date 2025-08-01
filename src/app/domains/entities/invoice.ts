import { INVOICE_STATUS, PRODUCT_TYPE, type Invoice as InvoiceT } from '@util';

export class Invoice {
  id: string;
  user: string;
  amount: number;
  product: PRODUCT_TYPE;
  currency: string;
  status: INVOICE_STATUS;

  constructor(data: InvoiceT) {
    this.id = data.id;
    this.user = data.user;
    this.amount = data.amount;
    this.product = data.product;
    this.currency = data.currency;
    this.status = data.status;
  }
}
