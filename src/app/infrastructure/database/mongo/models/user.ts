import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base';
import { IsNumber, IsString, IsBoolean } from 'class-validator';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column('number')
  @IsNumber()
  telegram_id: number;
  @IsBoolean()
  @Column('boolean')
  is_bot: boolean;
  @IsString()
  @Column('text')
  first_name: string;
  @IsString()
  @Column('text')
  language_code: string;
}
