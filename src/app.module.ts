import { Module } from '@nestjs/common'
import * as path from 'path'
import { ConfigModule, ConfigService } from 'nestjs-config'
import { PersonModule } from './person/person.module'
import { BootstrapModule } from './bootstrap.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountModule } from './account/account.module'
import { TransactionsModule } from './transactions/transactions.module'

ConfigService.rootPath = path.resolve(__dirname, '..')

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database').getConfig()
    }),
    PersonModule,
    BootstrapModule,
    AccountModule,
    TransactionsModule
  ]
})
export class AppModule {}
