import { IsDate, validateOrReject } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

import { ObjectId } from 'mongodb';

@Entity()
export abstract class BaseEntity {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  id: string;

  @Column()
  @IsDate()
  createdAt: Date;
  @Column()
  @IsDate()
  updatedAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setUpdatedAt() {
    this.updatedAt = new Date();
    await validateOrReject(this);
  }

  constructor(data?: Partial<BaseEntity>) {
    if (data) {
      Object.assign(this, data);
      if (!this._id) {
        this._id = new ObjectId();
      }
    } else {
      this._id = new ObjectId();
    }
  }

  toJson(): Record<string, unknown> {
    const { _id, ...rest } = this;
    return { ...rest, id: _id?.toString() };
  }
}
