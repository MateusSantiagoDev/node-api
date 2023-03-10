import { MissingParam } from '../../presentation/error'
import { Validation } from '../../presentation/protocols'

// class que vai verificar se determinado parametro existe
export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  // se o parametro não existir retorna o erro
  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParam(this.fieldName)
    }
  }
}
