import { Injectable } from '@nestjs/common'
import { PersonService } from '../person/person.service'
import { AccountRepository } from './account.repository'
import { CreateAccountDto } from './dto/create-account.dto'
import { Account } from './entities/account.entity'
import { AccountTypeEnum } from './enums/account-type.enum'
import { AccountNotFound } from './exceptions/account-not-found.exception'
import { PersonAlreadyHasAccount } from './exceptions/person-already-has-account.exception'

@Injectable()
export class AccountService {
  constructor(
    private readonly repository: AccountRepository,
    private readonly personService: PersonService
  ) {}

  async isCanCreateAccount(
    accountType: AccountTypeEnum,
    personId: number
  ): Promise<boolean> {
    const hasAccount = await this.repository.hasAccountType(
      accountType,
      personId
    )
    if (hasAccount) {
      throw new PersonAlreadyHasAccount()
    }

    return true
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = this.repository.create({
      ...createAccountDto,
      balance: 0,
      account_active: true
    })
    const person = await this.personService.findById(account.person_id)

    await this.isCanCreateAccount(account.type, person.id)

    return await this.repository.save(account)
  }

  async getBalance(id: string): Promise<number> {
    const account = await this.repository.findOne(id)

    if (!account) {
      throw new AccountNotFound()
    }

    return account.balance
  }

  async updateActiveAccount(id: string, active: boolean): Promise<boolean> {
    const account = await this.repository.findOne(id)

    if (!account) {
      throw new AccountNotFound()
    }

    account.account_active = !active

    const updated = await this.repository.save(account)

    return updated.account_active
  }
}
