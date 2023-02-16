export class MissingParam extends Error {
  constructor (param: string) {
    super(`Invalid param: ${param}`)
    this.name = 'MissingParam'
  }
}
