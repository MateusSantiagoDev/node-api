import { InvalidParam } from '../../error'
import { EmailValidator } from '../../protocols/email-validator'
import { Validation } from '../../protocols/validation'

// class que vai validar o email
export class EmailValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly emailValidator: EmailValidator) {}

  validate (input: any): Error {
    const invalid = this.emailValidator.isValid(input[this.fieldName])
    if (!invalid) {
      return new InvalidParam(this.fieldName)
    }
  }
}
