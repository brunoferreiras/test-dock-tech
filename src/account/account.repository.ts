import { EntityRepository, Repository } from 'typeorm'
import { Account } from './entities/account.entity'
import { AccountTypeEnum } from './enums/account-type.enum'

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  async hasAccountType(
    accountType: AccountTypeEnum,
    personId: number
  ): Promise<boolean> {
    const account = await this.findOne({
      where: {
        person_id: personId,
        type: accountType
      }
    })

    return account ? true : false
  }
}
