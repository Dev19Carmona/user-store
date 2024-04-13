import { regularExps } from '../../../config'
import { rolList } from '../../../data'

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: string[]
  ) {}
  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object
    let role = ['USER_ROLE']
    rolList.forEach(data=>{
      if(data.email === email){
        role = data.role
      }
    })
    if (!name) return ['Missing Name']
    if (!email) return ['Missing email']
    if (!regularExps.email.test(email)) return ['Email is not valid']
    if (!password) return ['Missing password']
    return [undefined, new RegisterUserDto(name, email ,password, role)]
  }
}
