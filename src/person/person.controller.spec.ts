import { Test, TestingModule } from '@nestjs/testing'
import { PersonController } from './person.controller'
import { PersonService } from './person.service'

describe('PersonController', () => {
  let controller: PersonController

  beforeEach(async () => {
    const serviceMock = {
      create: jest.fn(),
      findAll: jest.fn()
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        {
          provide: PersonService,
          useValue: serviceMock
        }
      ]
    }).compile()

    controller = module.get<PersonController>(PersonController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
