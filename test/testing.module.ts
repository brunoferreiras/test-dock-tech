import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'account',
      password: 'account',
      database: 'e2e_test',
      entities: ['./**/*.entity.ts'],
      synchronize: true
    })
  ]
})
export class TestingModule {}
