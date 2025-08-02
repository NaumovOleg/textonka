import { PACKAGES } from './product';

export enum INVOICE_STATUS {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export type Invoice = {
  id: string;
  user: string;
  amount: number;
  product: PACKAGES;
  currency: string;
  status: INVOICE_STATUS;
  count: number;
};
