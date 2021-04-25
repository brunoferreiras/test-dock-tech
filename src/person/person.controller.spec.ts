import { Test, TestingModule } from '@nestjs/testing'
import { PersonController } from './person.controller'
import { PersonService } from './person.service'
import { CreatePersonDto } from './dto/create-person.dto'

describe('PersonController', () => {
  let controller: PersonController
  let service: PersonService

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
    service = module.get<PersonService>(PersonService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should be called repository with correct params', async () => {
      const dto = {
        cpf: '12345678911',
        birthday_date: '2020-02-20',
        password: 'any'
      } as CreatePersonDto
      await controller.create(dto)
      expect(service.create).toBeCalledWith(dto)
      expect(service.create).toBeCalledTimes(1)
    })
  })

  describe('findAll', () => {
    it('should be called repository with correct params', async () => {
      await controller.findAll()
      expect(service.findAll).toBeCalledTimes(1)
    })
  })
})
