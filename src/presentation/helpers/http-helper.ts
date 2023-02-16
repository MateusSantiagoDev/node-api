import { ServerError } from '../error/server-error'
import { HttpResponse } from '../protocols'

export const badRequest = (err: Error): HttpResponse => ({
  statusCode: 400,
  body: err
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const ok = (data: string): HttpResponse => ({
  statusCode: 200,
  body: data
})
