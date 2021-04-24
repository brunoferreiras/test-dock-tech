import { Controller, Get, Post, Body } from '@nestjs/common'
import { PersonService } from './person.service'
import { CreatePersonDto } from './dto/create-person.dto'

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto)
  }

  @Get()
  findAll() {
    return this.personService.findAll()
  }
}
