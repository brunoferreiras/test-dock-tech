import { Test, TestingModule } from '@nestjs/testing'
import { CreatePersonDto } from './dto/create-person.dto'
import { Person } from './entities/person.entity'
import { PersonRepository } from './person.repository'
import { PersonService } from './person.service'
import * as bcrypt from 'bcrypt'
import { PersonNotFound } from './exceptions/person-not-found'

jest.mock('bcrypt')

describe('PersonService', () => {
  let service: PersonService
  let repository: PersonRepository
  let personMock: Person

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
    repository = module.get<PersonRepository>(PersonRepository)

    personMock = {
      id: 1,
      cpf: '12345678911',
      name: 'any_name',
      password: 'any_hash',
      birthday_date: new Date('2020-02-20'),
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create()', () => {
    it('should be called repository with correct params', async () => {
      const dto = {
        cpf: '12345678911',
        birthday_date: '2020-02-20',
        password: 'any'
      } as CreatePersonDto
      repository.create = jest.fn().mockReturnValue(personMock)
      repository.save = jest.fn().mockReturnValue({
        ...personMock,
        password: 'any_hash'
      })
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('any_hash')
      await service.create(dto)
      expect(repository.create).toBeCalledWith(dto)
      expect(repository.save).toBeCalledWith({
        ...personMock,
        password: 'any_hash'
      })
    })

    it('should be return when repository return', async () => {
      const dto = {
        cpf: '12345678911',
        birthday_date: '2020-02-20',
        password: 'any'
      } as CreatePersonDto
      repository.create = jest.fn().mockReturnValue({
        ...personMock,
        password: 'any_hash'
      })
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('any_hash')
      repository.save = jest.fn().mockReturnValue(personMock)
      expect(await service.create(dto)).toEqual(personMock)
    })
  })

  describe('findById()', () => {
    it('should be called repository with correct params', async () => {
      repository.findOne = jest.fn().mockReturnValue(personMock)
      await service.findById(1)
      expect(repository.findOne).toBeCalledWith(1)
    })

    it('should be throw PersonNotFound if person not exists', async () => {
      repository.findOne = jest.fn().mockReturnValue(undefined)
      await expect(service.findById(1)).rejects.toThrow(new PersonNotFound())
    })

    it('should be return when repository return', async () => {
      repository.findOne = jest.fn().mockReturnValue(personMock)
      expect(await service.findById(1)).toEqual(personMock)
    })
  })

  describe('findAll()', () => {
    it('should be return when repository return', async () => {
      repository.find = jest.fn().mockReturnValue([personMock])
      expect(await service.findAll()).toEqual([personMock])
    })
  })
})
