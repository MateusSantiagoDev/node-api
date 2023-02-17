import { MongoHelper as sut } from './mongo-helper'
// importando assim por não ser uma class

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  // teste para garantir que se o mongodb perder a conexão
  // ele vai ser reconectado
  test('Should recconect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy() // espero q ele exista
    await sut.disconnect()
    // se desconnectar espero que ao reconectar
    // o accountCollection exista
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
