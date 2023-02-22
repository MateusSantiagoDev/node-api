export class MissingParam extends Error {
  constructor (param: string) {
    super(`Missing param: ${param}`)
    this.name = 'MissingParam'
  }
}
