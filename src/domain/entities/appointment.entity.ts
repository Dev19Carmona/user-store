import { CustomError } from '../errors/custom.error'

export class AppointmentEntity {
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
  static fromObject(object: { [key: string]: any }) {
    const {
      location,
      description,
      doctor,
      customer,
      status,
      startDate,
      endDate,
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
    } = object
    if (!location) throw CustomError.badRequest('Missing name')
    if (!customer) throw CustomError.badRequest('Missing customer')
    if (!doctor) throw CustomError.badRequest('Missing doctor')
    if (!status) throw CustomError.badRequest('Missing status')

    return new AppointmentEntity(
      customer,
      doctor,
      startDate,
      endDate,
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
    )
  }
}
