import { Test, TestingModule } from '@nestjs/testing'
import { PersonRepository } from './person.repository'
import { PersonService } from './person.service'

describe('PersonService', () => {
  let service: PersonService

  beforeEach(async () => {
    const repositoryMock = {
      save: jest.fn(),
      create: jest.fn()
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        { provide: PersonRepository, useValue: repositoryMock }
      ]
    }).compile()

    service = module.get<PersonService>(PersonService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
