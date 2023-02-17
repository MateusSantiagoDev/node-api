import { AccountModel } from '../../../domain/model/account'
import { AccountDto, AddAccount } from '../../../domain/usecase/add-account'
import { AddAccountRepository } from '../../protocols/add-account-repository'
import { Encrypter } from '../../protocols/encrypter'
import { DbAccount } from './db-add-account'

const makeAddAccountRepository = (): AddAccount => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AccountDto): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password'
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

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
  addAccountRepositoryStub: AddAccount
}
const makeSut = (): sutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const encrypterStub = makeEncrypter()
  const sut = new DbAccount(encrypterStub, addAccountRepositoryStub)
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
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

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const accountSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(account)
    expect(accountSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    })
  })

  test('Should throw if AddAccount throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const account = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const promise = sut.add(account)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on sucess', async () => {
    const { sut } = makeSut()
    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const response = await sut.add(account)
    expect(response).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    })
  })
})
