import { InvalidParam } from '../../error'
import { Validation } from '../../protocols/validation'

// class que vai comparar dois campos
export class CompareFieldsValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldToCompareName: string) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParam(this.fieldToCompareName)
    }
  }
}
