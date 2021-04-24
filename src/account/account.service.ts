import { Injectable } from '@nestjs/common'
import { AccountRepository } from './account.repository'
import { CreateAccountDto } from './dto/create-account.dto'

@Injectable()
export class AccountService {
  constructor(private readonly repository: AccountRepository) {}
  create(createAccountDto: CreateAccountDto) {
    console.log('CREATE ACCOUNT => ', createAccountDto)
    return 'This action adds a new account'
  }
}
