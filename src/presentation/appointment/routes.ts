import { Router } from 'express'
import { AppointmentController } from './controller'
import { AuthMiddleware, PaginationMiddleware } from '../middlewares'
import { CategoryService } from '../services/category.service'
import { AppointmentService } from '../services/appointment.service'

export class AppointmentRoutes {
  static get routes(): Router {
    const router = Router()
    const appointmentService = new AppointmentService()
    const controller = new AppointmentController(appointmentService)

    // Definir las rutas
    router.post('/', [AuthMiddleware.validateJWT], controller.createAppointment)
    router.post('/change-status', [AuthMiddleware.validateJWT], controller.changeStatusAppointment)
    router.get('/:status', [AuthMiddleware.validateJWT, PaginationMiddleware.createPaginationDto], controller.getStatusAppointments)
    return router
  }
}
