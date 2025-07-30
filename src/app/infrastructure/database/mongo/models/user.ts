import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column('number')
  @IsNumber()
  @Index('telegram_id', { unique: true })
  telegram_id: number;
  @IsBoolean()
  @Column('boolean')
  is_bot: boolean;
  @IsString()
  @Column('text')
  first_name: string;
  @IsString()
  @Column('text', { nullable: true })
  language_code?: string;
  @IsString()
  @Column('text', { nullable: true })
  added_to_attachment_menu?: boolean;
  @IsString()
  @Column('text', { nullable: true })
  username?: string;
  @IsString()
  @Column('text', { nullable: true })
  is_premium?: boolean;
  @IsString()
  @Column('text', { nullable: true })
  last_name?: string;
}
