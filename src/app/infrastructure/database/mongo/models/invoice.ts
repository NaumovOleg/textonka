import { INVOICE_STATUS, PRODUCT_TYPE } from '@util';
import { IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base';

@Entity('invoice')
export class InvoiceEntity extends BaseEntity {
  @Column('text')
  @IsString()
  @Index('user')
  user: ObjectId;

  @Column('number')
  @IsNumber()
  amount: number;

  @Column('number')
  @IsString()
  currency: string;

  @Column({
    array: false,
    enum: INVOICE_STATUS,
    default: INVOICE_STATUS.PENDING,
  })
  status: INVOICE_STATUS;

  @Column({
    array: false,
    enum: PRODUCT_TYPE,
  })
  product: PRODUCT_TYPE;
}
