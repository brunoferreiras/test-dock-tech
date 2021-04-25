import { Injectable } from '@nestjs/common'
import { CreatePersonDto } from './dto/create-person.dto'
import { Person } from './entities/person.entity'
import { PersonNotFound } from './exceptions/person-not-found'
import { PersonRepository } from './person.repository'
import { hash } from 'bcrypt'
import { ConfigService } from 'nestjs-config'
@Injectable()
export class PersonService {
  constructor(private readonly repository: PersonRepository) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const entity = this.repository.create(createPersonDto)
    entity.password = await hash(
      entity.password,
      ConfigService.get('bcrypt.salt')
    )

    const person = await this.repository.save(entity)
    delete person.password
    return person
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
