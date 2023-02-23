import { AccountModel, AccountDto, AddAccount, AddAccountRepository, Hasher } from './db-add-account-protocols'

export class DbAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepository: AddAccountRepository
  constructor (hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AccountDto): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    return await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
  }
}
