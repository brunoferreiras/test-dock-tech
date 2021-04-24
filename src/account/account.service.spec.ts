import { Test, TestingModule } from '@nestjs/testing'
import { PersonNotFound } from '../person/exceptions/person-not-found'
import { PersonService } from '../person/person.service'
import { AccountRepository } from './account.repository'
import { AccountService } from './account.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { Account } from './entities/account.entity'
import { PersonAlreadyHasAccount } from './exceptions/person-already-has-account.exception'

describe('AccountService', () => {
  let service: AccountService
  let repository: AccountRepository
  let personService: PersonService
  let accountMock: Account

  beforeEach(async () => {
    const repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      hasAccountType: jest.fn()
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
        { provide: PersonService, useValue: personServiceMock }
      ]
    }).compile()

    service = module.get<AccountService>(AccountService)
    repository = module.get<AccountRepository>(AccountRepository)
    personService = module.get<PersonService>(PersonService)

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
})
