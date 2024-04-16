import { Constants } from '../../config'
import { AppointmentModel } from '../../data/mongo/models'
import { AppointmentCreateDto, CustomError, UserEntity } from '../../domain'
import { AppointmentChangeStatusDto } from '../../domain/dtos/appointment/change-status-appointment.dto'
import { PaginationResponseDto } from '../../domain/dtos/shared/pagination-response.dto'
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto'
import { AppointmentEntity } from '../../domain/entities'

interface GetAppointmentsResponse {
  pagination: PaginationDto
  appointments: AppointmentEntity[]
}
export class AppointmentService {
  constructor() { }
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
  public async getStatusAppointments(user: UserEntity, status: string, paginationDto: PaginationDto): Promise<GetAppointmentsResponse> {
    try {
      const { page, limit } = paginationDto
      const { id, role } = user
      const endpoint = role.includes(Constants.roles().doctor.key)
        ? 'doctor'
        : 'customer'

      const startDate = new Date()
      startDate.setHours(0, 0, 0, 0)
      const query = {
        [endpoint]: id,
        status,
        startDate: { $gte: startDate },
      }
      const [total, appointments] = await Promise.all([
        AppointmentModel.countDocuments(query),
        AppointmentModel.find(query)
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('customer')
          .populate('doctor')
        ,
      ])
      const [error, paginationResponde] = PaginationResponseDto.create({
        page,
        limit,
        total,
        endpoint: `appointment/${status}`,
      })
      if (error) throw CustomError.badRequest(`${error}`)
      return {
        pagination: paginationResponde!,
        appointments: appointments.map((appointment) =>
          AppointmentEntity.fromObject(appointment)
        ),
      }
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
