import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PersonService } from '../person/person.service'
import { AccountRepository } from './account.repository'
import { CreateAccountDto } from './dto/create-account.dto'
import { Account } from './entities/account.entity'
import { AccountTypeEnum } from './enums/account-type.enum'
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
    if (!person) {
      throw new InternalServerErrorException()
    }

    const isCan = await this.isCanCreateAccount(account.type, person.id)

    if (!isCan) {
      throw new InternalServerErrorException()
    }

    return await this.repository.save(account)
  }
}
