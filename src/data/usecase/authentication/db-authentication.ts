import { Authentication, AuthenticationDto } from '../../../domain/usecase/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (authentication: AuthenticationDto): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return null
  }
}
