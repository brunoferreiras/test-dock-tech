import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import { AccountService } from './account.service'
import { BlockAccountDto } from './dto/block-account.dto'
import { CreateAccountDto } from './dto/create-account.dto'

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

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
}
