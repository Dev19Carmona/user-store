import { Validators } from "../../../config"

export class ProductCreateDto {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly isAvailable: boolean,
    public readonly user: string,
    public readonly category: string
  ) {}
  static create(props: { [key: string]: any }): [string?, ProductCreateDto?] {
    const { name, description, price, isAvailable, user, category } = props
    
    if (!name) return ['Missing name']
    if (!user) return ['Missing user']
    if (!category) return ['Missing category']
    if (user && !Validators.isMongoId(user.id)) return ['Invalid user']
    if (category && !Validators.isMongoId(category)) return ['Invalid category']

    return [
      undefined,
      new ProductCreateDto(
        name,
        description,
        price,
        !!isAvailable,
        user.id,
        category
      ),
    ]
  }
}
