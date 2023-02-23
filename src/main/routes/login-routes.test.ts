import request from 'supertest'
import app from '../config/app'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

let accountCollection: Collection
describe('Login Router', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Mateus',
          email: 'mateus_test@email.com',
          password: '1234',
          confirmPassword: '1234'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      // simulando o registro do banco de dados
      const password = await hash('1234', 12)
      await accountCollection.insertOne({
        name: 'Mateus',
        email: 'mateus_test@email.com',
        password
      })
      await request(app)
      // simulando a busca de um registro valido no banco de dados
        .post('/api/login')
        .send({
          email: 'mateus_test@email.com',
          password: '1234'
        })
        .expect(200)
    })
  })
})
