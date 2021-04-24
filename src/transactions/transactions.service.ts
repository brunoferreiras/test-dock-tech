import { Injectable } from '@nestjs/common'
import { Transaction } from './entities/transaction.entity'
import { TransactionsRepository } from './transactions.repository'
import {
  paginate,
  Pagination,
  IPaginationOptions
} from 'nestjs-typeorm-paginate'

@Injectable()
export class TransactionsService {
  constructor(private readonly repository: TransactionsRepository) {}

  async register(accountId: number, value: number): Promise<Transaction> {
    const transaction = this.repository.create({
      account_id: accountId,
      value
    })

    return await this.repository.save(transaction)
  }

  async paginate(
    accountId: number,
    options: IPaginationOptions
  ): Promise<Pagination<Transaction>> {
    return paginate<Transaction>(
      this.repository,
      {
        ...options
      },
      {
        account_id: accountId,
        order: {
          created_at: 'DESC'
        }
      }
    )
  }
}
