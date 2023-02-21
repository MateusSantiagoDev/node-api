import { InvalidParam, MissingParam } from '../../error'
import { badRequest, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../../protocols/email-validator'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httprequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFilds = ['email', 'password']
      for (const filds of requiredFilds) {
        if (!httprequest.body[filds]) {
          return new Promise(resolve => resolve(badRequest(new MissingParam(filds))))
        }
      }
      const isValid = this.emailValidator.isValid(httprequest.body.email)
      if (!isValid) {
        return new Promise(resolve => resolve(badRequest(new InvalidParam('email'))))
      }
    } catch (err) {
      return serverError(err)
    }
  }
}
