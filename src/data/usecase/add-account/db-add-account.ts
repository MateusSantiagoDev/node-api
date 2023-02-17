import { AccountModel } from '../../../domain/model/account'
import { AccountDto, AddAccount } from '../../../domain/usecase/add-account'
import { Encrypter } from '../../protocols/encrypter'

export class DbAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (accountData: AccountDto): Promise<AccountModel> {
    await this.encrypter.encrypt(accountData.password)
    return null
  }
}
