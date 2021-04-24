import { IsNumber, Min } from 'class-validator'

export class WithdrawAccountDto {
  @IsNumber()
  @Min(0.01)
  value: number
}
