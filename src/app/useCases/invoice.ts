import { Invoice } from '@entities';
import { InvoiceService } from '@services';

export class CreateInvoiceUseCase {
  constructor(private invoiceService: InvoiceService) {}

  async execute(data: Omit<Invoice, 'id'>) {
    return this.invoiceService.create(data);
  }
}

export class FindInvoiceUseCase {
  constructor(private invoiceService: InvoiceService) {}

  async execute(searchData: Partial<Invoice>) {
    return this.invoiceService.findOne(searchData);
  }
}

export class UpdateInvoiceUseCase {
  constructor(private invoiceService: InvoiceService) {}

  async execute(
    search: Partial<Invoice>,
    data: Partial<Omit<Invoice, 'id' | '_id'>>,
  ) {
    return this.invoiceService.update(search, data);
  }
}
