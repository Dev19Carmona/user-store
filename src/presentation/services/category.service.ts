import { CategoryModel } from '../../data/mongo/models'
import { CustomError } from '../../domain'
import { CategoryCreateDto } from '../../domain/dtos/category/category-create.dto'

export class CategoryService {
  constructor() {}
  public async createCategory(createCategoryDto: CategoryCreateDto) {
    try {
      return new CategoryModel(createCategoryDto).save()
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
}
