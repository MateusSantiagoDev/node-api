import { MissingParam } from '../../error'
import { ValidationComposite } from './validation-composite'
import { Validation } from '../../protocols/validation'

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
  validationStubs: Validation[]
}

const makeSut = (): sutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  // se algum validation interno do composite falhar
  // esse teste vai retornar o mesmo erro que o validation retornou
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParam('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParam('field'))
  })

  // nesse caso se as duas dependencias retornarem erro
  // o teste vai garantir que o erro retornado é o da primeira
  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParam('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  // se não tiver falha não será retornado nenhum erro
  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
