import { NextFunction, Request, Response } from "express";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";
import mongoose from "mongoose";

export class PaginationMiddleware {
  static createPaginationDto(req: Request, res: Response, next: NextFunction) {
    const { page = 1, limit = 10 } = req.query
    const [error, paginationDto] = PaginationDto.create(+page, +limit)
    if (error) return res.status(400).json({ error })
    req.body.paginationDto = paginationDto
    
    next()
  }
}