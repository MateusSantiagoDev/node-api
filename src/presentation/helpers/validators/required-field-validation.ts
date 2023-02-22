import { MissingParam } from '../../error'
import { Validation } from '../../protocols/validation'

// class que vai verificar se determinado parametro existe
export class RequiredFieldValidation implements Validation {
  private readonly fieldName: string
  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  // se o parametro não existir retorna o erro
  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParam(this.fieldName)
    }
  }
}
