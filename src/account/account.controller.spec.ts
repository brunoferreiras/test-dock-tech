import { Test, TestingModule } from '@nestjs/testing'
import { TransactionsRepository } from '../transactions/transactions.repository'
import { TransactionsService } from '../transactions/transactions.service'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { BlockAccountDto } from './dto/block-account.dto'
import { CreateAccountDto } from './dto/create-account.dto'
import { DepositAccountDto } from './dto/deposit-account.dto'
import { GetBankStatementDto } from './dto/get-bank-statement.dto'
import { WithdrawAccountDto } from './dto/withdraw-account.dto'

describe('AccountController', () => {
  let controller: AccountController
  let service: AccountService
  let transactionsService: TransactionsService

  beforeEach(async () => {
    const accountServiceMock = {
      create: jest.fn(),
      getBalance: jest.fn(),
      updateActiveAccount: jest.fn(),
      deposit: jest.fn(),
      withdraw: jest.fn()
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
    service = module.get(AccountService)
    transactionsService = module.get(TransactionsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should be called service with correct params', async () => {
      const dto = {
        person_id: 1,
        type: 1,
        daily_withdraw_limit: 0
      } as CreateAccountDto
      await controller.create(dto)
      expect(service.create).toBeCalledWith(dto)
      expect(service.create).toBeCalledTimes(1)
    })
  })

  describe('balance', () => {
    it('should be called service with correct params', async () => {
      await controller.balance('any_id')
      expect(service.getBalance).toBeCalledWith('any_id')
      expect(service.getBalance).toBeCalledTimes(1)
    })
  })

  describe('block', () => {
    it('should be called service with correct params', async () => {
      const dto = { block: true } as BlockAccountDto
      await controller.block('any_id', dto)
      expect(service.updateActiveAccount).toBeCalledWith('any_id', dto.block)
      expect(service.updateActiveAccount).toBeCalledTimes(1)
    })
  })

  describe('deposit', () => {
    it('should be called service with correct params', async () => {
      const dto = { value: 1 } as DepositAccountDto
      await controller.deposit('any_id', dto)
      expect(service.deposit).toBeCalledWith('any_id', dto.value)
      expect(service.deposit).toBeCalledTimes(1)
    })
  })

  describe('withdraw', () => {
    it('should be called service with correct params', async () => {
      const dto = { value: 1 } as WithdrawAccountDto
      await controller.withdraw('any_id', dto)
      expect(service.withdraw).toBeCalledWith('any_id', dto.value)
      expect(service.withdraw).toBeCalledTimes(1)
    })
  })

  describe('backStatement', () => {
    it('should be called service with correct params', async () => {
      const dto = { page: 1, limit: 10 } as GetBankStatementDto
      await controller.backStatement('1', dto)
      expect(transactionsService.paginate).toBeCalledWith(1, dto)
      expect(transactionsService.paginate).toBeCalledTimes(1)
    })
  })
})
