import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
  //TODO Server
  PORT: get('PORT').required().asPortNumber(),
  WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),
  VALIDATE_EMAIL_URL: get('VALIDATE_EMAIL_URL').required().asString(),

  //TODO Database
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),

  //TODO JWT
  JWT_SEED: get('JWT_SEED').required().asString(),

  //TODO Nodemailer
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
  SEND_EMAIL: get('SEND_EMAIL').default('false').asBool(),

  //TODO Session
  SESSION_TTL: get('SESSION_TTL').required().asString(),
}
