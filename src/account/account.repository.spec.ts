import { Test, TestingModule } from '@nestjs/testing'
import { AccountRepository } from './account.repository'
import { Account } from './entities/account.entity'

describe('AccountRepository', () => {
  let repository: AccountRepository
  let accountMock: Account

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountRepository]
    }).compile()

    repository = module.get<AccountRepository>(AccountRepository)
    repository.findOne = jest.fn().mockReturnValue({})
    accountMock = {
      id: 1,
      account_active: true,
      balance: 100,
      daily_withdraw_limit: 1000,
      person_id: 1,
      type: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  describe('hasAccountType()', () => {
    it('should be called findOne with correct params', async () => {
      await repository.hasAccountType(1, 1)
      expect(repository.findOne).toBeCalledWith({
        where: {
          person_id: 1,
          type: 1
        }
      })
      expect(repository.findOne).toBeCalledTimes(1)
    })

    it('should be return true when findOne return', async () => {
      repository.findOne = jest.fn().mockReturnValue(accountMock)
      expect(await repository.hasAccountType(1, 1)).toBeTruthy()
    })

    it('should be return false when findOne not return', async () => {
      repository.findOne = jest.fn().mockReturnValue(undefined)
      expect(await repository.hasAccountType(1, 1)).toBeFalsy()
    })
  })
})
