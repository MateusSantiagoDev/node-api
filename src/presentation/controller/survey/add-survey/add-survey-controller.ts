import { Controller, HttpRequest, HttpResponse, Validation } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httprequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httprequest.body)
    return new Promise(resolve => resolve(null))
  }
}
