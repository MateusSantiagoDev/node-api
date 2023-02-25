import { AddAccount, Controller, HttpRequest, HttpResponse, Validation, Authentication } from './signup-controller-protocols'
import { badRequest, serverError, ok, forbidden } from '../../../helpers/http/http-helper'
import { EmailInUseError } from '../../../error'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount, private readonly validation: Validation, private readonly authentication: Authentication) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, password, email } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const acessToken = await this.authentication.auth({
        email,
        password
      })

      return ok({ acessToken })
    } catch (err) {
      return serverError(err)
    }
  }
}
