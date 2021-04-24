import { Test, TestingModule } from '@nestjs/testing'
import { TransactionsRepository } from './transactions.repository'
import { TransactionsService } from './transactions.service'

describe('TransactionsService', () => {
  let service: TransactionsService

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
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
