import { Request, Response } from 'express'
import { CustomError, LoginUserDto, RegisterUserDto } from '../../domain'
import { AuthService } from '../services/auth.service'
import { CategoryCreateDto } from '../../domain/dtos/category/category-create.dto'

export class CategoryController {
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createCategory = async (req: Request, res: Response)=>{
    //const [error, createCategoryDto] = CategoryCreateDto.create(req.body)
    res.json('createCategory')
  }

  getCategories = async (req: Request, res: Response)=>{
    //const [error, createCategoryDto] = CategoryCreateDto.create(req.body)
    res.json('getCategories')
  }
  
}
