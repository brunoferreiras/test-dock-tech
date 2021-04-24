import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('people')
export class Person {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number

  @Column()
  name: string

  @Column({
    type: 'char',
    length: 11,
    unique: true
  })
  cpf: string

  @Column()
  password: string

  @Column({
    type: 'date'
  })
  birthday_date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
