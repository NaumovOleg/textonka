import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { BaseEntity } from './base';

@Entity('sessions')
export class SessionEntity extends BaseEntity {
  @Column()
  key: string;

  @Column()
  data: any;
}
