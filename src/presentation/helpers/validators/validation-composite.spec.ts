import { MissingParam } from '../../error'
import { ValidationComposite } from './validation-composite'
import { Validation } from './validation'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface sutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeSut = (): sutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])
  return {
    sut,
    validationStub
  }
}

describe('Validation Composite', () => {
  // se algum validation interno do composite falhar
  // esse teste vai retornar o mesmo erro que o validation retornou
  test('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParam('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParam('field'))
  })
})
