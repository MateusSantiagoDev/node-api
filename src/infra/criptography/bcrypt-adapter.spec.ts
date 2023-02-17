import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashed = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('valid_password')
    expect(hashed).toHaveBeenCalledWith('valid_password', salt)
  })

  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('valid_password')
    expect(hash).toEqual('hash')
  })

  test('Should throw is bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn<any, string>(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.encrypt('valid_password')
    await expect(promise).rejects.toThrow()
  })
})
