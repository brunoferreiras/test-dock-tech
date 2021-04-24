import { HttpException, HttpStatus } from '@nestjs/common'

export class PersonNotFound extends HttpException {
  constructor() {
    super(`Person not found`, HttpStatus.NOT_FOUND)
  }
}
