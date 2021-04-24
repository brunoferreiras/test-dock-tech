import { Injectable } from '@nestjs/common'
import { CreatePersonDto } from './dto/create-person.dto'
import { Person } from './entities/person.entity'
import { PersonRepository } from './person.repository'

@Injectable()
export class PersonService {
  constructor(private readonly repository: PersonRepository) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const entity = this.repository.create(createPersonDto)
    return await this.repository.save(entity)
  }

  async findAll(): Promise<Person[]> {
    return await this.repository.find()
  }
}
