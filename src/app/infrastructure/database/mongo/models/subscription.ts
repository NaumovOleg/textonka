import Config from '@conf';
import { plainToInstance, Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base';

class AvailableGenerations {
  @IsNumber()
  @Column('number', { default: Config.SMART_WIZARD_FREE_GENERATIONS })
  smartWizard: number;

  @IsNumber()
  @Column('number', { default: Config.QUICK_WIZARD_FREE_GENERATIONS })
  quickWizard: number;
}
class UsedGenerations {
  @IsNumber()
  @Column('number', { default: 0 })
  smartWizard: number;

  @IsNumber()
  @Column('number', { default: 0 })
  quickWizard: number;
}

@Entity('subscription')
export class SubscriptionEntity extends BaseEntity {
  @Column('text')
  @Index('user', { unique: true })
  user: ObjectId;
  @Column(() => AvailableGenerations, { array: false })
  @ValidateNested({ each: true })
  @Type(() => AvailableGenerations)
  availableGenerations: AvailableGenerations;
  @Column(() => UsedGenerations, { array: false })
  @ValidateNested({ each: true })
  @Type(() => UsedGenerations)
  usedGenerations: UsedGenerations;

  constructor(data?: Partial<SubscriptionEntity>) {
    console.log('subscription dataa', data);
    super(data);
    if (data?.user) {
      this.user = new ObjectId(data.user);
    }

    if (data?.availableGenerations) {
      this.availableGenerations = plainToInstance(
        AvailableGenerations,
        data.availableGenerations,
      );
    }

    if (data?.usedGenerations) {
      this.usedGenerations = plainToInstance(
        UsedGenerations,
        data.usedGenerations,
      );
    }
  }
}
