import { MissingParam } from '../../error'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../../protocols/email-validator'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httprequest: HttpRequest): Promise<HttpResponse> {
    const requiredFilds = ['email', 'password']
    for (const filds of requiredFilds) {
      if (!httprequest.body[filds]) {
        return new Promise(resolve => resolve(badRequest(new MissingParam(filds))))
      }
    }
    this.emailValidator.isValid(httprequest.body.email)
  }
}
