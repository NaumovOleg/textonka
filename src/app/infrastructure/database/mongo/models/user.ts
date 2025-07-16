import { Entity, Column, PrimaryColumn, ObjectIdColumn } from 'typeorm';
import { BaseEntity } from './base';

import { ObjectId } from 'mongodb';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;
}
