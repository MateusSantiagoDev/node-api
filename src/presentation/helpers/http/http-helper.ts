import { UnauthorizedError, ServerError } from '../../error'
import { HttpResponse } from '../../protocols'

export const badRequest = (err: Error): HttpResponse => ({
  statusCode: 400,
  body: err
})

export const forbidden = (err: Error): HttpResponse => ({
  statusCode: 403,
  body: err
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (err: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(err.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
