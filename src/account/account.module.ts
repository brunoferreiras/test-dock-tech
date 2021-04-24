import { Module } from '@nestjs/common'
import { AccountService } from './account.service'
import { AccountController } from './account.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountRepository } from './account.repository'

@Module({
  imports: [TypeOrmModule.forFeature([AccountRepository])],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
