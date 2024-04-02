import jwt from 'jsonwebtoken'
import { envs } from './envs'

export class jwtAdapter {
  constructor() {}
  static async generateToken(
    payload: { [key: string]: any },
    duration: string = '2h'
  ) {
    return new Promise((resolve) => {
      jwt.sign(payload, envs.JWT_SEED, { expiresIn: duration }, (err, token) => {
        if(err) return resolve(null)
        resolve(token)
      })
    })
  }

  static validateToken(token: string) {
    //TODO validate
  }
}
