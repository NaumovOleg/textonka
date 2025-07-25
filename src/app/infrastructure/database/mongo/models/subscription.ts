import Config from '@conf';
import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base';

class AvailableGenerations {
  @IsNumber()
  @Column('number', { default: Config.POST_WIZARD_FREE_GENERATIONS })
  postWizard: number;
}
class UsedGenerations {
  @IsNumber()
  @Column('number', { default: 0 })
  postWizard: number;
}

@Entity('subscription')
export class SubscriptionEntity extends BaseEntity {
  @Column('text')
  @IsString()
  @Index('user')
  user: string;
  @Column(() => AvailableGenerations, { array: false })
  @ValidateNested({ each: true })
  @Type(() => AvailableGenerations)
  availableGenerations: AvailableGenerations;
  @Column(() => UsedGenerations, { array: false })
  @ValidateNested({ each: true })
  @Type(() => UsedGenerations)
  usedGenerations: UsedGenerations;
}
