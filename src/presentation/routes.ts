import { Router } from 'express'
import { AuthRoutes } from './auth/routes'
import { CategoryRoutes } from './category/routes'
import { ProductRoutes } from './product/routes'
import { FileRoutes } from './file-upload/routes'
import { ImageRoutes } from './images/routes'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api/category', CategoryRoutes.routes)
    router.use('/api/product', ProductRoutes.routes)
    router.use('/api/file', FileRoutes.routes)
    router.use('/api/images', ImageRoutes.routes)

    return router
  }
}
