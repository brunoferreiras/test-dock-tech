import * as path from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule } from 'nestjs-config'

const ENV =
  process.env.NODE_ENV !== 'development' ? process.env.NODE_ENV : false

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, 'config', '**/!(*.d).config.{ts,js}'),
      {
        modifyConfigName: (name) => name.replace('.config', ''),
        path: path.resolve(process.cwd(), !ENV ? '.env' : `.env.${ENV}`)
      }
    )
  ]
})
export class BootstrapModule {}
