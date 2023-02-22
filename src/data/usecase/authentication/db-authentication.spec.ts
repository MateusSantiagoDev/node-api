import { AccountModel } from '../../../domain/model/account'
import { AuthenticationDto } from '../../../domain/usecase/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'
import { HashCompare } from '../../protocols/criptography/hash-compare'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeFakeAuthentication = (): AuthenticationDto => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeHashCompare = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new HashCompareStub()
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

interface sutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashCompareStub: HashCompare
}

const makeSut = (): sutTypes => {
  const hashCompareStub = makeHashCompare()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashCompareStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub
  }
}

describe('DbAuthentication UseCase', () => {
  // garantindo a integração entre o dbAuthentication e
  // o LoadAccountByEmailRepository
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    // esperando que o sut chame o loadySpy com o email correto
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  // se houver uma excessão o teste vai repassar...
  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  // se o usuário não for encontrado por email
  // o teste vai retornar null
  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockResolvedValueOnce(null)
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  // teste para validação do password
  test('Should call HashComparer with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(makeFakeAuthentication())
    // esperando que o sut chame o compareSpy com o password
    // passado pelo usuário e que esse password seja igual
    // ao password hasheado que esta no banco de dados
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })
})
