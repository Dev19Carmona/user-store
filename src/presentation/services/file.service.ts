import { UploadedFile } from 'express-fileupload'
import fs from 'fs'
import path from 'path'
import { Uuid } from '../../config'
import { CustomError } from '../../domain'

export class FileService {
  constructor(private readonly uuid = Uuid.v4()) {}
  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
  }
  private checkFile(filePath: string) {
    if (!fs.existsSync(filePath)) return false
    else true
  }

  public async uploadSingle(
    file: UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {
    try {
      const fileExtension = file.mimetype.split('/').at(1) ?? ''
      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest(
          `Invalid Extension: ${fileExtension}, valid ones: ${validExtensions}`
        )
      }
      const destination = path.resolve(__dirname, '../../../', folder)
      const fileName = `${this.uuid}.${fileExtension}`
      this.checkFolder(destination)
      file.mv(`${destination}/${fileName}`)
      return new Promise((resolve, reject) => {
        resolve({ fileName })
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  public uploadMultiple(
    file: UploadedFile[],
    folder: string = 'uploads',
    validExtensions: string[]
  ) {}
}
