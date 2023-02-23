import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { LogMongoRepository } from './log-mongo-repository'

describe('Log Mongo Repository', () => {
  let errorCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  const makeSut = (): LogMongoRepository => {
    return new LogMongoRepository()
  }
  // teste para armazenar os error em uma collection
  test('Should create an error log on sucess', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    // essa linha vai retornar a quantidade de erros que tem na collection
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
