import { Request, Response } from 'express'
import { CustomError, LoginUserDto, RegisterUserDto } from '../../domain'
import { AuthService } from '../services/auth.service'
import { CategoryCreateDto } from '../../domain/dtos/category/category-create.dto'
import { CategoryService } from '../services/category.service'
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto'

export class appointmentController {
  constructor(private readonly categoryService: CategoryService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createAppointement = async (req: Request, res: Response) => {
    const [error, createCategoryDto] = CategoryCreateDto.create(req.body)
    if (error) return res.status(400).json({ error })
    this.categoryService
      .createCategory(createCategoryDto!, req.body.user)
      .then((newCategory) => res.status(201).json(newCategory))
      .catch((error) => this.handleError(error, res))
  }

  getCategories = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query
    const [error, paginationDto] = PaginationDto.create(+page, +limit)
    if (error) return res.status(400).json({ error })
    this.categoryService
      .getCategories(paginationDto!)
      .then((categories) => res.status(200).json(categories))
      .catch((error) => this.handleError(error, res))
  }
}
