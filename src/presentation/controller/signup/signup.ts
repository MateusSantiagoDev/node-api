import { MissingParam } from '../../error/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class SignUpController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFilds = ['name', 'email', 'password', 'confirmPassword']
    for (const filds of requiredFilds) {
      if (!httpRequest.body[filds]) {
        return badRequest(new MissingParam(filds))
      }
    }
  }
}
