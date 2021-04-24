import { HttpException, HttpStatus } from '@nestjs/common'

export class AccountBlockedException extends HttpException {
  constructor() {
    super(`Account Blocked`, HttpStatus.FORBIDDEN)
  }
}
