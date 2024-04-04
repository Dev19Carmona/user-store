import { CustomError } from '../errors/custom.error'

export class SessionEntity {
  constructor(
    public email: string,
    public iat: string,
    public exp: string,
  ) {}
  static fromObject(object: { [key: string]: any }) {
    const { iat, exp, email } = object
    if (!iat) throw CustomError.badRequest('Missing id')
    if (!exp) throw CustomError.badRequest('Missing name')
    if (!email) throw CustomError.badRequest('Missing email')

    return new SessionEntity(
      iat,
      exp,
      email,
    )
  }
}
