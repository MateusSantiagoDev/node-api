import { InvalidParam } from '../../error/invalid-param-error'
import { MissingParam } from '../../error/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFilds = ['name', 'email', 'password', 'confirmPassword']
    for (const filds of requiredFilds) {
      if (!httpRequest.body[filds]) {
        return badRequest(new MissingParam(filds))
      }
    }

    const { password, email, confirmPassword } = httpRequest.body

    const invalid = this.emailValidator.isValid(email)
    if (!invalid) {
      return badRequest(new InvalidParam('email'))
    }

    if (password !== confirmPassword) {
      return badRequest(new InvalidParam(confirmPassword))
    }
  }
}
