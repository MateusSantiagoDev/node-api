import { SignUpController } from '../../../presentation/controller/signup/signup'
import { DbAccount } from '../../../data/usecase/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { MakeSignUpValidation } from './signup-validation'

export const MakeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAccount = new DbAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAccount, MakeSignUpValidation())
  const logoMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logoMongoRepository)
}
