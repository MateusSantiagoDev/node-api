import { MissingParam } from '../../error'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredField Validation', () => {
  // teste para garantir que se a validação
  // falhar sera retornando um missingParam
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    // verificar se o campo "field" vai ser passado no validate
    const error = sut.validate({ name: 'invalid_param' })
    expect(error).toEqual(new MissingParam('field'))
  })
})
