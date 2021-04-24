import { Module } from '@nestjs/common'
import { PersonService } from './person.service'
import { PersonController } from './person.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PersonRepository } from './person.repository'

@Module({
  imports: [TypeOrmModule.forFeature([PersonRepository])],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService]
})
export class PersonModule {}
