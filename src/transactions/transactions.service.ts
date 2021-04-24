import { Injectable } from '@nestjs/common'
import { Transaction } from './entities/transaction.entity'
import { TransactionsRepository } from './transactions.repository'
import {
  paginate,
  Pagination,
  IPaginationOptions
} from 'nestjs-typeorm-paginate'
import { Between, FindManyOptions } from 'typeorm'
import * as dayjs from 'dayjs'
import { GetBankStatementDto } from 'src/account/dto/get-bank-statement.dto'

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
    getBankStatementDto: GetBankStatementDto
  ): Promise<Pagination<Transaction>> {
    const optionsSearch: FindManyOptions<Transaction> = {
      where: {
        account_id: accountId
      },
      order: {
        created_at: 'DESC'
      }
    }

    if (getBankStatementDto?.start_date && getBankStatementDto?.end_date) {
      const startDate = dayjs(getBankStatementDto?.start_date, {
        utc: true
      }).startOf('day')
      const endDate = dayjs(getBankStatementDto?.end_date, { utc: true }).endOf(
        'day'
      )
      optionsSearch.where['created_at'] = Between(startDate, endDate)
    }

    return paginate<Transaction>(
      this.repository,
      {
        page: getBankStatementDto.page,
        limit: getBankStatementDto.limit
      },
      optionsSearch
    )
  }
}
