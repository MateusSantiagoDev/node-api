import { InvalidParam } from '../../presentation/error'
import { Validation } from '../../presentation/protocols'

// class que vai comparar dois campos
export class CompareFieldsValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldToCompareName: string) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParam(this.fieldToCompareName)
    }
  }
}
