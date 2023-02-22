import { MissingParam } from '../../error'
import { ValidationComposite } from './validation-composite'
import { Validation } from './validation'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return new MissingParam('field')
    }
  }
  return new ValidationStub()
}

const makeSut = (): ValidationComposite => {
  return new ValidationComposite([makeValidation()])
}

describe('Validation Composite', () => {
  // se algum validation interno do composite falhar
  // esse teste vai retornar o mesmo erro que o validation retornou
  test('Should return an error if any validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParam('field'))
  })
})
