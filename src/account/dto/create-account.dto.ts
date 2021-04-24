import { IsEnum, IsInt, IsNumber, Min } from 'class-validator'
import { AccountTypeEnum } from '../enums/account-type.enum'

export class CreateAccountDto {
  @IsInt()
  person_id: number

  @IsNumber()
  @Min(0)
  daily_withdraw_limit: number

  @IsEnum(AccountTypeEnum)
  type: number
}
