import { Request, Response } from 'express'
import { CustomError } from '../../domain'
import { FileService } from '../services/file.service'
import { UploadedFile } from 'express-fileupload'

export class FileController {
  constructor(private readonly fileService: FileService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  uploadFile = async (req: Request, res: Response) => {
    const type = req.params.type
    const file = req.body.files.at(0) as UploadedFile

    this.fileService
      .uploadSingle(file, `uploads/${type}`)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => this.handleError(error, res))
  }
  uploadMultipleFiles = async (req: Request, res: Response) => {
    const type = req.params.type
    const files = req.body.files as UploadedFile[]

    this.fileService
      .uploadMultiple(files, `uploads/${type}`)
      .then((uploaded) => res.json(uploaded))
      .catch((error) => this.handleError(error, res))
  }
}
