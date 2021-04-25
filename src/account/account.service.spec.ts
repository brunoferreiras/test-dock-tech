import { Test, TestingModule } from '@nestjs/testing'
import { TransactionsService } from '../transactions/transactions.service'
import { PersonNotFound } from '../person/exceptions/person-not-found'
import { PersonService } from '../person/person.service'
import { AccountRepository } from './account.repository'
import { AccountService } from './account.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { Account } from './entities/account.entity'
import { PersonAlreadyHasAccount } from './exceptions/person-already-has-account.exception'
import { AccountNotFound } from './exceptions/account-not-found.exception'
import { AccountBlockedException } from './exceptions/account-blocked.exception'

describe('AccountService', () => {
  let service: AccountService
  let repository: AccountRepository
  let personService: PersonService
  let accountMock: Account
  let transactionsService: TransactionsService

  beforeEach(async () => {
    const repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      hasAccountType: jest.fn(),
      findOne: jest.fn()
    }
    const personServiceMock = {
      findById: jest.fn().mockReturnValue({
        id: 1
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: AccountRepository, useValue: repositoryMock },
        { provide: PersonService, useValue: personServiceMock },
        { provide: TransactionsService, useValue: { register: jest.fn() } }
      ]
    }).compile()

    service = module.get<AccountService>(AccountService)
    repository = module.get<AccountRepository>(AccountRepository)
    personService = module.get<PersonService>(PersonService)
    transactionsService = module.get<TransactionsService>(TransactionsService)

    accountMock = {
      id: 1,
      account_active: true,
      balance: 0,
      daily_withdraw_limit: 1000,
      person_id: 1,
      type: 1,
      created_at: new Date(),
      updated_at: new Date()
    }

    repository.create = jest.fn().mockReturnValue(accountMock)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should be called repository with correct params', async () => {
      const dto = accountMock as CreateAccountDto
      await service.create(dto)
      expect(repository.create).toBeCalledWith(dto)
      expect(repository.save).toBeCalledWith(accountMock)
    })

    it('should be throw PersonNotFound if personService.findById returns', async () => {
      const dto = accountMock as CreateAccountDto
      personService.findById = jest.fn().mockRejectedValue(new PersonNotFound())
      await expect(service.create(dto)).rejects.toThrow(new PersonNotFound())
    })

    it('should be throw PersonAlreadyHasAccount if person has account', async () => {
      const dto = accountMock as CreateAccountDto
      repository.hasAccountType = jest.fn().mockReturnValue(true)
      await expect(service.create(dto)).rejects.toThrow(
        new PersonAlreadyHasAccount()
      )
    })

    it('should be return when repository return', async () => {
      const dto = accountMock as CreateAccountDto
      repository.save = jest.fn().mockReturnValue(accountMock)
      repository.hasAccountType = jest.fn().mockReturnValue(false)
      expect(await service.create(dto)).toEqual(accountMock)
    })
  })

  describe('getBalance()', () => {
    it('should be called repository with correct params', async () => {
      repository.findOne = jest.fn().mockReturnValue(accountMock)
      await service.getBalance('any_id')
      expect(repository.findOne).toBeCalledWith('any_id')
    })

    it('should be throw AccountNotFound if account not exists', async () => {
      await expect(service.getBalance('any_id')).rejects.toThrow(
        new AccountNotFound()
      )
    })

    it('should be return when repository return', async () => {
      repository.findOne = jest.fn().mockReturnValue(accountMock)
      expect(await service.getBalance('any_id')).toEqual(accountMock.balance)
    })
  })

  describe('updateActiveAccount()', () => {
    it('should be called repository with correct params', async () => {
      repository.save = jest.fn().mockReturnValue(accountMock)
      repository.findOne = jest.fn().mockReturnValue(accountMock)
      await service.updateActiveAccount('any_id', false)
      expect(repository.findOne).toBeCalledWith('any_id')
    })

    it('should be throw AccountNotFound if account not exists', async () => {
      await expect(
        service.updateActiveAccount('any_id', false)
      ).rejects.toThrow(new AccountNotFound())
    })

    it('should be return false when account is active', async () => {
      repository.save = jest.fn().mockReturnValue(accountMock)
      repository.findOne = jest.fn().mockReturnValue(accountMock)
      expect(await service.updateActiveAccount('any_id', true)).toBeFalsy()
    })

    it('should be return true when account is blocked', async () => {
      repository.save = jest.fn().mockReturnValue(accountMock)
      repository.findOne = jest.fn().mockReturnValue(accountMock)
      expect(await service.updateActiveAccount('any_id', false)).toBeTruthy()
    })
  })

  describe('deposit()', () => {
    it('should be called repository with correct params', async () => {
      repository.save = jest.fn().mockReturnValue({
        ...accountMock,
        balance: 10
      })
      repository.findOne = jest.fn().mockReturnValue(accountMock)
      await service.deposit('1', 10)
      expect(repository.findOne).toBeCalledWith('1')
      expect(repository.save).toBeCalledWith({
        ...accountMock,
        balance: 10
      })
      expect(transactionsService.register).toBeCalledWith(1, 10)
    })

    it('should be throw AccountNotFound if account not exists', async () => {
      await expect(service.deposit('any_id', 10)).rejects.toThrow(
        new AccountNotFound()
      )
    })

    it('should be throw AccountBlockedException if account is blocked', async () => {
      repository.findOne = jest.fn().mockReturnValue({
        ...accountMock,
        account_active: false
      })
      await expect(service.deposit('any_id', 1)).rejects.toThrow(
        new AccountBlockedException()
      )
    })

    it('should be return when success', async () => {
      repository.save = jest.fn().mockReturnValue(accountMock)
      repository.findOne = jest.fn().mockReturnValue(accountMock)
      expect(await service.deposit('any_id', 100)).toEqual(100)
    })
  })
})
