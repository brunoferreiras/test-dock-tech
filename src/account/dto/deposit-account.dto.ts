import { IsNumber, Min } from 'class-validator'

export class DepositAccountDto {
  @IsNumber()
  @Min(0.01)
  value: number
}
