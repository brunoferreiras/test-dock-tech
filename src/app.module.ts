import { Module } from '@nestjs/common'
import * as path from 'path'
import { ConfigService } from 'nestjs-config'
import { PersonModule } from './person/person.module'
import { BootstrapModule } from './bootstrap.module'

ConfigService.rootPath = path.resolve(__dirname, '..')

@Module({
  imports: [PersonModule, BootstrapModule]
})
export class AppModule {}
