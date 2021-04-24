import { Module } from '@nestjs/common'
import { AccountService } from './account.service'
import { AccountController } from './account.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountRepository } from './account.repository'
import { PersonModule } from '../person/person.module'
import { TransactionsModule } from 'src/transactions/transactions.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountRepository]),
    PersonModule,
    TransactionsModule
  ],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
