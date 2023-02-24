import { MissingParam } from '../../presentation/error'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}
describe('RequiredField Validation', () => {
  // teste para garantir que se a validação
  // falhar sera retornando um missingParam
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    // verificar se o campo "field" vai ser passado no validate
    const error = sut.validate({ name: 'invalid_param' })
    expect(error).toEqual(new MissingParam('field'))
  })

  // se não houver falha o teste vai garantir
  // que não seja retornado nada
  test('Should not return if validation succeds', () => {
    const sut = makeSut()
    // nesse caso o validate vai ser chamado com um field
    const error = sut.validate({ field: 'any_param' })
    // se ele tiver um field ele não vai retornar nada
    expect(error).toBeFalsy()
  })
})
