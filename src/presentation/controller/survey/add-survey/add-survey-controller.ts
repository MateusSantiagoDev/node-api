import { badRequest } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httprequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httprequest.body)
    if (error) {
      return badRequest(error)
    }
    return new Promise(resolve => resolve(null))
  }
}
