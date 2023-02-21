import { MissingParam } from '../../error'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httprequest: HttpRequest): Promise<HttpResponse> {
    const requiredFilds = ['email', 'password']
    for (const filds of requiredFilds) {
      if (!httprequest.body[filds]) {
        return new Promise(resolve => resolve(badRequest(new MissingParam(filds))))
      }
    }
  }
}
