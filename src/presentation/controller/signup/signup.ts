import { AddAccount, Controller, EmailValidator, HttpRequest, HttpResponse, Validation } from './signup-protocols'
import { InvalidParam, MissingParam } from '../../error'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation
  constructor (emailValidator: EmailValidator, addAccount: AddAccount, validation: Validation) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const requiredFilds = ['name', 'email', 'password', 'confirmPassword']
      for (const filds of requiredFilds) {
        if (!httpRequest.body[filds]) {
          return badRequest(new MissingParam(filds))
        }
      }

      const { name, password, email, confirmPassword } = httpRequest.body

      const invalid = this.emailValidator.isValid(email)
      if (!invalid) {
        return badRequest(new InvalidParam('email'))
      }

      if (password !== confirmPassword) {
        return badRequest(new InvalidParam('confirmPassword'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (err) {
      return serverError(err)
    }
  }
}
