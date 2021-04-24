import { Injectable } from '@nestjs/common'
import { Transaction } from '../transactions/entities/transaction.entity'
import { TransactionsService } from '../transactions/transactions.service'
import { PersonService } from '../person/person.service'
import { AccountRepository } from './account.repository'
import { CreateAccountDto } from './dto/create-account.dto'
import { Account } from './entities/account.entity'
import { AccountTypeEnum } from './enums/account-type.enum'
import { AccountBlockedException } from './exceptions/account-blocked.exception'
import { AccountNotFound } from './exceptions/account-not-found.exception'
import { InsufficientMoneyException } from './exceptions/insufficient-money.exception'
import { PersonAlreadyHasAccount } from './exceptions/person-already-has-account.exception'

@Injectable()
export class AccountService {
  constructor(
    private readonly repository: AccountRepository,
    private readonly personService: PersonService,
    private readonly transactionsService: TransactionsService
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
    const account = await this.getAccount(id)
    return account.balance
  }

  private async getAccount(id: string): Promise<Account> {
    const account = await this.repository.findOne(id)

    if (!account) {
      throw new AccountNotFound()
    }

    return account
  }

  async updateActiveAccount(id: string, active: boolean): Promise<boolean> {
    const account = await this.getAccount(id)

    account.account_active = !active

    const updated = await this.repository.save(account)

    return updated.account_active
  }

  private verifyAccountBlocked(account: Account): void {
    if (!account.account_active) {
      throw new AccountBlockedException()
    }
  }

  async deposit(id: string, value: number): Promise<number> {
    const account = await this.getAccount(id)
    this.verifyAccountBlocked(account)
    account.balance = +account.balance + value
    const updated = await this.repository.save(account)
    await this.transactionsService.register(+id, value)
    return updated.balance
  }

  async withdraw(id: string, value: number): Promise<number> {
    const account = await this.getAccount(id)
    this.verifyAccountBlocked(account)
    if (+account.balance < value) {
      throw new InsufficientMoneyException()
    }
    account.balance = +account.balance - value
    const updated = await this.repository.save(account)
    await this.transactionsService.register(+id, -value)
    return updated.balance
  }
}
