import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  HttpCode,
  HttpStatus,
  Query,
  ParseIntPipe,
  HostParam
} from '@nestjs/common'
import { Transaction } from '../transactions/entities/transaction.entity'
import { AccountService } from './account.service'
import { BlockAccountDto } from './dto/block-account.dto'
import { CreateAccountDto } from './dto/create-account.dto'
import { DepositAccountDto } from './dto/deposit-account.dto'
import { WithdrawAccountDto } from './dto/withdraw-account.dto'
import { Pagination } from 'nestjs-typeorm-paginate'
import { TransactionsService } from 'src/transactions/transactions.service'

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly transactionsService: TransactionsService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountService.create(createAccountDto)
  }

  @Get(':id/balance')
  async balance(@Param('id') id: string) {
    return {
      balance: await this.accountService.getBalance(id)
    }
  }

  @Patch(':id/block')
  async block(
    @Param('id') id: string,
    @Body() blockAccountDto: BlockAccountDto
  ) {
    return {
      account_active: await this.accountService.updateActiveAccount(
        id,
        blockAccountDto.block
      )
    }
  }

  @Patch(':id/deposit')
  async deposit(
    @Param('id') id: string,
    @Body() depositAccountDto: DepositAccountDto
  ) {
    return {
      balance: await this.accountService.deposit(id, depositAccountDto.value)
    }
  }

  @Patch(':id/withdraw')
  async withdraw(
    @Param('id') id: string,
    @Body() withdrawAccountDto: WithdrawAccountDto
  ) {
    return {
      balance: await this.accountService.withdraw(id, withdrawAccountDto.value)
    }
  }

  @Get(':id/bank_statement')
  async backStatement(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @HostParam() hosts: string
  ): Promise<Pagination<Transaction>> {
    limit = limit > 100 ? 100 : limit
    return await this.transactionsService.paginate(+id, {
      page,
      limit
    })
  }
}
