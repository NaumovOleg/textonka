import { Entity, Column, PrimaryColumn, ObjectIdColumn } from 'typeorm';

import { ObjectId } from 'mongodb';

@Entity()
export abstract class BaseEntity {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();

  id: string;

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

  toJson(): Record<string, any> {
    const { _id, ...rest } = this;
    return { ...rest, id: _id?.toString() };
  }
}
