import { MakeSignUpValidation } from './signup-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation-composite'
import { Validation } from '../../presentation/helpers/validators/validation'
import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-field-validation'

// estou mocando o modulo do validationComposite
jest.mock('../../presentation/helpers/validators/validation-composite')

describe('SignUpValidator Factory', () => {
  // garantir que o validation composite vai ser chamado
  test('Should call validationComposite with all validations', () => {
    MakeSignUpValidation()
    // garantindo que o composite não vai deixar
    // de injetar nenhuma validação
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'confirmPassword']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldsValidation('password', 'confirmPassword'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
