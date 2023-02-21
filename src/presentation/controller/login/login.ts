import { InvalidParam, MissingParam } from '../../error'
import { badRequest, serverError, unauthorized } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../../protocols/email-validator'
import { Authentication } from '../../../domain/usecase/authentication'

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
    } catch (err) {
      return serverError(err)
    }
  }
}
