export enum PRODUCT_TYPE {
  smart = 'smart',
  quick = 'quick',
}

export enum INVOICE_STATUS {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export type Invoice = {
  id: string;
  user: string;
  amount: number;
  product: PRODUCT_TYPE;
  currency: string;
  status: INVOICE_STATUS;
};
