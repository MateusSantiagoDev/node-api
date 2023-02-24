import { AccountModel, AccountDto, AddAccount, AddAccountRepository, Hasher, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAccount implements AddAccount {
  constructor (private readonly hasher: Hasher, private readonly addAccountRepository: AddAccountRepository, private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async add (accountData: AccountDto): Promise<AccountModel> {
    // se o email passado pelo usuário não existir ele cria
    // uma conta nova, se o email existir ele retorna null
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      return await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    }
    return null
  }
}
