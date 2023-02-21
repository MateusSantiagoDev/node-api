import { InvalidParam, MissingParam } from '../../error'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, EmailValidator, Authentication } from './login-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication
  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httprequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFilds = ['email', 'password']
      for (const filds of requiredFilds) {
        if (!httprequest.body[filds]) {
          return badRequest(new MissingParam(filds))
        }
      }

      const { email, password } = httprequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParam('email'))
      }

      const acessToken = await this.authentication.auth(email, password)
      if (!acessToken) {
        return unauthorized()
      }
      return ok({ acessToken })
    } catch (err) {
      return serverError(err)
    }
  }
}
