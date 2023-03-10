import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => resolve('any_token'))
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JWT Adapter', () => {
  // teste para garantir a integração correta
  // entre as duas bibliotecas
  test('Should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  // teste de sucesso garantindo que o retorno do jwt é o mesmo do sut
  test('Should return a token on sign success', async () => {
    const sut = makeSut()
    const acessToken = await sut.encrypt('any_id')
    expect(acessToken).toBe('any_token')
  })

  // teste de excessão
  test('Should throw if sign throws', async () => {
    const sut = makeSut()
    jest.spyOn<any, string>(jwt, 'sign').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.encrypt('any_id')
    await expect(promise).rejects.toThrow()
  })
})
