import { Injectable } from '@nestjs/common'
import { AccountTypeEnum } from 'src/account/enums/account-type.enum'
import { CreatePersonDto } from './dto/create-person.dto'
import { Person } from './entities/person.entity'
import { PersonNotFound } from './exceptions/person-not-found'
import { PersonRepository } from './person.repository'

@Injectable()
export class PersonService {
  constructor(private readonly repository: PersonRepository) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const entity = this.repository.create(createPersonDto)
    return await this.repository.save(entity)
  }

  async findById(id: number): Promise<Person> {
    const person = await this.repository.findOne(id)
    if (!person) {
      throw new PersonNotFound()
    }

    return person
  }

  async findAll(): Promise<Person[]> {
    return await this.repository.find()
  }
}
