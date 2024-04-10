import { CustomError } from '../errors/custom.error'

export class ProductEntity {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public isAvailable: boolean,
    public user: string,
    public category: string
  ) {}
  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, description, price, isAvailable, user, category } =
      object
    if (!id && !_id) throw CustomError.badRequest('Missing id')
    if (!name) throw CustomError.badRequest('Missing name')
    if (!user) throw CustomError.badRequest('Missing user')
    if (!category) throw CustomError.badRequest('Missing category')
    if (typeof isAvailable !== 'boolean')
      throw CustomError.badRequest('Missing available')
    
    return new ProductEntity(
      _id || id,
      name,
      description,
      price,
      isAvailable,
      user,
      category
    )
  }
}
