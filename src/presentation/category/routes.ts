import { Router } from 'express'
import { CategoryController } from './controller'
import { AuthMiddleware, PaginationMiddleware } from '../middlewares'
import { CategoryService } from '../services/category.service'

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router()
    const categoryService = new CategoryService()
    const controller = new CategoryController(categoryService)

    // Definir las rutas
    router.get('/', [PaginationMiddleware.createPaginationDto], controller.getCategories)
    router.post('/', [AuthMiddleware.validateJWT], controller.createCategory)

    return router
  }
}
