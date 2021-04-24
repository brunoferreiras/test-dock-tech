import { HttpException, HttpStatus } from '@nestjs/common'

export class PersonAlreadyHasAccount extends HttpException {
  constructor() {
    super(`Person already has account with this type`, HttpStatus.FORBIDDEN)
  }
}
