import { CategoryModel } from '../../data/mongo/models'
import { CustomError, UserEntity } from '../../domain'
import { CategoryCreateDto } from '../../domain/dtos/category/category-create.dto'
import { PaginationResponseDto } from '../../domain/dtos/shared/pagination-response.dto'
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto'
import { CategoryEntity } from '../../domain/entities'

interface GetCategoriesResponse {
  pagination: PaginationDto
  categories: CategoryEntity[]
}
export class CategoryService {
  constructor() {}
  public async createCategory(
    createCategoryDto: CategoryCreateDto,
    user: UserEntity
  ) {
    try {
      const categoryExists = await CategoryModel.findOne({
        name: createCategoryDto.name,
      }).lean()

      if (categoryExists)
        throw CustomError.badRequest('Category already exists')

      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      })
      const newCategory = await category.save()

      return CategoryEntity.fromObject(newCategory)
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
  public async getCategories(
    paginationDto: PaginationDto
  ): Promise<GetCategoriesResponse> {
    try {
      const { page, limit } = paginationDto
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('user')
          ,
      ])
      const [error, paginationResponde] = PaginationResponseDto.create({
        page,
        limit,
        total,
        endpoint: 'category',
      })
      if (error) throw CustomError.badRequest(`${error}`)
      return {
        pagination: paginationResponde!,
        categories: categories.map((category) =>
          CategoryEntity.fromObject(category)
        ),
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
}
