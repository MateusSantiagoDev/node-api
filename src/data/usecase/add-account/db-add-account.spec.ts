import { Encrypter } from '../../protocols/encrypter'
import { DbAccount } from './db-add-account'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve(value))
    }
  }
  return new EncrypterStub()
}

interface sutTypes {
  sut: DbAccount
  encrypterStub: Encrypter
}
const makeSut = (): sutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAccount(encrypterStub)
  return {
    sut,
    encrypterStub
  }
}

describe('DbAccount Usecase', () => {
  test('Should call Encypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const hashSpy = jest.spyOn(encrypterStub, 'encrypt')
    const account = {
      name: 'any_name',
      email: 'any_email',
      password: 'valid_password'
    }
    await sut.add(account)
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const account = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const promise = sut.add(account)
    await expect(promise).rejects.toThrow()
  })
})
