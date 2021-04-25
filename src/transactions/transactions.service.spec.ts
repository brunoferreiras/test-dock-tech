import { Test, TestingModule } from '@nestjs/testing'
import { Transaction } from './entities/transaction.entity'
import { TransactionsRepository } from './transactions.repository'
import { TransactionsService } from './transactions.service'
import { GetBankStatementDto } from '../account/dto/get-bank-statement.dto'
import { paginate, Pagination } from 'nestjs-typeorm-paginate'
import { Between } from 'typeorm'
import * as dayjs from 'dayjs'

jest.mock('nestjs-typeorm-paginate')

describe('TransactionsService', () => {
  let service: TransactionsService
  let repository: TransactionsRepository
  let transactionMock: Transaction

  beforeEach(async () => {
    const repositoryMock = {
      create: jest.fn(),
      save: jest.fn()
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: TransactionsRepository, useValue: repositoryMock }
      ]
    }).compile()

    service = module.get<TransactionsService>(TransactionsService)
    repository = module.get<TransactionsRepository>(TransactionsRepository)

    transactionMock = {
      id: 1,
      value: 10,
      account_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('register()', () => {
    it('should be called repository with correct params', async () => {
      repository.create = jest.fn().mockReturnValue(transactionMock)
      await service.register(1, 10)
      expect(repository.create).toBeCalledWith({
        account_id: 1,
        value: 10
      })
      expect(repository.save).toBeCalledWith(transactionMock)
    })
  })

  describe('paginate()', () => {
    it('should be called repository with correct params', async () => {
      const dto = { page: 1, limit: 10 } as GetBankStatementDto
      const optionsSearch = {
        where: { account_id: 1 },
        order: { created_at: 'DESC' }
      }
      repository.create = jest.fn().mockReturnValue(transactionMock)
      await service.paginate(1, dto)
      expect(paginate).toBeCalledWith(
        repository,
        { page: 1, limit: 10 },
        optionsSearch
      )

      dto.page = 2
      dto.limit = 100

      await service.paginate(1, dto)
      expect(paginate).toBeCalledWith(
        repository,
        { page: 2, limit: 100 },
        optionsSearch
      )
    })

    it('should be filter by period if options exists', async () => {
      const dto = {
        page: 1,
        limit: 10,
        start_date: '2021-04-23',
        end_date: '2021-04-24'
      } as GetBankStatementDto
      const optionsSearch = {
        where: {
          account_id: 1,
          created_at: Between(
            dayjs('2021-04-23', { utc: true }).startOf('day'),
            dayjs('2021-04-24', { utc: true }).endOf('day')
          )
        },
        order: { created_at: 'DESC' }
      }
      repository.create = jest.fn().mockReturnValue(transactionMock)
      await service.paginate(1, dto)
      expect(paginate).toBeCalledWith(
        repository,
        { page: 1, limit: 10 },
        optionsSearch
      )
    })

    it('should not be filter by period only startDate exists', async () => {
      const dto = {
        page: 1,
        limit: 10,
        start_date: '2021-04-23'
      } as GetBankStatementDto
      const optionsSearch = {
        where: {
          account_id: 1
        },
        order: { created_at: 'DESC' }
      }
      repository.create = jest.fn().mockReturnValue(transactionMock)
      await service.paginate(1, dto)
      expect(paginate).toBeCalledWith(
        repository,
        { page: 1, limit: 10 },
        optionsSearch
      )
    })

    it('should not be filter by period only endDate exists', async () => {
      const dto = {
        page: 1,
        limit: 10,
        end_date: '2021-04-23'
      } as GetBankStatementDto
      const optionsSearch = {
        where: {
          account_id: 1
        },
        order: { created_at: 'DESC' }
      }
      repository.create = jest.fn().mockReturnValue(transactionMock)
      await service.paginate(1, dto)
      expect(paginate).toBeCalledWith(
        repository,
        { page: 1, limit: 10 },
        optionsSearch
      )
    })
  })
})
