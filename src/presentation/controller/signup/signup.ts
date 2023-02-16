import { AddAccount } from '../../../domain/usecase/add-account'
import { InvalidParam } from '../../error/invalid-param-error'
import { MissingParam } from '../../error/missing-param-error'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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
      return serverError()
    }
  }
}
