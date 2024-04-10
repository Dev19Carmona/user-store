import { Router } from 'express'
import { FileController } from './controller'
import { AuthMiddleware, FileMiddleware } from '../middlewares'
import { FileService } from '../services/file.service'

export class FileRoutes {
  static get routes(): Router {
    const router = Router()
    const fileService = new FileService()
    const controller = new FileController(fileService)
    router.use(FileMiddleware.containFiles)
    // Definir las rutas
    router.post('/single/:type', controller.uploadFile)
    router.post('/multiple/:type', controller.uploadMultipleFiles)

    return router
  }
}
