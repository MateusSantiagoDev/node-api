import { AccountModel } from '../../../domain/model/account'
import { AccountDto, AddAccount } from '../../../domain/usecase/add-account'
import { AddAccountRepository } from '../../protocols/db/account/add-account-repository'
import { Hasher } from '../../protocols/criptography/hasher'
import { DbAccount } from './db-add-account'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

const makeFakeAccountDto = (): AccountDto => ({
  name: 'any_name',
  email: 'any_email',
  password: 'valid_password'
})

const makeAddAccountRepository = (): AddAccount => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AccountDto): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return new Promise(resolve => resolve(value))
    }
  }
  return new HasherStub()
}

interface sutTypes {
  sut: DbAccount
  HasherStub: Hasher
  addAccountRepositoryStub: AddAccount
}
const makeSut = (): sutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const HasherStub = makeHasher()
  const sut = new DbAccount(HasherStub, addAccountRepositoryStub)
  return {
    sut,
    HasherStub,
    addAccountRepositoryStub
  }
}

describe('DbAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, HasherStub } = makeSut()
    const hashSpy = jest.spyOn(HasherStub, 'hash')
    await sut.add(makeFakeAccountDto())
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, HasherStub } = makeSut()
    jest.spyOn(HasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeAccountDto())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const accountSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeAccountDto())
    expect(accountSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'valid_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeAccountDto())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on sucess', async () => {
    const { sut } = makeSut()
    const response = await sut.add(makeFakeAccountDto())
    expect(response).toEqual(makeFakeAccount())
  })
})
