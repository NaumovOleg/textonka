import { Column, Entity, Index } from 'typeorm';

import { BaseEntity } from './base';

@Entity('sessions')
export class SessionEntity extends BaseEntity {
  @Column()
  @Index('key')
  key: string;
  @Column()
  data: object;
}
