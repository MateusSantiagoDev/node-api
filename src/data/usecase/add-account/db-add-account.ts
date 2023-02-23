import { AccountModel, AccountDto, AddAccount, AddAccountRepository, Hasher } from './db-add-account-protocols'

export class DbAccount implements AddAccount {
  constructor (private readonly hasher: Hasher, private readonly addAccountRepository: AddAccountRepository) {}

  async add (accountData: AccountDto): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    return await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
  }
}
