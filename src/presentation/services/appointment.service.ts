import { AppointmentModel, CategoryModel } from '../../data/mongo/models'
import { AppointmentCreateDto, CustomError, UserEntity } from '../../domain'
import { CategoryCreateDto } from '../../domain/dtos/category/category-create.dto'
import { PaginationResponseDto } from '../../domain/dtos/shared/pagination-response.dto'
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto'
import { AppointmentEntity, CategoryEntity } from '../../domain/entities'

interface GetCategoriesResponse {
  pagination: PaginationDto
  categories: CategoryEntity[]
}
export class AppointmentService {
  constructor() {}
  public async createAppointment(createAppointmentDto: AppointmentCreateDto) {
    try {
      const newAppointment = await new AppointmentModel(
        createAppointmentDto
      ).save()

      return AppointmentEntity.fromObject(newAppointment)
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
}
