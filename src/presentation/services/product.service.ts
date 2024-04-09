import { ProductModel } from '../../data/mongo/models'
import { CustomError, UserEntity } from '../../domain'
import { ProductCreateDto } from '../../domain/dtos/product/product-create.dto'
import { PaginationResponseDto } from '../../domain/dtos/shared/pagination-response.dto'
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto'
import { ProductEntity } from '../../domain/entities/product.entity'

interface GetProductsResponse {
  pagination: PaginationDto
  products: ProductEntity[]
}

export class ProductService {
  constructor() {}
  public async createProduct(createProductDto: ProductCreateDto) {
    try {
      const productExists = await ProductModel.findOne({
        name: createProductDto.name,
      }).lean()

      if (productExists) throw CustomError.badRequest('Product already exists')

      const product = new ProductModel(createProductDto)
      const newProduct = await product.save()
      return ProductEntity.fromObject(newProduct)
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
  public async getProducts(
    paginationDto: PaginationDto
  ): Promise<GetProductsResponse> {
    try {
      const { page, limit } = paginationDto
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          // .populate('user')
          // .populate('category'),
      ])
      console.log(products);
      
      const [error, paginationResponde] = PaginationResponseDto.create({
        page,
        limit,
        total,
        endpoint: 'product',
      })
      if (error) throw CustomError.badRequest(`${error}`)
      return {
        pagination: paginationResponde!,
        products: products.map((product) => ProductEntity.fromObject(product)),
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
}
