import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TransactionsRepository } from './transactions.repository'
import { TransactionsService } from './transactions.service'

@Module({
  imports: [TypeOrmModule.forFeature([TransactionsRepository])],
  providers: [TransactionsService],
  exports: [TransactionsService]
})
export class TransactionsModule {}
