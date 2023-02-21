import { LoginController } from './login'
import { badRequest } from '../../helpers/http-helper'
import { MissingParam } from '../../error/missing-param-error'

const makeSut = (): LoginController => {
  return new LoginController()
}

describe('Login Controller', () => {
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
})
