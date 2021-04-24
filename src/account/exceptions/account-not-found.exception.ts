import { HttpException, HttpStatus } from '@nestjs/common'

export class AccountNotFound extends HttpException {
  constructor() {
    super(`Account not found`, HttpStatus.NOT_FOUND)
  }
}
