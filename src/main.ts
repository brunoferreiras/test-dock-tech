import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from 'nestjs-config'
import { getConnection } from 'typeorm'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get<ConfigService>(ConfigService)

  // Check database connect
  const connection = getConnection()
  const { isConnected } = connection
  isConnected
    ? Logger.log(`🌨️  Database connected`)
    : Logger.error(`❌  Database connect error`)

  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  // Add prefix global
  app.setGlobalPrefix('api/v1')

  const port: number = configService.get('app.port')
  await app.listen(port, () => {
    Logger.log(`App is running on: ${port}`)
  })
}
bootstrap().catch((e: Error) => {
  Logger.error(`Error starting server, ${e.message} - ${e.stack}`)
})
