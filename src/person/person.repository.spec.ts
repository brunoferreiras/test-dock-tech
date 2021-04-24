import { Test, TestingModule } from '@nestjs/testing'
import { PersonRepository } from './person.repository'

describe('PersonRepository', () => {
  let repository: PersonRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonRepository]
    }).compile()

    repository = module.get<PersonRepository>(PersonRepository)
    repository.save = jest.fn()
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })
})
