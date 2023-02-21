import { LoginController } from './login'
import { badRequest } from '../../helpers/http-helper'
import { MissingParam } from '../../error/missing-param-error'

const makeSut = (): LoginController => {
  return new LoginController()
}

describe('Login Controller', () => {
  // testando a rota de login
  // nese teste esta sendo verificado o caso do não
  // envio de email pelo usuário
  test('Should return 400 if no email is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParam('email')))
  })
  // nesse caso teste para verificar se não foi enviado o password
  test('Should return 400 if no password is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParam('password')))
  })
})
