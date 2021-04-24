import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from 'nestjs-config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get<ConfigService>(ConfigService)

  const port: number = configService.get('app.port')
  await app.listen(port, () => {
    Logger.log(`App is running on: ${port}`)
  })
}
bootstrap().catch((e: Error) => {
  Logger.error(`Error starting server, ${e.message} - ${e.stack}`)
})
