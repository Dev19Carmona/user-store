import { NextFunction, Request, Response } from 'express'
import { AppointmentCreateDto, CustomError } from '../../domain'
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto'
import { AppointmentService } from '../services/appointment.service'
import { AppointmentChangeStatusDto } from '../../domain/dtos/appointment/change-status-appointment.dto'

export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createAppointment = async (req: Request, res: Response) => {
    const [error, createAppointmentDto] = AppointmentCreateDto.create(req.body)
    if (error) return res.status(400).json({ error })
    this.appointmentService
      .createAppointment(createAppointmentDto!)
      .then((newAppointment) => res.status(201).json(newAppointment))
      .catch((error) => this.handleError(error, res))
  }
  getPendingAppointments = async (req: Request, res: Response) => {
    const user = req.body.user
    this.appointmentService
    .getPendingAppointments(user)
    .then((appointments) => res.status(201).json(appointments))
    .catch((error) => this.handleError(error, res))
  }
  changeStatusAppointment = async (req: Request, res: Response) => {
    const [error, changeStatusAppointmentDto] = AppointmentChangeStatusDto.create(req.body)
    if (error) return res.status(400).json({ error })
    console.log(changeStatusAppointmentDto);
    
    this.appointmentService
    .changeStatusAppointment(changeStatusAppointmentDto!)
    .then((appointment) => res.status(201).json(appointment))
    .catch((error) => this.handleError(error, res))


  }
  
}
