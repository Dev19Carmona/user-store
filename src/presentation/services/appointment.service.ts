import { Constants } from '../../config'
import { AppointmentModel, CategoryModel } from '../../data/mongo/models'
import { AppointmentCreateDto, CustomError, UserEntity } from '../../domain'
import { AppointmentChangeStatusDto } from '../../domain/dtos/appointment/change-status-appointment.dto'
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
  public async getPendingAppointments(user: UserEntity) {
    try {
      const { id, role } = user
      const endpoint = role.includes(Constants.roles().doctor.key)
        ? 'doctor'
        : 'customer'

      const startDate = new Date()
      startDate.setHours(0, 0, 0, 0)
      const appointments = await AppointmentModel.find({
        [endpoint]: id,
        status: 'pending',
        startDate: { $gte: startDate },
      })
      return appointments.map((appointment) =>
        AppointmentEntity.fromObject(appointment)
      )
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
  public async changeStatusAppointment(
    changeStatusAppointmentDto: AppointmentChangeStatusDto
  ) {
    try {
      const { _id, status, user } = changeStatusAppointmentDto
      const { id, role } = user

      const availableStatuses = Object.keys(Constants.appointmentStatuses())
      if (!availableStatuses.includes(status))
        throw new Error('INVALID_STATUS_TO_SET')

      const endpoint = role.includes(Constants.roles().doctor.key)
        ? 'doctor'
        : 'customer'
      if (
        endpoint === 'customer' &&
        status === Constants.appointmentStatuses().confirmed.key
      )
        throw new Error('USER_CANT_CONFIRM_APPOINTMENT')
      const appointmentUpdated = await AppointmentModel.findOneAndUpdate(
        {
          _id,
          [endpoint]: id,
        },
        { status }
      )
      return appointmentUpdated
      //return AppointmentEntity.fromObject(appointmentUpdated)
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
}
