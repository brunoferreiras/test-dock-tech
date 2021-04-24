import { HttpException, HttpStatus } from '@nestjs/common'

export class InsufficientMoneyException extends HttpException {
  constructor() {
    super(`Insufficient Money`, HttpStatus.FORBIDDEN)
  }
}
