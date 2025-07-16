import { Entity, Column, type ObjectId } from 'typeorm';

@Entity()
export class UserEntity {
  _id: ObjectId;

  @Column()
  name!: string;

  @Column()
  email!: string;
}
