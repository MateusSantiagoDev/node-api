import { MakeSignUpValidation } from './signup-validation-factory'
import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'
import { EmailValidator } from '../../../../validation/protocols/email-validator'

// estou mocando o modulo do validationComposite
jest.mock('../../../../validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

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
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
