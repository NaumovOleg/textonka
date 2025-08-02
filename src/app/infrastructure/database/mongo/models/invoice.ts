import { INVOICE_STATUS, PACKAGES } from '@util';
import { IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base';

@Entity('invoice')
export class InvoiceEntity extends BaseEntity {
  @Column('text')
  @Index('user')
  user: ObjectId;

  @Column('number')
  @IsNumber()
  amount: number;

  @Column('number')
  @IsNumber()
  count: number;

  @Column('number')
  @IsString()
  currency: string;

  @Column({
    array: false,
    enum: INVOICE_STATUS,
    default: INVOICE_STATUS.PENDING,
  })
  status: INVOICE_STATUS;

  @Column({ array: false, enum: PACKAGES })
  product: PACKAGES;

  constructor(data?: Partial<InvoiceEntity>) {
    super(data);
    if (data?.user) {
      this.user = new ObjectId(data.user);
    }
  }
}
