import { bcryptAdapter, jwtAdapter } from '../../config'
import { UserModel } from '../../data'
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain'

export class AuthService {
  constructor() {}
  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email })
    if (existUser) throw CustomError.badRequest('email already exist')
    try {
      const user = new UserModel(registerUserDto)
      user.password = bcryptAdapter.hash(registerUserDto.password)
      const newUser = await user.save()
      const { password, ...rest } = UserEntity.fromObject(newUser)
      return rest
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
      if(!isMatch) throw CustomError.badRequest('Password is wrong')

      const { password: deletedPass, ...session } =
        UserEntity.fromObject(userFound)
      //return info del usuario y el token 'ABC'
      const token = await jwtAdapter.generateToken(session)
      if(!token) throw CustomError.internalServer('Error while creating JWT')
      
      return {
        ...session,
        token,
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
}
