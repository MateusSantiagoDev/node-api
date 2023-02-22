import { InvalidParam } from '../../error'
import { CompareFieldsValidation } from './compare-field-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCampare')
}
describe('CompareField Validation', () => {
  // teste para garantir que se a validação
  // falhar sera retornando um invalidParamError
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    // teste vai ser chamado se o password e o
    // confirmPassword forem diferentes
    const error = sut.validate({ field: 'any_value', fieldToCampare: 'wrong_value' })
    expect(error).toEqual(new InvalidParam('fieldToCampare'))
  })

  // se não houver falha o teste vai garantir
  // que não seja retornado nada
  test('Should not return if validation succeds', () => {
    const sut = makeSut()
    // nesse caso o validate vai ser chamado com os valores iguais
    const error = sut.validate({ field: 'any_value', fieldToCampare: 'any_value' })
    // se os valores forem iguais ele não vai retornar nada
    expect(error).toBeFalsy()
  })
})
