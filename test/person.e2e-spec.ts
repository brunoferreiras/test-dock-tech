import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { PersonModule } from '../src/person/person.module'
import { PersonService } from '../src/person/person.service'
import { TestLogger } from './helpers/test-logger'
import { PersonRepository } from '../src/person/person.repository'
import { TestingModule } from './testing.module'

describe('Person', () => {
  let app: INestApplication
  let personService: PersonService
  let repository: PersonRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PersonModule, TestingModule]
    }).compile()

    app = moduleRef.createNestApplication()
    personService = moduleRef.get<PersonService>(PersonService)
    repository = moduleRef.get<PersonRepository>(PersonRepository)
    app.setGlobalPrefix('api/v1')
    app.useLogger(new TestLogger())
    await app.init()
  })

  afterEach(async () => {
    await repository.query('DELETE FROM people;')
  })

  describe('/GET /api/v1/person', () => {
    it('should be return people list', async () => {
      const personOne = {
        name: 'any_name_1',
        cpf: '12345678911',
        birthday_date: '2020-01-20',
        password: '123'
      }
      const personTwo = {
        name: 'any_name_2',
        cpf: '12345678912',
        birthday_date: '2020-01-20',
        password: '123'
      }
      await repository.save([personOne, personTwo])

      const { body } = await request(app.getHttpServer())
        .get('/api/v1/person')
        .expect('Content-Type', /json/)
        .expect(200)
      expect(body).toEqual([
        {
          id: expect.any(Number),
          ...personOne,
          created_at: expect.any(String),
          updated_at: expect.any(String)
        },
        {
          id: expect.any(Number),
          ...personTwo,
          created_at: expect.any(String),
          updated_at: expect.any(String)
        }
      ])
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
