import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  },

  async compare (): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashed = jest.spyOn(bcrypt, 'hash')
    await sut.hash('valid_password')
    expect(hashed).toHaveBeenCalledWith('valid_password', salt)
  })

  test('Should return a hash on hash success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('valid_password')
    expect(hash).toEqual('hash')
  })

  test('Should throw is bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn<any, string>(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.hash('valid_password')
    await expect(promise).rejects.toThrow()
  })

  // teste para verificar se o compare do bcrypt
  // vai ser chamado com a mesma hash do compare do sut
  test('Should call campare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  // caso de sucesso
  test('Should return true when compare succeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })

  // se o becrypt retornar false o teste tbm vai retornar false
  test('Should return false when compare fails', async () => {
    const sut = makeSut()
    jest.spyOn<any, string>(bcrypt, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })

  // teste para o caso de excessão
  test('Should throw is campare throws', async () => {
    const sut = makeSut()
    jest.spyOn<any, string>(bcrypt, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.compare('any_value', 'any_hash')
    await expect(promise).rejects.toThrow()
  })
})
