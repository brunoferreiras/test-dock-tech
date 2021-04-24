import { Test, TestingModule } from '@nestjs/testing'
import { TransactionsRepository } from './transactions.repository'

describe('TransactionsRepository', () => {
  let repository: TransactionsRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsRepository]
    }).compile()

    repository = module.get<TransactionsRepository>(TransactionsRepository)
    repository.save = jest.fn()
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })
})
