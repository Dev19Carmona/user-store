import { Constants } from '../../../config'
import { AppointmentDateCreateDto } from './create-date-appointment.dto'

export class AppointmentCreateDto {
  private constructor(
    public readonly customer: string,
    public readonly doctor: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly startFullYear: number,
    public readonly endFullYear: number,
    public readonly startDayNumber: number,
    public readonly endDayNumber: number,
    public readonly startHour: number,
    public readonly endHour: number,
    public readonly startMinuts: number,
    public readonly endMinuts: number,
    public readonly startSeconds: number,
    public readonly endSeconds: number,
    public readonly startMs: number,
    public readonly endMs: number,
    public readonly intervalInMilliseconds: number,
    public readonly intervalInSeconds: number,
    public readonly location: string,
    public readonly description: string,
    public readonly status: string
  ) {}

  static create(object: {
    [key: string]: any
  }): [string?, AppointmentCreateDto?] {
    const {
      startDate, //obligatorio
      endDate, //obligatorio
      location, //obligatorio
      description,
      doctorId, //obligatorio
      user,
      status = 'pending',
    } = object
    if (!startDate) return ['Missing startDate']
    if (!endDate) return ['Missing endDate']
    if (!location) return ['Missing location']
    if (!user.role.includes(Constants.roles().user.key))
      return ['Only user can make an appointment']
    
    const {
      start,
      end,
      startFullYear,
      endFullYear,
      startDayNumber,
      endDayNumber,
      startHour,
      endHour,
      startMinuts,
      endMinuts,
      startSeconds,
      endSeconds,
      startMs,
      endMs,
      intervalInMilliseconds,
      intervalInSeconds,
    } = AppointmentDateCreateDto.create(startDate, endDate)

    return [
      undefined,
      new AppointmentCreateDto(
        user.id,
        doctorId,
        start,
        end,
        startFullYear,
        endFullYear,
        startDayNumber,
        endDayNumber,
        startHour,
        endHour,
        startMinuts,
        endMinuts,
        startSeconds,
        endSeconds,
        startMs,
        endMs,
        intervalInMilliseconds,
        intervalInSeconds,
        location,
        description,
        status
      ),
    ]
  }
}
