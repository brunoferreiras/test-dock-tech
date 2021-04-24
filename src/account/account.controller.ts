import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { AccountService } from './account.service'
import { CreateAccountDto } from './dto/create-account.dto'

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountService.create(createAccountDto)
  }

  @Get(':id/balance')
  async balance(@Param('id') id: string) {
    return {
      balance: await this.accountService.getBalance(id)
    }
  }
}
