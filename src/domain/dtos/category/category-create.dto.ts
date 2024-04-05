import { regularExps } from "../../../config"

export class CategoryCreateDto {
  private constructor(
    public readonly name: string,
    public readonly available: string
  ) {}
  static create(object: { [key: string]: any }): [string?, CategoryCreateDto?] {
    const { email, password } = object
    if (!email) return ['Missing email']
    if (!regularExps.email.test(email)) return ['Email is not valid']
    if (!password) return ['Missing password']
    return [undefined, new CategoryCreateDto(email ,password)]
  }
}
