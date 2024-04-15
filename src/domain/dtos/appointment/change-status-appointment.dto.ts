import { Constants } from '../../../config'
import { UserEntity } from '../../entities'
import { AppointmentDateCreateDto } from './create-date-appointment.dto'

export class AppointmentChangeStatusDto {
  private constructor(
    public readonly _id: string,
    public readonly status: string,
    public readonly user: UserEntity,
    
  ) {}

  static create(object: {
    [key: string]: any
  }): [string?, AppointmentChangeStatusDto?] {
    const {
      _id,
      user,
      status,
    } = object
    if (!_id) return ['Missing _id']
    if (!user) return ['Missing user']
    if (!status) return ['Missing status']

    return [
      undefined,
      new AppointmentChangeStatusDto(
        _id,
        status,
        user,
      ),
    ]
  }
}
