import { HtmlEmailAdapter, bcryptAdapter, envs, jwtAdapter } from '../../config'
import { UserModel } from '../../data'
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain'
import { EmailService } from './email.service'
interface Payload {
  email: string
  iat: number
  exp: number
}
export class AuthService {
  constructor(private readonly emailService: EmailService) {}
  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email })
    if (existUser) throw CustomError.badRequest('email already exist')
    try {
      const user = new UserModel(registerUserDto)
      user.password = bcryptAdapter.hash(registerUserDto.password)
      const newUser = await user.save()
      this.sendEmailValidationLink(user.email)
      const { password, ...rest } = UserEntity.fromObject(newUser)

      const token = await jwtAdapter.generateToken(rest)
      if (!token) throw CustomError.internalServer('Error while creating JWT')

      return {
        user: rest,
        token,
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
  public async loginUser(loginUserDto: LoginUserDto) {
    //Variables
    const { email, password } = loginUserDto
    //si existe el usuario
    try {
      const userFound = await UserModel.findOne({ email })
      if (!userFound) throw CustomError.badRequest('Email is wrong')
      const { password: hashedPass } = userFound
      // isMatch... compare
      const isMatch = bcryptAdapter.compare(password, hashedPass)
      if (!isMatch) throw CustomError.badRequest('Password is wrong')

      const { password: deletedPass, ...session } =
        UserEntity.fromObject(userFound)
      //return info del usuario y el token 'ABC'
      const token = await jwtAdapter.generateToken(
        { id: session.id },
        envs.SESSION_TTL
      )
      if (!token) throw CustomError.internalServer('Error while creating JWT')

      return {
        ...session,
        token,
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
  public async validateEmail(token: string) {
    const payload = await jwtAdapter.validateToken(token)
    if (!payload) {
      return HtmlEmailAdapter.htmlValidatedEmailFailure()
    }
    const { email, exp, iat } = payload as Payload
    if (!email) throw CustomError.internalServer('Email not in token')
    const user = await UserModel.findOne({ email })
    if (!user) throw CustomError.internalServer('User not found')
    user.emailValidated = true
    await user.save()
    return HtmlEmailAdapter.htmlValidatedEmailSuccess()
  }
  private sendEmailValidationLink = async (email: string) => {
    const token = await jwtAdapter.generateToken({ email })
    if (!token) throw CustomError.internalServer('Error getting token')
    const link = `${envs.WEBSERVICE_URL}/${envs.VALIDATE_EMAIL_URL}/${token}`
  console.log({link});
  
    const html = HtmlEmailAdapter.htmlValidateEmail(link)
    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html,
    }
    const isSent = await this.emailService.sendEmail(options)
    
    if (!isSent) throw CustomError.internalServer('Error sending email')

    return isSent
  }
}
