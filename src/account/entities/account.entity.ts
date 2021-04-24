import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { AccountTypeEnum } from '../enums/account-type.enum'

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number

  @Column({
    type: 'bigint'
  })
  person_id: number

  @Column({
    type: 'money'
  })
  balance: number

  @Column({
    type: 'money',
    unsigned: true
  })
  daily_withdraw_limit: number

  @Column({
    type: 'bool'
  })
  account_active: boolean

  @Column({
    type: 'enum',
    enum: AccountTypeEnum
  })
  type: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
