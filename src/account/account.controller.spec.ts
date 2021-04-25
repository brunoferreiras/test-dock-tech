import { Test, TestingModule } from '@nestjs/testing'
import { TransactionsRepository } from '../transactions/transactions.repository'
import { TransactionsService } from '../transactions/transactions.service'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'

describe('AccountController', () => {
  let controller: AccountController

  beforeEach(async () => {
    const accountServiceMock = {
      create: jest.fn()
    }
    const transactionsServiceMock = {
      paginate: jest.fn()
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: accountServiceMock
        },
        {
          provide: TransactionsService,
          useValue: transactionsServiceMock
        },
        {
          provide: TransactionsRepository,
          useValue: {
            save: jest.fn()
          }
        }
      ]
    }).compile()

    controller = module.get<AccountController>(AccountController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
